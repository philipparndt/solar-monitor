import { getState } from "../state/state-manager"

export const checkRange = () => {
    const state = getState()
    for (const value of state.values) {
        if (value > 90) {
            return `Temperature to too high(${value})`
        }
        else if (value < 50) {
            return `Temperature to too low(${value})`
        }
    }
}
