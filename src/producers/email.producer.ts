import { NotificationDTO } from "../dtos/notification.dto";
import { mailerQueue } from "../queues/mailer.queue";

export const MAILER_PAYLOAD="payload:mail";

export const addEmailToQueue=async (payload: NotificationDTO)=>{
    // Adding a Job: {name,{data}} into message queue
    await mailerQueue.add(MAILER_PAYLOAD,payload);

    /*
        {
            'name': 'MAILER_PAYLOAD',
            'data': {
                ...payload
            }
        }
    */

    console.log(`Email added to queue: ${JSON.stringify(payload)}`);
}