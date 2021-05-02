import { isKeyDown } from './index.js';

export const update = (state) => {
    updateDelta(state);
    updatePaddle(state.paddles.left, state);
    updatePaddle(state.paddles.right, state);
    updateBall(state);
};

const updateDelta = ({ time }) => {
    time.delta = time.current - (time.previous ?? time.current);
    time.previous = time.current;
};

const updatePaddle = (paddle, state) => {
    movePaddle(paddle, state);
    updatePaddlePastTop(paddle, state);
    updatePaddlePastBottom(paddle, state);
};

const movePaddle = (paddle, { time }) => {
    if (isKeyDown(paddle.upKey)) {
        paddle.y -= paddle.speed * time.delta;
    }

    if (isKeyDown(paddle.downKey)) {
        paddle.y += paddle.speed * time.delta;
    }
};

const updatePaddlePastTop = (paddle, { background }) => {
    if (isPastTop(paddle, background)) {
        paddle.y = background.y;
    }
};

const isPastTop = (rect1, rect2) => {
    return rect1.y < rect2.y;
};

const updatePaddlePastBottom = (paddle, { background }) => {
    if (isPastBottom(paddle, background)) {
        paddle.y = minimumClearanceFromBottom(paddle, background);
    }
};

const isPastBottom = (rect1, rect2) => {
    return rect1.y + rect1.height > rect2.y + rect2.height
};

const minimumClearanceFromBottom = (rect1, rect2) => {
    return rect2.y + rect2.height - rect1.height;
};

const updateBall = (state) => {
    moveBall(state);
    updateBallPastVerticalWall(state);
    updateBallPastHorizontalWall(state);
    updateBallInsidePaddle(state.paddles.left, state);
    updateBallInsidePaddle(state.paddles.right, state);
};

const moveBall = ({ ball, time }) => {
    ball.x += ball.dx * time.delta;
    ball.y += ball.dy * time.delta;
};

const updateBallPastVerticalWall = ({ ball, background }) => {
    if (isPastTop(ball, background) || isPastBottom(ball, background)) {
        bounceBallOffVertical(ball);
    }
};

const bounceBallOffVertical = (ball) => {
    ball.dy = -ball.dy;
    ball.y += ball.dy;
};

const updateBallPastHorizontalWall = (state) => {
    const { ball, background } = state;

    if (isPastLeft(ball, background) || isPastRight(ball, background)) {
        resetBall(state);
    }
};

const isPastLeft = (rect1, rect2) => {
    return rect1.x < rect2.x;
};

const isPastRight = (rect1, rect2) => {
    return rect1.x + rect1.width > rect2.x + rect2.width;
};

const resetBall = ({ ball, background }) => {
    ball.x = centerX(background);
    ball.y = centerY(background);

    const side = negateRandomly();

    ball.dx = ball.speed * side;
    ball.dy = Math.random() * ball.speed * side;
};

const centerX = (rect) => {
    return (rect.x + rect.width) / 2;
};

const centerY = (rect) => {
    return (rect.y + rect.height) / 2;
}

const negateRandomly = () => {
    return Math.random() > .5 ? -1 : 1;
};

const updateBallInsidePaddle = (paddle, { ball }) => {
    if (areColliding(paddle, ball)) {
        bounceBallOffHorizontal(ball);
    }
};

const areColliding = (rect1, rect2) => {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
};

const bounceBallOffHorizontal = (ball) => {
    ball.dx = -ball.dx;
    ball.x += ball.dx;
};
