import { getState } from "../state/state-manager"
import { getAppConfig } from "../config/config"

export const subtractHours = (numOfHours: number, date = new Date()) => {
    date.setHours(date.getHours() - numOfHours)

    return date
}

export const checkHigh = () => {
    const state = getState()
    const lastHigh = state.lastHigh

    const threeDaysAgo = subtractHours(24 * 3, new Date())
    if (!lastHigh) {
        if (threeDaysAgo.getTime() > state.start.getTime()) {
            return "Neven seen a high temperature within the last three days"
        }
        return
    }

    if (lastHigh.getTime() < threeDaysAgo.getTime()) {
        return `Last high was more than three days ago (${lastHigh})`
    }
}
