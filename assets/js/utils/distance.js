const distance = (pointA, pointB) => {
    // pythagorean theorem
    const a = pointA.x - pointB.x;
    const b = pointA.y - pointB.y;
    return Math.sqrt(a * a + b * b);
};

export default distance;
