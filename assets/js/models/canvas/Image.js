import CanvasObject from "./CanvasObject";
import Point from "../Point";

export default class Image extends CanvasObject {

    center;

    rotate;

    image;

    constructor(props) {
        super(props);

        const image = new window.Image();
        image.src = props.src || '';

        this.image = image;
        this.rotate = props.rotate || 0;
        this.center = props.center || new Point();
    }

    draw(context) {
        const {image, center, rotate} = this;
        context.save();
        context.rotate(rotate * Math.PI / 180);
        const rotatedCenter = CanvasObject.rotatePoint(center, rotate);
        context.drawImage(image, rotatedCenter.x - (image.width >> 1), rotatedCenter.y - (image.height >> 1));
        context.restore();
    }

    setCenter(center) {
        if (this.center !== center) {
            this.center = center;
        }
        return this;
    }
};

