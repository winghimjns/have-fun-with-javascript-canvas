const degree = {
    sin: angle => Math.sin(angle / 180 * Math.PI),
    cos: angle => Math.cos(angle / 180 * Math.PI),
    tan: angle => Math.tan(angle / 180 * Math.PI),

    asin: ratio => Math.asin(ratio) * 180 / Math.PI,
    acos: ratio => Math.acos(ratio) * 180 / Math.PI,
    atan: ratio => Math.atan(ratio) * 180 / Math.PI,
};

export default degree;
