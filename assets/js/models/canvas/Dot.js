import CanvasObject from "./CanvasObject";
import Point from "../Point";

export default class Dot {

    center;

    radius;

    color;

    constructor(props) {
        this.center = props.center || new Point();
        this.radius = props.radius || 1;
        this.color = props.color || '#000000';
    }

    draw(context) {

    }
}
