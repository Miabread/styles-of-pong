export const createState = ({ context, canvas }) => ({
    context,
    canvas,
    background: {
        color: '#595347',
        x: 0,
        y: 0,
        width: 1,
        height: 1,
    },
    time: {
        current: null,
        previous: null,
        delta: null,
    },
    paddles: {
        left: {
            ...defaultPaddle,
            color: '#d98100',
            x: 0.2,
            upKey: 'w',
            downKey: 's',
        },
        right: {
            ...defaultPaddle,
            color: '#4b85a8',
            x: 1 - 0.2,
            upKey: 'o',
            downKey: 'k',
        },
    },
    ball: {
        color: '#e1b200',
        x: -1,
        y: -1,
        width: .02,
        height: .02,
        speed: .0002,
        dx: 0,
        dy: 0,
    },
});

const defaultPaddle = {
    y: .5,
    width: .01,
    height: .1,
    speed: .0005,
};
