import { IScrollerOptions } from './IScrollerOptions';
export interface IPosition {
    isMoving: boolean;
    left: number;
    top: number;
}
export declare class ScrollController {
    private _containerWidth;
    private _containerHeight;
    private _contentWidth;
    private _contentHeight;
    private _x;
    private _y;
    private _vx;
    private _vy;
    private _pos;
    private _lastTs;
    private _touchInnerX;
    private _touchInnerY;
    private _isTouch;
    constructor(options: IScrollerOptions);
    getPosition(): IPosition;
    setContainerSize(width: number, height: number): void;
    setContentSize(width: number, height: number): void;
    onTouchStart(containerX: number, containerY: number): void;
    onTouchMove(containerX: number, containerY: number): void;
    onTouchEnd(containerX: number, containerY: number): void;
    private _updatePosition();
    private _innerFromContainer({x, y});
}
