import { getState, reset } from "../state/state-manager"
import { applyConfig } from "../config/config"
import config from "../../../production/config/config-example.json"
import { checkHigh, subtractHours } from "./high-check"

describe("High check", () => {
    beforeEach(() => {
        applyConfig(config)
        reset()
    })

    test("pass", () => {
        getState().lastHigh = undefined
        expect(checkHigh()).toBeUndefined()
    })

    test("never high with the last thee days", () => {
        getState().lastHigh = undefined
        getState().start = subtractHours(4 * 24)
        expect(checkHigh()).toBe("Neven seen a high temperature within the last three days")
    })

    test("last high too long away", () => {
        getState().lastHigh = subtractHours(3 * 24 + 1)
        getState().start = subtractHours(4 * 24)
        expect(checkHigh()).toMatch(/Last high was more than three days ago .*/i)
    })
})
