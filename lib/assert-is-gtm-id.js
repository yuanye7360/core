"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIsGtmId = exports.GTM_ID_PATTERN = void 0;
/** GTM Container ID pattern. */
exports.GTM_ID_PATTERN = /^GTM-[0-9A-Z]+$/;
/**
 * Assert that the given id is a valid GTM Container ID.
 *
 * Tested against pattern: `/^GTM-[0-9A-Z]+$/`.
 *
 * @param id A GTM Container ID.
 */
function assertIsGtmId(id) {
    if (typeof id !== 'string' || !exports.GTM_ID_PATTERN.test(id)) {
        throw new Error(`GTM-ID '${id}' is not valid`);
    }
}
exports.assertIsGtmId = assertIsGtmId;
//# sourceMappingURL=assert-is-gtm-id.js.map