import express from 'express';

import { genericErrorHandler } from './middlewares/error.middleware';
import serverConfig from './config/server.config';
import logger from './config/logger.config';
import { setupMailerWorker } from './consumers/email.consumer';
import { NotificationDTO } from './dtos/notification.dto';
import { addEmailToQueue } from './producers/email.producer';

const app=express();

app.use(express.json());

/**
 * Adding the error handler middleware: this will replace the default error handler middlware
 */
app.use(genericErrorHandler);

app.listen(serverConfig.PORT,()=>{
    console.log(`Server started at PORT: ${serverConfig.PORT}`);
    logger.info('Server Started',{success: true}); // Logging with Metadata
    setupMailerWorker();
    logger.info('Mailer worker setup ready');

    const sampleNotification: NotificationDTO={
        to: "Sample",
        subject: "Sample Mail",
        templateID: "Sample Id",
        params: {
            name: "John Doe",
            orderId: "1234",
        },
    }

    addEmailToQueue(sampleNotification);
});