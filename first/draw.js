export const draw = (state) => {
    drawRectangle(state.background, state);
    drawRectangle(state.paddles.left, state);
    drawRectangle(state.paddles.right, state);
    drawRectangle(state.ball, state);
};

const drawRectangle = ({ color, x, y, width, height }, { context: { canvas } }) => {
    state.context.fillStyle = color;
    state.context.fillRect(
        canvas.width * x,
        canvas.height * y,
        canvas.width * width,
        canvas.height * height,
    );
};
