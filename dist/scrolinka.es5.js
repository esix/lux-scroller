var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
        //
    }
    Vec2.prototype.eq = function (v) {
        return (this.x === v.x) && (this.y === v.y);
    };
    Vec2.prototype.neg = function () {
        return new Vec2(-this.x, -this.y);
    };
    Vec2.prototype.add = function (v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    };
    Vec2.prototype.sub = function (v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    };
    Vec2.prototype.inv = function () {
        return new Vec2(1 / this.x, 1 / this.y);
    };
    Vec2.prototype.mul = function (n) {
        return new Vec2(this.x * n, this.y * n);
    };
    Vec2.prototype.div = function (n) {
        return new Vec2(this.x / n, this.y / n);
    };
    Vec2.prototype.div2 = function () {
        return new Vec2(this.x / 2, this.y / 2);
    };
    Vec2.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    Vec2.prototype.hadamard = function (v) {
        return new Vec2(this.x * v.x, this.y * v.y);
    };
    Vec2.prototype.len = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vec2.prototype.unit = function () {
        return this.div(this.len());
    };
    Vec2.prototype.a = function () {
        return Math.atan2(this.y, this.x);
    };
    Vec2.prototype.clone = function () {
        return new Vec2(this.x, this.y);
    };
    Vec2.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    // static
    Vec2.eq = function (v1, v2) {
        return (v1.x === v2.x) && (v1.y === v2.y);
    };
    Vec2.neg = function (v) {
        return new Vec2(-v.x, -v.y);
    };
    Vec2.add = function (v1, v2) {
        return new Vec2(v1.x + v2.x, v1.y + v2.y);
    };
    Vec2.sub = function (v1, v2) {
        return new Vec2(v1.x - v2.x, v1.y - v2.y);
    };
    Vec2.inv = function (v) {
        return new Vec2(1 / v.x, 1 / v.y);
    };
    Vec2.mul = function (v, n) {
        return new Vec2(v.x * n, v.y * n);
    };
    Vec2.div = function (v, n) {
        return new Vec2(v.x / n, v.y / n);
    };
    Vec2.div2 = function (v) {
        return new Vec2(v.x / 2, v.y / 2);
    };
    Vec2.dot = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    };
    Vec2.hadamard = function (v1, v2) {
        return new Vec2(v1.x * v2.x, v1.y * v2.y);
    };
    Vec2.len = function (v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };
    Vec2.unit = function (v) {
        return Vec2.div(v, Vec2.len(v));
    };
    Vec2.a = function (v) {
        return Math.atan2(v.y, v.x);
    };
    Vec2.clone = function (v) {
        return new Vec2(v.x, v.y);
    };
    Vec2.make = function (x, y) {
        return new Vec2(x, y);
    };
    return Vec2;
}());

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
        this._containerSize = new Vec2(options.containerWidth, options.containerHeight);
        this._innerSize = new Vec2((typeof options.contentWidth === 'number') ? options.contentWidth : this._containerSize.x, (typeof options.contentHeight === 'number') ? options.contentHeight : this._containerSize.y);
        var lt = new Vec2((typeof options.initialX === 'number') ? options.initialX : 0, (typeof options.initialY === 'number') ? options.initialY : 0);
        this._center = lt.add(this._containerSize.div(2));
        this._zoom = new Vec2(1, 1);
        this._v = new Vec2(0, 0);
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
        var outerPos = new Vec2(containerX, containerY);
        var innerPos = this._innerFromContainer(outerPos);
        console.log('onTouchStart outer:', outerPos.toString(), 'inner:', innerPos.toString());
        this._touch = innerPos;
    };
    ScrollController.prototype.onTouchMove = function (containerX, containerY) {
        if (this._touch) {
            var outerPos = new Vec2(containerX, containerY);
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
        if (newPos.left !== this._pos.left || newPos.top !== this._pos.top) {
            this._pos = newPos;
        }
    };
    ScrollController.prototype._innerFromContainer = function (outerPos) {
        return outerPos.sub(this._containerSize.div2()).hadamard(this._zoom.inv()).add(this._center);
    };
    return ScrollController;
}());

export { ScrollController };
//# sourceMappingURL=scrolinka.es5.js.map
