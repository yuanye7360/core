"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GtmSupport = void 0;
const assert_is_gtm_id_1 = require("./assert-is-gtm-id");
const utils_1 = require("./utils");
/**
 * The GTM Support main class.
 */
class GtmSupport {
    /**
     * Constructs a new `GtmSupport` instance.
     *
     * @param options Options.
     */
    constructor(options) {
        this.scriptElements = [];
        /**
         * Whether the script is running in a browser or not.
         *
         * You can override this function if you need to.
         *
         * @returns `true` if the script runs in browser context.
         */
        this.isInBrowserContext = () => typeof window !== 'undefined';
        if (Array.isArray(options.id)) {
            for (const idOrObject of options.id) {
                if (typeof idOrObject === 'string') {
                    (0, assert_is_gtm_id_1.assertIsGtmId)(idOrObject);
                }
                else {
                    (0, assert_is_gtm_id_1.assertIsGtmId)(idOrObject.id);
                }
            }
        }
        else {
            (0, assert_is_gtm_id_1.assertIsGtmId)(options.id);
        }
        this.id = options.id;
        this.options = {
            enabled: true,
            debug: false,
            loadScript: true,
            defer: false,
            compatibility: false,
            ...options,
        };
        // @ts-expect-error: Just remove the id from options
        delete this.options.id;
    }
    /**
     * Check if plugin is enabled.
     *
     * @returns `true` if the plugin is enabled, otherwise `false`.
     */
    enabled() {
        var _a;
        return (_a = this.options.enabled) !== null && _a !== void 0 ? _a : true;
    }
    /**
     * Enable or disable plugin.
     *
     * When enabling with this function, the script will be attached to the `document` if:
     *
     * - the script runs in browser context
     * - the `document` doesn't have the script already attached
     * - the `loadScript` option is set to `true`
     *
     * @param enabled `true` to enable, `false` to disable. Default: `true`.
     * @param source The URL of the script, if it differs from the default. Default: 'https://www.googletagmanager.com/gtm.js'.
     */
    enable(enabled = true, source) {
        this.options.enabled = enabled;
        if (this.isInBrowserContext() &&
            enabled &&
            !(0, utils_1.hasScript)(source) &&
            this.options.loadScript) {
            if (Array.isArray(this.id)) {
                this.id.forEach((id) => {
                    let scriptElement;
                    if (typeof id === 'string') {
                        scriptElement = (0, utils_1.loadScript)(id, {
                            ...this.options,
                        });
                    }
                    else {
                        scriptElement = (0, utils_1.loadScript)(id.id, {
                            ...this.options,
                            queryParams: id.queryParams,
                        });
                    }
                    this.scriptElements.push(scriptElement);
                });
            }
            else {
                const scriptElement = (0, utils_1.loadScript)(this.id, {
                    ...this.options,
                });
                this.scriptElements.push(scriptElement);
            }
        }
    }
    /**
     * Check if plugin is in debug mode.
     *
     * @returns `true` if the plugin is in debug mode, otherwise `false`.
     */
    debugEnabled() {
        var _a;
        return (_a = this.options.debug) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Enable or disable debug mode.
     *
     * @param enable `true` to enable, `false` to disable.
     */
    debug(enable) {
        this.options.debug = enable;
    }
    /**
     * Returns the `window.dataLayer` array if the script is running in browser context and the plugin is enabled,
     * otherwise `false`.
     *
     * @returns The `window.dataLayer` if script is running in browser context and plugin is enabled, otherwise `false`.
     */
    dataLayer() {
        var _a;
        if (this.isInBrowserContext() && this.options.enabled) {
            return (window.dataLayer = (_a = window.dataLayer) !== null && _a !== void 0 ? _a : []);
        }
        return false;
    }
    /**
     * Track a view event with `event: "content-view"`.
     *
     * The event will only be send if the script runs in browser context and the if plugin is enabled.
     *
     * If debug mode is enabled, a "Dispatching TrackView" is logged,
     * regardless of whether the plugin is enabled or the plugin is being executed in browser context.
     *
     * @param screenName Name of the screen passed as `"content-view-name"`.
     * @param path Path passed as `"content-name"`.
     * @param additionalEventData Additional data for the event object. `event`, `"content-name"` and `"content-view-name"` will always be overridden.
     */
    trackView(screenName, path, additionalEventData = {}) {
        var _a, _b;
        const trigger = this.isInBrowserContext() && ((_a = this.options.enabled) !== null && _a !== void 0 ? _a : false);
        if (this.options.debug) {
            console.log(`[GTM-Support${trigger ? '' : '(disabled)'}]: Dispatching TrackView`, { screenName, path });
        }
        if (trigger) {
            const dataLayer = (window.dataLayer =
                (_b = window.dataLayer) !== null && _b !== void 0 ? _b : []);
            dataLayer.push({
                ...additionalEventData,
                event: 'content-view',
                'content-name': path,
                'content-view-name': screenName,
            });
        }
    }
    /**
     * Track an event.
     *
     * The event will only be send if the script runs in browser context and the if plugin is enabled.
     *
     * If debug mode is enabled, a "Dispatching event" is logged,
     * regardless of whether the plugin is enabled or the plugin is being executed in browser context.
     *
     * @param param0 Object that will be used for configuring the event object passed to GTM.
     * @param param0.event `event`, default to `"interaction"` when pushed to `window.dataLayer`.
     * @param param0.category Optional `category`, passed as `target`.
     * @param param0.action Optional `action`, passed as `action`.
     * @param param0.label Optional `label`, passed as `"target-properties"`.
     * @param param0.value Optional `value`, passed as `value`.
     * @param param0.noninteraction Optional `noninteraction`, passed as `"interaction-type"`.
     */
    trackEvent({ event, category = null, action = null, label = null, value = null, noninteraction = false, ...rest } = {}) {
        var _a, _b;
        const trigger = this.isInBrowserContext() && ((_a = this.options.enabled) !== null && _a !== void 0 ? _a : false);
        if (this.options.debug) {
            console.log(`[GTM-Support${trigger ? '' : '(disabled)'}]: Dispatching event`, {
                event,
                category,
                action,
                label,
                value,
                ...rest,
            });
        }
        if (trigger) {
            const dataLayer = (window.dataLayer =
                (_b = window.dataLayer) !== null && _b !== void 0 ? _b : []);
            dataLayer.push({
                event: event !== null && event !== void 0 ? event : 'interaction',
                target: category,
                action: action,
                'target-properties': label,
                value: value,
                'interaction-type': noninteraction,
                ...rest,
            });
        }
    }
}
exports.GtmSupport = GtmSupport;
//# sourceMappingURL=gtm-support.js.map