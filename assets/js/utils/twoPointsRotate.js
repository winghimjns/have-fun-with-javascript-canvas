import degree from "./degree";
import Point from "../models/Point";

const addingAngle = (x, y) => {
    if (x >= 0 && y >= 0) { return 0; }
    else if (x < 0 && y >= 0) { return 90; }
    else if (x < 0 && y < 0) { return 180; }
    else { return 270; }
};

const twoPointsRotate = (center, objectPoint, rotate) => {
    const xLength = objectPoint.x - center.x;
    const yLength = objectPoint.y - center.y;
    const distance = Math.sqrt(xLength * xLength + yLength * yLength);
    const originalAngle = degree.atan(yLength / xLength) + addingAngle(xLength, yLength);
    const newAngle = originalAngle + rotate;
    const newX = center.x + degree.cos(newAngle) * distance;
    const newY = center.y + degree.sin(newAngle) * distance;
    return new Point(newX, newY);
};

export default twoPointsRotate;