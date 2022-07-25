import { applyDefaults } from "./config"

describe("Config", () => {
    test("default values", async () => {
        const config = {
            "mqtt": {
                "url": "tcp://mqtt.example.com:1883",
                "topic": "solar-monitor"
            },
            "solar": {
                "from_solar_topic": "haus/ug/heizung/solar_vl",
                "to_solar_topic": "haus/ug/heizung/solar_rl"
            },
            "mail": {
                "host": "smtp.example.com",
                "auth": {
                    "user": "user@example.com",
                    "pass": "password"
                },
                "from": "\"Solar Monitor\" <user@example.com>",
                "to": "user@example.com"
            }
        }

        expect(applyDefaults(config)).toStrictEqual({
            "mqtt": {
                "bridge-info": true,
                "qos": 1,
                "retain": true,
                "url": "tcp://mqtt.example.com:1883",
                "topic": "solar-monitor"
            },
            "solar": {
                "from_solar_topic": "haus/ug/heizung/solar_vl",
                "to_solar_topic": "haus/ug/heizung/solar_rl"
            },
            "mail": {
                "host": "smtp.example.com",
                "port": 465,
                "secure": true,
                "auth": {
                    "user": "user@example.com",
                    "pass": "password"
                },
                "from": "\"Solar Monitor\" <user@example.com>",
                "to": "user@example.com"
            }
        })
    })
})
