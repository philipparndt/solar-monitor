import { log } from "../logger"
import { checkActivity } from "./activity-check"
import { checkMean } from "./mean-check"
import { checkRange } from "./range-check"
import { checkHigh } from "./high-check"

export const doChecks = () => {
    const checks = [checkActivity, checkMean, checkRange, checkHigh]

    for (const check of checks) {
        log.debug("Running check", check.name)
        const result = check()
        log.debug("Result", check.name, result)
        if (result) {
            return result
        }
    }
}
