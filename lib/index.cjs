"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const GTM_ID_PATTERN = /^GTM-[0-9A-Z]+$/;
function assertIsGtmId(id) {
  if (typeof id !== "string" || !GTM_ID_PATTERN.test(id)) {
    const suggestion = String(id).toUpperCase().replace(/.*-|[^0-9A-Z]/g, "");
    const suggestionText = suggestion.length === 0 ? "" : ` Did you mean 'GTM-${suggestion}'?`;
    throw new Error(
      `'${id}' is not a valid GTM-ID (${GTM_ID_PATTERN}).${suggestionText}`
    );
  }
}
function loadScript(id, config) {
  var _a;
  const doc = document;
  const script = doc.createElement("script");
  const scriptLoadListener = (event) => {
    var _a2;
    (_a2 = config.onReady) == null ? void 0 : _a2.call(config, { id, script });
    script.removeEventListener("load", scriptLoadListener);
  };
  script.addEventListener("load", scriptLoadListener);
  window.dataLayer = window.dataLayer ?? [];
  (_a = window.dataLayer) == null ? void 0 : _a.push({
    event: "gtm.js",
    "gtm.start": new Date().getTime()
  });
  if (!id) {
    return script;
  }
  script.async = !config.defer;
  script.defer = Boolean(config.defer || config.compatibility);
  if (config.type) {
    script.type = config.type;
  }
  if (config.nonce) {
    script.nonce = config.nonce;
  }
  const queryString = new URLSearchParams({
    id,
    ...config.queryParams ?? {}
  });
  const source = config.source ?? "https://www.googletagmanager.com/gtm.js";
  script.src = `${source}?${queryString}`;
  const parentElement = config.parentElement ?? doc.body;
  if (typeof (parentElement == null ? void 0 : parentElement.appendChild) !== "function") {
    throw new Error("parentElement must be a DOM element");
  }
  parentElement.appendChild(script);
  return script;
}
function hasScript(source = "https://www.googletagmanager.com/gtm.js") {
  return Array.from(document.getElementsByTagName("script")).some(
    (script) => script.src.includes(source)
  );
}
class GtmSupport {
  id;
  options;
  scriptElements = [];
  constructor(options) {
    if (Array.isArray(options.id)) {
      for (const idOrObject of options.id) {
        if (typeof idOrObject === "string") {
          assertIsGtmId(idOrObject);
        } else {
          assertIsGtmId(idOrObject.id);
        }
      }
    } else {
      assertIsGtmId(options.id);
    }
    this.id = options.id;
    this.options = {
      enabled: true,
      debug: false,
      loadScript: true,
      defer: false,
      compatibility: false,
      ...options
    };
    delete this.options.id;
  }
  isInBrowserContext = () => typeof window !== "undefined";
  enabled() {
    return this.options.enabled ?? true;
  }
  enable(enabled = true, source) {
    this.options.enabled = enabled;
    if (this.isInBrowserContext() && enabled && !hasScript(source) && this.options.loadScript) {
      if (Array.isArray(this.id)) {
        this.id.forEach((id) => {
          let scriptElement;
          if (typeof id === "string") {
            scriptElement = loadScript(id, {
              ...this.options
            });
          } else {
            scriptElement = loadScript(id.id, {
              ...this.options,
              queryParams: id.queryParams
            });
          }
          this.scriptElements.push(scriptElement);
        });
      } else {
        const scriptElement = loadScript(this.id, {
          ...this.options
        });
        this.scriptElements.push(scriptElement);
      }
    }
  }
  debugEnabled() {
    return this.options.debug ?? false;
  }
  debug(enable) {
    this.options.debug = enable;
  }
  dataLayer() {
    if (this.isInBrowserContext() && this.options.enabled) {
      return window.dataLayer = window.dataLayer ?? [];
    }
    return false;
  }
  trackView(screenName, path, additionalEventData = {}) {
    const trigger = this.isInBrowserContext() && (this.options.enabled ?? false);
    if (this.options.debug) {
      console.log(
        `[GTM-Support${trigger ? "" : "(disabled)"}]: Dispatching TrackView`,
        { screenName, path }
      );
    }
    if (trigger) {
      const dataLayer = window.dataLayer = window.dataLayer ?? [];
      dataLayer.push({
        ...additionalEventData,
        event: this.options.trackViewEventProperty ?? "content-view",
        "content-name": path,
        "content-view-name": screenName
      });
    }
  }
  trackEvent({
    event,
    category = null,
    action = null,
    label = null,
    value = null,
    noninteraction = false,
    ...rest
  } = {}) {
    const trigger = this.isInBrowserContext() && (this.options.enabled ?? false);
    if (this.options.debug) {
      console.log(
        `[GTM-Support${trigger ? "" : "(disabled)"}]: Dispatching event`,
        {
          event,
          category,
          action,
          label,
          value,
          ...rest
        }
      );
    }
    if (trigger) {
      const dataLayer = window.dataLayer = window.dataLayer ?? [];
      dataLayer.push({
        event: event ?? "interaction",
        target: category,
        action,
        "target-properties": label,
        value,
        "interaction-type": noninteraction,
        ...rest
      });
    }
  }
}
exports.GTM_ID_PATTERN = GTM_ID_PATTERN;
exports.GtmSupport = GtmSupport;
exports.assertIsGtmId = assertIsGtmId;
exports.hasScript = hasScript;
exports.loadScript = loadScript;