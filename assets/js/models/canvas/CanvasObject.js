import degree from "../../utils/degree";
import Point from "../Point";

export default class CanvasObject {

    static rotatePoint(point, rotate) {

        // pythagorean theorem
        const distance = Math.sqrt(point.x * point.x + point.y * point.y);

        // calculate the degree with tangen
        const currentDegree = degree.atan(point.y / point.x);

        const switchedDegree = currentDegree - rotate;

        const outputX = degree.cos(switchedDegree) * distance;
        const outputY = degree.sin(switchedDegree) * distance;

        return new Point(outputX, outputY);
    }

};
