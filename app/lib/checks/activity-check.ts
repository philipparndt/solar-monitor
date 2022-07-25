import { getState } from "../state/state-manager"

const maxDifference = 1_000 * 60 * 60

export const checkActivity = () => {
    const state = getState()
    const from = state.lastFrom
    const to = state.lastTo

    if (!from || !to) {
        return `No messages at all since ${state.last}`
    }

    const now = new Date()
    if (now.getTime() - from.getTime() > maxDifference) {
        return `No from temperature since ${from}`
    }
    if (now.getTime() - to.getTime() > maxDifference) {
        return `No to temperature since ${to}`
    }
}
