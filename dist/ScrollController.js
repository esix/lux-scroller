(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createPosition(contentLeft, contentTop, containerWidth, containerHeight) {
        return Object.freeze({
            isMoving: false,
            left: contentLeft,
            top: contentTop,
            width: containerWidth,
            height: containerHeight,
        });
    }
    var ScrollController = /** @class */ (function () {
        function ScrollController(options) {
            this._touchX = 0;
            this._touchY = 0;
            this._touchInnerX = 0;
            this._touchInnerY = 0;
            this._isTouch = false;
            this._containerWidth = options.containerWidth;
            this._containerHeight = options.containerHeight;
            this._contentWidth = (typeof options.contentWidth === 'number') ? options.contentWidth : this._containerWidth;
            this._contentHeight = (typeof options.contentHeight === 'number') ? options.contentHeight : this._containerHeight;
            this._x = (typeof options.initialX === 'number') ? options.initialX : 0;
            this._y = (typeof options.initialY === 'number') ? options.initialY : 0;
            this._vx = 0;
            this._vy = 0;
            this._pos = createPosition(this._x, this._y, this._containerWidth, this._contentHeight);
            this._lastTs = new Date().valueOf();
        }
        ScrollController.prototype.getPosition = function () {
            this._updatePosition();
            return this._pos;
        };
        ScrollController.prototype.setContainerSize = function (width, height) {
            //
        };
        ScrollController.prototype.setContentSize = function (width, height) {
            //
        };
        ScrollController.prototype.onTouchStart = function (containerX, containerY) {
            console.log('onTouchStart');
            this._isTouch = true;
            this._touchX = containerX;
            this._touchY = containerX;
            this._touchInnerX = this._pos.left + containerX;
            this._touchInnerY = this._pos.top + containerY;
        };
        ScrollController.prototype.onTouchMove = function (containerX, containerY) {
            if (this._isTouch) {
                var dx = containerX - this._touchX;
                var dy = containerY - this._touchY;
                this._x = this._touchInnerX - dx;
                this._y = this._touchInnerY - dy;
            }
        };
        ScrollController.prototype.onTouchEnd = function (containerX, containerY) {
            if (this._isTouch) {
                console.log('onTouchEnd');
                this._isTouch = false;
            }
        };
        // private section
        ScrollController.prototype._updatePosition = function () {
            var ts = new Date().valueOf();
            this._pos = createPosition(this._x, this._y, this._containerWidth, this._contentHeight);
        };
        return ScrollController;
    }());
    exports.ScrollController = ScrollController;
});
