export default class SessionCache {

    static cacheSet = {};

    static remember(key, generator) {
        return SessionCache.cacheSet[key] || (SessionCache.cacheSet[key] = generator());
    }

    static get(key, defaultValue = null) {
        return SessionCache.cacheSet(key) || defaultValue || null;
    }

    static clear() {
        SessionCache.cacheSet = {};
    }

    static drop(key) {
        delete SessionCache.cacheSet[key];
    }
}
