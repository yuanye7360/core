"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasScript = exports.loadScript = void 0;
/**
 * Load GTM script tag.
 *
 * @param id GTM ID.
 * @param config The config object.
 * @returns The script element.
 */
function loadScript(id, config) {
    var _a, _b, _c, _d, _e;
    const doc = document;
    const script = doc.createElement('script');
    const scriptLoadListener = (event) => {
        var _a;
        (_a = config.onReady) === null || _a === void 0 ? void 0 : _a.call(config, { id, script });
        script.removeEventListener('load', scriptLoadListener);
    };
    script.addEventListener('load', scriptLoadListener);
    window.dataLayer = (_a = window.dataLayer) !== null && _a !== void 0 ? _a : [];
    (_b = window.dataLayer) === null || _b === void 0 ? void 0 : _b.push({
        event: 'gtm.js',
        'gtm.start': new Date().getTime(),
    });
    if (!id) {
        return script;
    }
    script.async = !config.defer;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    script.defer = Boolean(config.defer || config.compatibility);
    if (config.type) {
        script.type = config.type;
    }
    if (config.nonce) {
        script.nonce = config.nonce;
    }
    const queryString = new URLSearchParams({
        id,
        ...((_c = config.queryParams) !== null && _c !== void 0 ? _c : {}),
    });
    const source = (_d = config.source) !== null && _d !== void 0 ? _d : 'https://www.googletagmanager.com/gtm.js';
    script.src = `${source}?${queryString}`;
    const parentElement = (_e = config.parentElement) !== null && _e !== void 0 ? _e : doc.body;
    if (typeof (parentElement === null || parentElement === void 0 ? void 0 : parentElement.appendChild) !== 'function') {
        throw new Error('parentElement must be a DOM element');
    }
    parentElement.appendChild(script);
    return script;
}
exports.loadScript = loadScript;
/**
 * Check if GTM script is in the document.
 *
 * @param source The URL of the script, if it differs from the default. Default: 'https://www.googletagmanager.com/gtm.js'.
 * @returns `true` if in the `document` is a `script` with `src` containing `'https://www.googletagmanager.com/gtm.js'` (or `source` if specified), otherwise `false`.
 */
function hasScript(source = 'https://www.googletagmanager.com/gtm.js') {
    return Array.from(document.getElementsByTagName('script')).some((script) => script.src.includes(source));
}
exports.hasScript = hasScript;
//# sourceMappingURL=utils.js.map