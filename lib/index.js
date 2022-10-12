"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadScript = exports.hasScript = exports.GtmSupport = exports.GTM_ID_PATTERN = exports.assertIsGtmId = void 0;
var assert_is_gtm_id_1 = require("./assert-is-gtm-id");
Object.defineProperty(exports, "assertIsGtmId", { enumerable: true, get: function () { return assert_is_gtm_id_1.assertIsGtmId; } });
Object.defineProperty(exports, "GTM_ID_PATTERN", { enumerable: true, get: function () { return assert_is_gtm_id_1.GTM_ID_PATTERN; } });
var gtm_support_1 = require("./gtm-support");
Object.defineProperty(exports, "GtmSupport", { enumerable: true, get: function () { return gtm_support_1.GtmSupport; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "hasScript", { enumerable: true, get: function () { return utils_1.hasScript; } });
Object.defineProperty(exports, "loadScript", { enumerable: true, get: function () { return utils_1.loadScript; } });
//# sourceMappingURL=index.js.map