import { getAppConfig } from "../config/config"
import { publish } from "../mqtt/mqtt-client"
import { log } from "../logger"

export class StateManager {
    from?: number
    to?: number

    last = new Date()

    lastFrom?: Date
    lastTo?: Date

    differences: number[] = []
    values: number[] = []

    onDifference = (difference: number) => {
        this.differences.push(difference)
        if (this.differences.length > 10) {
            this.differences = this.differences.slice(1)
        }
    }

    onValue = (value: number) => {
        this.values.push(value)
        if (this.values.length > 200) {
            this.values = this.values.slice(1)
        }
    }

    mean = () => {
        const length = this.differences.length
        if (length === 0) {
            return 0
        }
        return this.differences.reduce((a, b) => a + b) / length
    }

    onMessage = (topic: string, message: string) => {
        const config = getAppConfig()
        const temperature = JSON.parse(message).temperature
        this.onValue(temperature)

        if (config.solar.to_solar_topic === topic) {
            this.to = temperature
            this.lastTo = new Date()
            this.last = new Date()
            log.info(`to: ${this.to}`)
        }
        else if (config.solar.from_solar_topic === topic) {
            this.from = temperature
            this.lastFrom = new Date()
            this.last = new Date()
            log.info(`to: ${this.from}`)
        }

        if (this.from && this.to) {
            const difference = Math.round((this.from - this.to + Number.EPSILON) * 100) / 100

            this.onDifference(difference)

            log.info(`difference: ${difference}`)
            publish({ temperature: difference }, "difference")
        }
    }
}

let state = new StateManager()

export const getState = () => state
export const reset = () => {
    state = new StateManager()
}
