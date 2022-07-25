import { getState } from "../state/state-manager"

export const checkMean = () => {
    const state = getState()
    if (state.differences.length < 10) {
        // Cannot check - not enough values
        return
    }

    const mean = state.mean()
    if (mean < 0) {
        return `Temperature gain is too low (${mean})`
    }
}