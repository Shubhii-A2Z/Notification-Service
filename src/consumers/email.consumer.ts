import { Job, Worker } from "bullmq";

import { MAILER_QUEUE } from "@/queues/mailer.queue";
import { NotificationDTO } from "@/dtos/notification.dto";
import { getRedisConnection } from "@/config/redis.config";
import { MAILER_PAYLOAD } from "@/producers/email.producer";
import { UnauthorizedAccess } from "@/utils/errors/app.error";
import logger from "@/config/logger.config";
import { renderMailTemplate } from "@/templates/template.handler";
import { sendEmail } from "@/services/mailer.service";


export const setupMailerWorker=()=>{
    
    // define the shape of the job data that the worker will process:- job.data becomes <NotificationDTO>
    const emailWorker=new Worker<NotificationDTO>(
        MAILER_QUEUE, // Name of queue
        async (job: Job)=>{ // processing function
            if(job.name!==MAILER_PAYLOAD){
                throw new UnauthorizedAccess('Invalid Job Name');
            }
            const payload=job.data;
            console.log(`Processing Job: ${JSON.stringify(payload)}`);

            const emailContent=await renderMailTemplate(payload.templateID,payload.params);

            await sendEmail(payload.to,payload.subject,emailContent);
        },
        {
            connection: getRedisConnection()
        }
    );

    emailWorker.on("failed",()=>{
        logger.error("Email processing failed");
    });

    emailWorker.on("completed",()=>{
        logger.info("Email processing completed successfully");
    });

}