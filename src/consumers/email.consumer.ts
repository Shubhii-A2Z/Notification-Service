import { Job, Worker } from "bullmq";

import { MAILER_QUEUE } from "../queues/mailer.queue";
import { NotificationDTO } from "../dtos/notification.dto";
import { getRedisConnection } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { UnauthorizedAccess } from "../utils/errors/app.error";
import logger from "../config/logger.config";

export const setupMailerWorker=()=>{

    const emailWorker=new Worker<NotificationDTO>(
        MAILER_QUEUE, // Name of queue
        async (job: Job)=>{ // processing function
            if(job.name!==MAILER_PAYLOAD){
                throw new UnauthorizedAccess('Invalid Job Name');
            }
            const payload=job.data;
            console.log(`Processing Job: ${JSON.stringify(payload)}`);
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