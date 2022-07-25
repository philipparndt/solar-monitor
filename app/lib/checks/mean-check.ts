import { getState } from "../state/state-manager"
import { getAppConfig } from "../config/config"

export const checkMean = () => {
    const config = getAppConfig()
    const state = getState()
    if (state.differences.length < 10) {
        // Cannot check - not enough values
        return
    }

    const mean = state.mean()
    if (mean < config.checks.gain.minimum) {
        return `Temperature gain is too low (${mean})`
    }
}
