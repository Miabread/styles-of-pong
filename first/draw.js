export const draw = (state) => {
    drawRectangle(state.background, state);
    drawRectangle(state.paddles.left, state);
    drawRectangle(state.paddles.right, state);
    drawRectangle(state.ball, state);
};

const drawRectangle = ({ color, x, y, width, height }, state) => {
    state.context.fillStyle = color;
    state.context.fillRect(
        state.canvas.width * x,
        state.canvas.height * y,
        state.canvas.width * width,
        state.canvas.height * height,
    );
};
