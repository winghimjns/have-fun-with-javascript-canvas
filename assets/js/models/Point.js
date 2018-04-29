export default class Point {

    x;
    y;

    constructor(x = null, y = null) {
        this.x = x;
        this.y = y;
    }

    move(x = 0, y = 0) {
        return new Point(this.x + x, this.y + y);
    }

    equalsTo(point) {
        return point.x === this.x && point.y === this.y;
    }
}
