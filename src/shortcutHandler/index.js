const handlers =  {
    all: {
        "F1": {
            method: e => console.log("F1", e),
            prevent: true,
        },
        "F2": {
            method: e => {
                document.getElementById("first").focus();
            },
            prevent: true,
        },
        "F3": {
            method: e => {
                document.getElementById("second").focus();
            },
            prevent: true,
        },
        "F4": {
            method: e => {
                document.getElementById("third").focus();
                },
            prevent: true,
        },
        "F5": {
            method: e => {

            },
            prevent: true,
        },
        "Tab": {
            method: e => console.log("Tab", e),
            prevent: false,
        },
        "Escape": {
            method: e => document.body.focus(),
            prevent: false,
        }
    },
    input: {
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
        },
        "F3": {
            method: e => console.log("F3 - nem csinal semmit", e),
            prevent: true
        },
        "Tab": {
            method: e => {
                console.log("input Tab", e);
                document.getElementById("first").focus();

            },
            prevent: true,
        }
    },
    firstInput: {
        "Tab": {
            method: e => {
                console.log("firstInput Tab", e);
                document.getElementById("second").focus();
            },
            prevent: true,
        }
    }
};

class bela {

    handlers() {
        return handlers;
    }

    callKeyByScope(scope, key, e) {
        const keys = this.handlers();
        let retval = false;
        if (keys[scope] && keys[scope][key] && keys[scope][key].method) {
            keys[scope][key].method(e);
            retval = keys[scope][key].prevent;
        }
        console.log("callKeyByScope", scope, key, retval)
        return retval;
    }

    callKey(key, e) {
        let retval = null;

        retval = this.callKeyByScope(this.scope, key, e);

        if (!retval && this.scope !== this.defaultScope) {
            retval = this.callKeyByScope(this.defaultScope, key, e);
        }

        return retval;
    }

    listener(e) {
        // console.log("listener", e, this);
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

    setScope(scope) {
        this.scope = scope;
    }

    setFilter(func) {
        this.filters.push(func);
    }


    constructor() {
        console.log("It is construct");
        this.bindedListener = this.listener.bind(this);
        this.doms = [];
        this.scope = 'all';
        this.defaultScope = 'all';
        this.filters = [];

        window.addEventListener("focusin", e => {
            console.log("focusin", e);
            this.stop(window);
            let flag = true;

            for (var i in this.filters) {
                if (typeof this.filters[i] === "function") {
                    flag = this.filters[i](e.target, e);
                }
                if (!flag) {
                    break;
                }
            }

            if (flag) {
                this.start(e.target);
            }

        });

        window.addEventListener("focusout", e => {
            console.log("focusout", e);
            this.stop(e.target);
            this.start(window);
        });

    }
};

export default bela;