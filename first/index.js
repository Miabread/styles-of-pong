const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const resize = () => {
    // Ensure canvas logical size matches display size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

resize(); // Once on init and on every resize
window.addEventListener('resize', resize);

const currentHeldKeys = new Set();
window.addEventListener('keydown', (e) => currentHeldKeys.add(e.key));
window.addEventListener('keyup', (e) => currentHeldKeys.delete(e.key));

export const isKeyDown = (key) => currentHeldKeys.has(key);

import { update } from './update.js';
import { draw } from './draw.js';
import { createState } from './state.js';

const state = createState({ context, canvas });

window.state = state;

const loop = (timestamp) => {
    state.time.current = timestamp;

    update(state);
    draw(state);

    requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
