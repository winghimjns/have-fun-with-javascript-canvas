import easing from "../utils/easing";

export default class AnimatingObject {

    callback;

    startedTime;

    duration;

    easingFunction;

    constructor(props, callback) {
        this.startedTime = props.startedTime || (+(new Date()));
        this.duration = props.duration || 1000;
        this.easingFunction = props.easingFunction || easing.easeInOutQuad;
        this.callback = callback;
    }

    reset() {
        this.startedTime = (+(new Date()));
    }

    update() {
        const {startedTime, duration, easingFunction, callback} = this;
        const now = (+(new Date()));
        const nowPassed = Math.min((now - startedTime) / duration, 1);
        return callback.bind(this)(nowPassed !== 1 ? easingFunction(nowPassed) : 1);
    }
}
