import Cache from "./SessionCache";
import Point from "./Point";
import Line from "./canvas/Line";
import Image from "./canvas/Image";
import CanvasObject from "./canvas/CanvasObject";
import AnimatingObject from "./AnimatingObject";

const isRunning = Symbol('isRunning');
export default class CanvasGraph {

    /**
     * The node that will initialize the canvas in it
     */
    node;

    /**
     * canvas element
     */
    canvas;

    /**
     * canvas context
     */
    context;

    /**
     * A boolean value to determine if this CanvasGraph is running or not. if the value is true, the canvas should keep
     * rendering.
     */
    [isRunning] = false;

    /**
     * Constructor of this canvas graph class, the first parameter is the node, I just simply assign the local variable
     * to be that
     * @param {Node} node
     */
    constructor(node) {

        // type check
        if (!(node instanceof window.Node)) { throw new Error('The 1st parameter needs to be a Node'); }

        // generate a canvas element
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // append element
        node.appendChild(canvas);

        // assign
        this.node = node;
        this.canvas = canvas;
        this.context = context;

        // functions binding
        this.onCanvasResize = this.onCanvasResize.bind(this);
        this.update = this.update.bind(this);

        // TODO : put this statement in a better place
        canvas.addEventListener('click', () => Cache.clear());
    }

    /**
     * start the animation
     * @returns {CanvasGraph} this CanvasGraph it self
     */
    start() {
        this.renewCanvasSize();
        this[isRunning] = true;
        this.update();
        this.subscribeWindowResize();
        return this;
    }

    pause() {
        this[isRunning] = false;
        this.unsubscribeWindowResize();
        return this;
    }

    update() {
        if (!this[isRunning]) { return; }
        window.requestAnimationFrame(this.update);
        this.clearance();
        this.render();
        return this;
    }

    subscribeWindowResize() {
        window.addEventListener('resize', this.onCanvasResize);
        return this;
    }

    unsubscribeWindowResize() {
        window.removeEventListener('resize', this.onCanvasResize);
        return this;
    }

    onCanvasResize() {
        this.renewCanvasSize();
    }

    renewCanvasSize() {
        const {node, canvas} = this;
        const {width: nodeWidth, height: nodeHeight} = node.getBoundingClientRect();
        canvas.width = nodeWidth;
        canvas.height = nodeHeight;
        return this;
    }

    clearance() {
        const {canvas: {width, height}, context} = this;
        context.clearRect(0, 0, width, height);
    }

    render() {
        const {canvas, context} = this;
        const {width, height} = this.canvas;
        const center = new Point(width >> 1, height >> 1) ;

        const image = Cache.remember('image', () => {
            return new Image({
                src: './img/small.svg',
                center,
                rotate: 30,
            });
        });

        Cache.remember('imageAnimating', () => new AnimatingObject({
            duration: 3000,
        }, state => {
            image.rotate = state * 360;
            image.draw(context);
        })).update();

        return this;
    }
}
