import * as fs from "fs"

export type ConfigMqtt = {
    url: string,
    topic: string
    username?: string
    password?: string
    retain: boolean
    qos: (0 | 1 | 2)
    "bridge-info"?: boolean
    "bridge-info-topic"?: string
}

export type ConfigSolar = {
    from_solar_topic: string
    to_solar_topic: string
}

export type ConfigMail = {
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string
    },
    from: string,
    to: string
}

type ConfigChecks = {
    gain: {
        minimum: number
    },
    range: {
        minimum: number,
        maximum: number
    }
}

export type Config = {
    mqtt: ConfigMqtt
    solar: ConfigSolar
    checks: ConfigChecks
    mail: ConfigMail
}

let appConfig: Config

const mqttDefaults = {
    qos: 1,
    retain: true,
    "bridge-info": true
}

const mailDefaults = {
    port: 465,
    secure: true
}

const checksDefault = {
    gain: {
        minimum: -3
    },
    range: {
        minimum: 30,
        maximum: 90
    }
}

export const applyDefaults = (config: any) => {
    return {
        ...config,
        mqtt: { ...mqttDefaults, ...config.mqtt },
        mail: { ...mailDefaults, ...config.mail },
        checks: { ...checksDefault, ...config.checks }
    } as Config
}

export const loadConfig = (file: string) => {
    const buffer = fs.readFileSync(file)
    applyConfig(JSON.parse(buffer.toString()))
}

export const applyConfig = (config: any) => {
    appConfig = applyDefaults(config)
}

export const getAppConfig = () => {
    return appConfig
}

export const setTestConfig = (config: Config) => {
    appConfig = config
}
