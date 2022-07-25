import { getState, reset } from "../state/state-manager"
import { checkRange } from "./range-check"
import { applyConfig } from "../config/config"
import config from "../../../production/config/config-example.json"

describe("Range check", () => {
    beforeEach(() => {
        applyConfig(config)
        reset()
    })

    test("limit range", () => {
        const state = getState()
        for (let i = 0; i < 500; i++) {
            state.onValue(i)
        }

        expect(state.values.length).toBe(200)
        expect(state.values[199]).toBe(499)
        expect(state.values[0]).toBe(300)
    })

    test("range good", () => {
        const state = getState()
        state.onValue(30)
        state.onValue(90)
        expect(checkRange()).toBeUndefined()
    })

    test("too high", () => {
        const state = getState()
        state.onValue(50)
        state.onValue(91)
        expect(checkRange()).toBe("Temperature to too high(91)")
    })

    test("too low", () => {
        const state = getState()
        state.onValue(29)
        state.onValue(90)
        expect(checkRange()).toBe("Temperature to too low(29)")
    })
})
