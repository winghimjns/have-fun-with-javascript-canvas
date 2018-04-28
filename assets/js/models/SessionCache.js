export default class SessionCache {

    static cacheSet = {};

    static remember(key, generator) {
        return SessionCache.cacheSet[key] || (SessionCache.cacheSet[key] = generator());
    }

    static clear() {
        SessionCache.cacheSet = {};
    }
}
