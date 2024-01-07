import * as fs from "fs"
import { log } from "../logger"

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
    loglevel: string
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

const configDefaults = {
    loglevel: "info"
}

export const applyDefaults = (config: any) => {
    return {
        ...configDefaults,
        ...config,
        mqtt: { ...mqttDefaults, ...config.mqtt },
        mail: { ...mailDefaults, ...config.mail },
        checks: { ...checksDefault, ...config.checks }
    } as Config
}

export const replaceEnvVariables = (input: string) => {
    const envVariableRegex = /\${([^}]+)}/g

    return input.replace(envVariableRegex, (_, envVarName) => {
        return process.env[envVarName] || ""
    })
}

export const loadConfig = (file: string) => {
    const buffer = fs.readFileSync(file)
    const effectiveConfig = replaceEnvVariables(buffer.toString())
    log.trace("Using config", effectiveConfig)
    log.trace("parsing config")
    applyConfig(JSON.parse(effectiveConfig))
}

export const applyConfig = (config: any) => {
    appConfig = applyDefaults(config)
    log.configure(appConfig.loglevel.toUpperCase())
}

export const getAppConfig = () => {
    return appConfig
}

export const setTestConfig = (config: Config) => {
    appConfig = config
}
