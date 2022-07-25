import { checkActivity } from "./activity-check"
import { checkMean } from "./mean-check"
import { checkRange } from "./range-check"
import { checkHigh } from "./high-check"

export const doChecks = () => {
    const checks = [checkActivity, checkMean, checkRange, checkHigh]

    for (const check of checks) {
        const result = check()
        if (result) {
            return result
        }
    }
}
