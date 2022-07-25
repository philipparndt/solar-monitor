import { getState } from "../state/state-manager"
import { getAppConfig } from "../config/config"

export const checkRange = () => {
    const config = getAppConfig()
    const state = getState()
    for (const value of state.values) {
        if (value > config.checks.range.maximum) {
            return `Temperature to too high(${value})`
        }
        else if (value < config.checks.range.minimum) {
            return `Temperature to too low(${value})`
        }
    }
}
