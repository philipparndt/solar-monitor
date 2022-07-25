import { checkActivity } from "./activity-check"
import { getState, reset } from "../state/state-manager"
import { applyConfig } from "../config/config"
import config from "../../../production/config/config-example.json"

function subtractHours (numOfHours: number, date = new Date()) {
    date.setHours(date.getHours() - numOfHours)

    return date
}

describe("Activity check", () => {
    beforeEach(() => {
        applyConfig(config)
        reset()
    })

    test("no activity", () => {
        expect(checkActivity()).toMatch(/No messages at all since .*/i)
    })

    test("no activity - with to", () => {
        getState().lastTo = new Date()
        expect(checkActivity()).toMatch(/No messages at all since .*/i)
    })

    test("no activity - with from", () => {
        getState().lastFrom = new Date()
        expect(checkActivity()).toMatch(/No messages at all since .*/i)
    })

    test("activity", () => {
        getState().lastFrom = new Date()
        getState().lastTo = new Date()
        expect(checkActivity()).toBeUndefined()
    })

    test("activity too old from", () => {
        getState().lastFrom = subtractHours(2)
        getState().lastTo = new Date()
        expect(checkActivity()).toMatch(/No from temperature since .*/i)
    })

    test("activity too old to", () => {
        getState().lastFrom = new Date()
        getState().lastTo = subtractHours(2)
        expect(checkActivity()).toMatch(/No to temperature since .*/i)
    })

    test("activity too old", () => {
        getState().lastFrom = subtractHours(2)
        getState().lastTo = subtractHours(2)
        expect(checkActivity()).toMatch(/No from temperature since .*/i)
    })
})
