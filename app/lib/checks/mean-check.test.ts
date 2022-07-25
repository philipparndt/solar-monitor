import { getState, reset } from "../state/state-manager"
import { checkMean } from "./mean-check"

describe("Mean check", () => {
    beforeEach(() => {
        reset()
    })

    test("not enough", () => {
        expect(checkMean()).toBeUndefined()
    })

    test("mean 1", () => {
        const state = getState()
        for (let i = 0; i < 15; i++) {
            state.onDifference(1)
        }
        expect(state.differences.length).toBe(10)
        expect(state.mean()).toEqual(1)
        expect(checkMean()).toBeUndefined()
    })

    test("mean 4.5", () => {
        const state = getState()
        for (let i = 0; i < 10; i++) {
            state.onDifference(i)
        }
        expect(state.differences.length).toBe(10)
        expect(state.mean()).toStrictEqual(4.5)
        expect(checkMean()).toBeUndefined()
    })

    test("mean 9.5", () => {
        const state = getState()
        for (let i = 0; i < 15; i++) {
            state.onDifference(i)
        }
        expect(state.differences.length).toBe(10)
        expect(state.mean()).toStrictEqual(9.5)
        expect(checkMean()).toBeUndefined()
    })

    test("mean too low", () => {
        const state = getState()
        for (let i = 0; i > -15; i--) {
            state.onDifference(i)
        }
        expect(state.differences.length).toBe(10)
        expect(state.mean()).toStrictEqual(-9.5)
        expect(checkMean()).toBe("Temperature gain is too low (-9.5)")
    })

})
