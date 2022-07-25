import nodemailer from "nodemailer"
import { getAppConfig } from "../config/config"
import { log } from "../logger"

export const sendMail = async (title: string, message: string) => {
    const config = getAppConfig().mail
    console.log(config)

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(config as any)

    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: config.from,
            to: config.to,
            subject: `Solar Monitor: ${title}`,
            text: message
        })

        log.info(`Mail sent: ${info.messageId}`)
    }
    catch (e) {
        log.info(`Error sending mail: ${e}`)
    }
}
