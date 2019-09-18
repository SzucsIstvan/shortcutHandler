import ShortcutHandler from "./shortcutHandler/index";

const sh = require('./shortcutHandler/index').default;

const handler = new sh();

window.handler = handler;

handler.start();
handler.setFilter((dom, e) => {
    console.log("filter", dom, e)
    if (dom.id === 'third')  {
        return false;
    }

    return true;

});