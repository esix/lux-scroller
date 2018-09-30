import { IScrollerOptions } from './IScrollerOptions';
import { IVec2 } from './Vec2';
export interface IPosition {
    isMoving: boolean;
    zoomX: number;
    zoomY: number;
    width: number;
    height: number;
    left: number;
    top: number;
    containerSize: IVec2;
    viewportSize: IVec2;
    zoom: IVec2;
    center: IVec2;
    lx: number;
    ty: number;
    rx: number;
    by: number;
}
export declare class ScrollController {
    private _containerSize;
    private _innerSize;
    private _center;
    private _zoom;
    private _v;
    private _pos;
    private _lastTs;
    private _touch;
    constructor(options: IScrollerOptions);
    getPosition(): IPosition;
    setContainerSize(width: number, height: number): void;
    setContentSize(width: number, height: number): void;
    onTouchStart(containerX: number, containerY: number): void;
    onTouchMove(containerX: number, containerY: number): void;
    onTouchEnd(containerX: number, containerY: number): void;
    onZoomIn(dZoom: number, containerX: number, containerY: number): void;
    onZoomOut(dZoom: number, containerX: number, containerY: number): void;
    private _updatePosition;
    private _innerFromContainer;
}
