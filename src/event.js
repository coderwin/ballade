'use strict';

/**
 * Mini Event Class
 */
var Event = function () {
    this.handlers = [];
};

Event.prototype = {
    /**
     * Publish event
     * @param {String} event type
     */
    publish: function (type) {
        this.handlers.forEach(function (item) {
            if (!item.type) {
                item.handler(type);
            }
            else if (item.type === type) {
                item.handler(type);
            }
        });
    },

    /**
     * Subscribe event
     * @param {String} event type, it can be ignored
     * @param {Function} event handler
     */
    subscribe: function (type, handler) {
        var result = {};

        if (typeof type === 'function') {
            result.handler = type;
        }
        else {
            result.handler = handler;
            result.type = type;
        }

        this.handlers.push(result);
    },

    /**
     * Cancel subscribe event
     * @param {String} event type, it optional
     * @param {Function} event handler
     */
    unsubscribe: function (type, handler) {
        if (typeof type === 'function') {
            handler = type;
            type = null;
        }

        var i = 0;
        var item;
        var flag = false;

        for (; i < this.handlers.length; i++) {
            item = this.handlers[i];

            if (!item.type) {
                flag = item.handler === handler;
            }
            else {
                if (type && handler) {
                    flag = item.type === type && item.handler === handler;
                }
                else if (type) {
                    flag = item.type === type;
                }
                else if (handler) {
                    flag = item.handler === handler;
                }
            }

            if (flag) {
                this.handlers.splice(i--, 1);
            }
        }
    }
};

module.exports = Event;
