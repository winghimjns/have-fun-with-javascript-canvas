import {isNull} from "lodash";
export default class SessionCache {

    static cacheSet = {};

    static group = {};

    static remember(key, generator, groupKey = null) {

        // groupping function
        if (!isNull(groupKey)) {
            if (!SessionCache.group.hasOwnProperty(groupKey)) {
                SessionCache.group[groupKey] = [];
            }
            SessionCache.group[groupKey].push(key);
        }

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

    static dropGroup(group) {
        if (SessionCache.group.hasOwnProperty(group)) {
            SessionCache.group[group].map(key => {
                delete SessionCache.cacheSet[key];
            });
        }
    }
}
