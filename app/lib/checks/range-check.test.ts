import { getState, reset } from "../state/state-manager"
import { checkRange } from "./range-check"

describe("Range check", () => {
    beforeEach(() => {
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
        state.onValue(50)
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
        state.onValue(49)
        state.onValue(90)
        expect(checkRange()).toBe("Temperature to too low(49)")
    })
})
