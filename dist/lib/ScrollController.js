"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vec2_1 = require("./Vec2");
function createPosition(center, zoom, containerSize) {
    var viewportSize = containerSize.hadamard(zoom.inv());
    var lt = center.sub(viewportSize.div(2));
    var rb = lt.add(viewportSize);
    return Object.freeze({
        isMoving: false,
        zoomX: zoom.x,
        zoomY: zoom.y,
        width: viewportSize.x,
        height: viewportSize.y,
        left: lt.x,
        top: lt.y,
        // 
        containerSize: containerSize, viewportSize: viewportSize, zoom: zoom, center: center,
        lx: lt.x,
        ty: lt.y,
        rx: rb.x,
        by: rb.y,
    });
}
var ScrollController = /** @class */ (function () {
    function ScrollController(options) {
        this._touch = null;
        this._containerSize = new Vec2_1.Vec2(options.containerWidth, options.containerHeight);
        this._innerSize = new Vec2_1.Vec2((typeof options.contentWidth === 'number') ? options.contentWidth : this._containerSize.x, (typeof options.contentHeight === 'number') ? options.contentHeight : this._containerSize.y);
        var lt = new Vec2_1.Vec2((typeof options.initialX === 'number') ? options.initialX : 0, (typeof options.initialY === 'number') ? options.initialY : 0);
        this._center = lt.add(this._containerSize.div(2));
        this._zoom = new Vec2_1.Vec2(1, 1);
        this._v = new Vec2_1.Vec2(0, 0);
        this._pos = createPosition(this._center, this._zoom, this._containerSize);
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
        var outerPos = new Vec2_1.Vec2(containerX, containerY);
        var innerPos = this._innerFromContainer(outerPos);
        console.log('onTouchStart outer:', outerPos.toString(), 'inner:', innerPos.toString());
        this._touch = innerPos;
    };
    ScrollController.prototype.onTouchMove = function (containerX, containerY) {
        if (this._touch) {
            var outerPos = new Vec2_1.Vec2(containerX, containerY);
            var innerPos = this._innerFromContainer(outerPos);
            this._center = this._touch.sub(outerPos.sub(this._containerSize.div2()).hadamard(this._zoom.inv()));
        }
    };
    ScrollController.prototype.onTouchEnd = function (containerX, containerY) {
        if (this._touch) {
            console.log('onTouchEnd');
            this._touch = null;
        }
    };
    ScrollController.prototype.onZoomIn = function (dZoom, containerX, containerY) {
        this._zoom = this._zoom.hadamard({ x: 1.1, y: 1 });
    };
    ScrollController.prototype.onZoomOut = function (dZoom, containerX, containerY) {
        this._zoom = this._zoom.hadamard({ x: 1 / 1.1, y: 1 });
    };
    // private section
    ScrollController.prototype._updatePosition = function () {
        var ts = new Date().valueOf();
        var newPos = createPosition(this._center, this._zoom, this._containerSize);
        ;
        if (newPos.left !== this._pos.left || newPos.top !== this._pos.top) {
            this._pos = newPos;
        }
    };
    ScrollController.prototype._innerFromContainer = function (outerPos) {
        return outerPos.sub(this._containerSize.div2()).hadamard(this._zoom.inv()).add(this._center);
    };
    return ScrollController;
}());
exports.ScrollController = ScrollController;
//# sourceMappingURL=ScrollController.js.map