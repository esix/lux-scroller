"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Vec2 = Vec2;
//# sourceMappingURL=Vec2.js.map