import { connectMqtt } from "./mqtt/mqtt-client"
import { log } from "./logger"
import cron from "node-cron"
import { sendMail } from "./mail/mailer"
import { doChecks } from "./checks"

export const hourlyCheck = () => {
    const result = doChecks()
    if (result) {
        sendMail("ALERT", `Hourly check failed with error: ${result}`)
    }
}

export const startApp = async () => {
    const mqttCleanUp = await connectMqtt()

    log.info("Application is now ready.")

    log.info("Scheduling hourly-check.")
    const task = cron.schedule("0 * * * *", hourlyCheck)
    task.start()

    sendMail("Started", "Application started.")

    return () => {
        mqttCleanUp()
        task.stop()
    }
}
