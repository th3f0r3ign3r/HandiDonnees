import nodemailer, { TransportOptions } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import ejs from 'ejs';
import path from 'path';
import config from '../configs/app.config';
import logger from '../../core/utils/logger';
import { User } from '../../features/user/user.entity';

class EmailService {
    private static instance: EmailService;
    private transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    constructor() {
        this.transport = nodemailer.createTransport(config.email.smtp as TransportOptions);

        if (config.env !== 'test') {
            this.transport
                .verify()
                .then(() => logger.info('Connected to email server'))
                .catch(() =>
                    logger.warn(
                        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
                    )
                );
        }
    }

    /**
     * Send an email
     * @param {string} to
     * @param {string} subject
     * @param {string} text
     * @returns {Promise}
     */
    sendEmail = async (to: string, subject: string, html?: string, text?: string) => {
        const msg = { from: config.email.from, to, subject, html, text };
        await this.transport.sendMail(msg);
    };

    /**
     * Send reset password email
     * @param {string} to
     * @param {string} token
     * @returns {Promise}
     */
    async sendResetPasswordEmail(to: string, token: string) {
        // replace this url with the link to the reset password page of your front-end app
        const resetPasswordUrl = `${config.appFrontResetPasswordUrl}/?token=${token}`;

        const subject = '[Handidonnes] Reset password';
        // const html = emailResetPasswordHtml(resetPasswordUrl);
        const html = await ejs.renderFile(
            path.join(__dirname, '..', 'templates', 'reset_password.ejs'),
            { resetPasswordUrl }
        );

        await this.sendEmail(to, subject, html);
    }

    /**
     * Send OTP email
     * @param {string} to
     * @param {number} otp
     * @returns {Promise}
     */
    async sendOtpEmail(to: string, otp: number) {
        const subject = '[Handidonnes] OTP';
        // const html = emailResetPasswordHtml(resetPasswordUrl);
        const html = await ejs.renderFile(path.join(__dirname, '..', 'templates', 'otp.ejs'), {
            otp,
        });

        await this.sendEmail(to, subject, html);
    }

    /**
     * Send OTP email
     * @param {string} to
     * @param {number} otp
     * @returns {Promise}
     */
    async sendUserRegistrationEmail(to: string, user: User) {
        const subject = '[Handidonnes] COmpte Enregistré';
        // const html = emailResetPasswordHtml(resetPasswordUrl);
        const html = await ejs.renderFile(
            path.join(__dirname, '..', 'templates', 'user_registration.ejs'),
            {
                user,
            }
        );

        await this.sendEmail(to, subject, html);
    }

    /**
     * Get an instance of this class
     */
    static getInstance() {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }
}

export default EmailService.getInstance();
