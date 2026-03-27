import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { genericErrorHandler } from './middlewares/error.middleware';
import serverConfig from './config/server.config';
import logger from './config/logger.config';
import { setupMailerWorker } from './consumers/email.consumer';
import { addEmailToQueue } from './producers/email.producer';
import { validateRequestBody } from './middlewares/validate.middleware';
import { createEmailSchema } from './models/zod.schema';

const app=express();

app.use(express.json());

/**
 * Adding the error handler middleware: this will replace the default error handler middlware
 */
app.use(genericErrorHandler);


app.post('/send-email',validateRequestBody(createEmailSchema),async (req: Request,resp: Response)=>{
    await addEmailToQueue(req.body);
    logger.info(`Mail sent to ${req.body.to} with subject "${req.body.subject}"`);
    resp.status(StatusCodes.OK).json({
        Message: 'Email sent successfully'
    });
});

app.listen(serverConfig.PORT,async ()=>{
    console.log(`Server started at PORT: ${serverConfig.PORT}`);
    logger.info('Server Started',{success: true}); // Logging with Metadata
    setupMailerWorker();
    logger.info('Mailer worker setup ready');
});