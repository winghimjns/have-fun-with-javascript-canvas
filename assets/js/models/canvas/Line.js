import CanvasObject from "./CanvasObject";

export default class Line extends CanvasObject {

    /**
     * @type Point
     */
    from;

    /**
     * @type Point
     */
    to;

    /**
     * @type int
     */
    lineWidth;

    constructor(props) {
        super(props);
        this.from = props.from || new Point(0, 0);
        this.to = props.to || new Point(0, 0);
        this.lineWidth = props.lineWidth || 1;
    }

    draw(context) {
        // TODO : check context's instance of
        const {from, to} = this;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineWidth = this.lineWidth;
        context.lineTo(to.x, to.y);
        context.stroke();
    }

    getFrom() { return this.form; }
    getTo() { return this.to; }
    getLineWidth() { return this.lineWidth; }

    setFrom(from) {
        // TODO : check type
        this.from = from;
        return this;
    }

    setTo(to) {
        // TODO : check type
        this.to = to;
        return this;
    }

    setLineWidth(lineWidth) {
        // TODO : check type
        this.lineWidth = lineWidth;
        return this;
    }
}
