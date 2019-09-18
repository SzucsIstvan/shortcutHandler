const handlers =  {
    "F1": {
        method: e => console.log("F1", e),
        prevent: true,
    },
    "ArrowLeft": {
        method: e => console.log("ArrowLeft", e),
        prevent: false
    },
    "ArrowRight": {
        method: e => console.log("ArrowRight", e),
        prevent: false
    },
    "ArrowUp": {
        method: e => console.log("ArrowUp", e),
        prevent: true
    },
    "ArrowDown": {
        method: e => console.log("ArrowDown", e),
        prevent: true
    }
};

class bela {

    handlers() {
        return handlers;
    }

    callKey(key, e) {
        const keys = this.handlers();
        if (keys[key] && keys[key].method) {
            keys[key].method(e);
            return keys[key].prevent;
        }
        return false;
    }

    listener(e) {
        console.log("listener", e, this);
        if (this.callKey(e.code, e)) {
            e.preventDefault();
            console.log("elkapva nincs tovabb");
        }
    }

    start(dom) {
        if (dom) {
            this.doms.push(dom);
        } else {
            dom = window;
        }
        console.log("start listening on", dom);
        dom.addEventListener("keydown", this.bindedListener);
    }

    stop(dom) {
        if (!dom) {
            dom = window;
        }
        console.log("stop listening on", dom);
        dom.removeEventListener("keydown", this.bindedListener);
    }

    stopAll() {
        for (var i in this.doms) {
            this.doms.removeEventListener("keydown", this.bindedListener)
        }
    }

    constructor() {
        console.log("It is construct");
        this.bindedListener = this.listener.bind(this);
        this.doms = [];
    }
};

export default bela;