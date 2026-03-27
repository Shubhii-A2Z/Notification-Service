import nodemailer from 'nodemailer';

import serverConfig from './server.config';

const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: serverConfig.MAIL_USER,
        pass: serverConfig.MAIL_PASS,
    }
});

export default transporter;