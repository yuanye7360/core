import type { GtmQueryParams } from './gtm-container';
/**
 *  OnReadyOptions.
 */
export interface OnReadyOptions {
    /**
     * The GTM id.
     */
    id: string;
    /**
     * The script element.
     */
    script: HTMLScriptElement;
}
/**
 * Options for `loadScript` function.
 */
export interface LoadScriptOptions {
    /**
     * Add url query string when load gtm.js with GTM ID.
     */
    queryParams?: GtmQueryParams;
    /**
     * Script can be set to `type` to speed up page load
     */
    type?: string;
    /**
     * Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible).
     */
    defer: boolean;
    /**
     * Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`.
     */
    compatibility: boolean;
    /**
     * Will add `nonce` to the script tag.
     *
     * @see [Using Google Tag Manager with a Content Security Policy](https://developers.google.com/tag-manager/web/csp)
     */
    nonce?: string;
    /**
     * Where to append the script element.
     *
     * @default document.body
     */
    parentElement?: HTMLElement;
    /**
     * The URL of the script; useful for server-side GTM.
     *
     * @default https://www.googletagmanager.com/gtm.js
     */
    source?: string;
    /**
     * Will be called when the script is loaded.
     *
     * @param options Object containing container `id` and `script` element.
     */
    onReady?: (options: OnReadyOptions) => void;
}
/**
 * Load GTM script tag.
 *
 * @param id GTM ID.
 * @param config The config object.
 * @returns The script element.
 */
export declare function loadScript(id: string, config: LoadScriptOptions): HTMLScriptElement;
/**
 * Check if GTM script is in the document.
 *
 * @param source The URL of the script, if it differs from the default. Default: 'https://www.googletagmanager.com/gtm.js'.
 * @returns `true` if in the `document` is a `script` with `src` containing `'https://www.googletagmanager.com/gtm.js'` (or `source` if specified), otherwise `false`.
 */
export declare function hasScript(source?: string): boolean;
