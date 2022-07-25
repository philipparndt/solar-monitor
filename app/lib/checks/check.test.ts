import { getState, reset } from "../state/state-manager"
import { doChecks } from "./index"

describe("Mean check", () => {
    beforeEach(() => {
        reset()
        getState().lastFrom = new Date()
        getState().lastTo = new Date()
    })

    test("pass", () => {
        expect(doChecks()).toBeUndefined()
    })

    test("activity fails", () => {
        getState().lastFrom = undefined
        expect(doChecks()).toMatch(/No messages at all since .*/i)
    })

    test("mean fails", () => {
        const state = getState()
        for (let i = 0; i > -15; i--) {
            state.onDifference(i)
        }
        expect(doChecks()).toBe("Temperature gain is too low (-9.5)")
    })

    test("range fails", () => {
        const state = getState()
        state.onValue(100)
        expect(doChecks()).toBe("Temperature to too high(100)")
    })
})
