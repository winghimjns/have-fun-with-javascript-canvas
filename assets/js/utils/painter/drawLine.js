/**
 * well, this is just for testing or just to draw a line to guide me how the things to be rendered.
 * @param context
 * @param options
 */
const drawLine = (context, {from, to, lineWidth, color}) => {
    return new Line({from, to, lineWidth, color}).draw(context);
};

export default drawLine;
