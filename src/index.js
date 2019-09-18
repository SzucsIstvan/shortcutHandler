import ShortcutHandler from "./shortcutHandler/index";

const sh = require('./shortcutHandler/index').default;

const handler = new sh();

window.handler = handler;

handler.start();
