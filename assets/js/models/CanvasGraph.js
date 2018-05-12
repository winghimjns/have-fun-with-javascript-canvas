import Cache from "./SessionCache";
import Point from "./Point";
import Line from "./canvas/Line";
import Image from "./canvas/Image";
import CanvasObject from "./canvas/CanvasObject";
import AnimatingObject from "./AnimatingObject";
import Dot from "./canvas/Dot";
import distance from "../utils/distance";
import twoPointsRotate from "../utils/twoPointsRotate";

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
        this.initialize();
        this.update();
        this.subscribeWindowResize();
        return this;
    }

    pause() {
        this[isRunning] = false;
        this.unsubscribeWindowResize();
        return this;
    }

    end() {
        this.uninitialize();
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
        Cache.dropGroup('dropOnResize');
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

    initialize() {

    }

    uninitialize() {

    }

    render() {
        const {canvas, context} = this;
        const {width, height} = this.canvas;

        const center = Cache.remember('canvasCenter', () => new Point(width >> 1, height >> 1), 'dropOnResize');

        const rotatorDistance = Cache.remember('rotatorDistance', () => {
            return distance(center, new Point(width * .2, height * .8));
        }, 'dropOnResize');

        const rotateCenterPointDistance = Cache.remember('rotateCenterPointDistance', () => {
            return Math.sqrt((rotatorDistance * rotatorDistance) >> 1);
        }, 'dropOnResize');

        const firstRotateCenterPoint = Cache.remember('firstRotateCenterPoint', () => center.move(-rotateCenterPointDistance, -rotateCenterPointDistance));

        const rotateCenterPoints = Cache.remember('rotateCenterPoints', () => ([
            firstRotateCenterPoint, twoPointsRotate(center, firstRotateCenterPoint, 45), twoPointsRotate(center, firstRotateCenterPoint, 90),
            twoPointsRotate(center, firstRotateCenterPoint, 135), twoPointsRotate(center, firstRotateCenterPoint, 180), twoPointsRotate(center, firstRotateCenterPoint, 225),
            twoPointsRotate(center, firstRotateCenterPoint, 270), twoPointsRotate(center, firstRotateCenterPoint, 315),
        ]));

        rotateCenterPoints.map((point, index) => {
            new Dot({
                center: point,
                color: '#0000ff',
                radius: 20,
            }).draw(context);



        });


        const image = Cache.remember('image', () => new Image({
            src: './img/small.svg',
            center,
            rotate: 30,
        })).setCenter(center);

        // Cache.remember('imageRotating', () => new AnimatingObject({
        //     duration: 3000,
        // }, function(state) {
        //     image.rotate = state * 360 * 2;
        //     const imageCenter = twoPointsRotate(firstRotateCenterPoint, center, state * -90);
        //     image.setCenter(imageCenter);
        //     image.draw(context);
        //     if (state === 1) { this.restart(); }
        // })).update();

        // new Dot({
        //     center: firstRotateCenterPoint,
        //     color: '#000000',
        //     radius: 20,
        // }).draw(context);

        new Dot({
            center: center,
            color: '#ff0000',
            radius: 20,
        }).draw(context);




        return this;
    }
}
