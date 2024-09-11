module.exports = class Debug {
    constructor() {
        this.debug = true;
    }

    log(...args) {
        if (this.debug) {
            console.log('[🐛 DEBUGGING ]: ' + args);
        }
    }

    warning(...args) {
        if (this.debug) {
            console.log('[⚠️  DEBUGGING ]: ' + args);
        }
    }

    error(...args) {
        if (this.debug) {
            console.log('[❌ DEBUGGING ]: ' + args);
        }
    }
}