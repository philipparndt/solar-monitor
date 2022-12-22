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

    test("never high with the last seven days", () => {
        getState().lastHigh = undefined
        getState().start = subtractHours(8 * 24)
        expect(checkHigh()).toBe("Neven seen a high temperature within the last seven days")
    })

    test("last high too long away", () => {
        getState().lastHigh = subtractHours(7 * 24 + 1)
        getState().start = subtractHours(4 * 24)
        expect(checkHigh()).toMatch(/Last high was more than seven days ago .*/i)
    })
})
