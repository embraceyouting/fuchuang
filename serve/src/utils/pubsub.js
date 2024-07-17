class pubSub {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    off(eventName, callback) {
        if (!this.events[eventName]) {
            return;
        }
        if (!callback) {
            this.events[eventName] = [];
            return;
        }
        this.events[eventName] = this.events[eventName].filter((fn) => fn !== callback);
    }

    emit(eventName, ...args) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName].forEach((fn) => fn(...args));
    }
}

export default new pubSub()