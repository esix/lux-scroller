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
            var _a = this._innerFromContainer({ x: containerX, y: containerY }), x = _a.x, y = _a.y;
            console.log('onTouchStart ', containerX, containerY, 'inner ', x, y);
            this._isTouch = true;
            this._touchInnerX = x;
            this._touchInnerY = y;
        };
        ScrollController.prototype.onTouchMove = function (containerX, containerY) {
            if (this._isTouch) {
                this._x = this._touchInnerX - containerX;
                this._y = this._touchInnerY - containerY;
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
            var newPos = createPosition(this._x, this._y, this._containerWidth, this._contentHeight);
            if (newPos.left !== this._pos.left || newPos.top !== this._pos.top) {
                this._pos = newPos;
            }
        };
        ScrollController.prototype._innerFromContainer = function (_a) {
            var x = _a.x, y = _a.y;
            x = this._pos.left + x;
            y = this._pos.top + y;
            return { x: x, y: y };
        };
        return ScrollController;
    }());
    exports.ScrollController = ScrollController;
});
