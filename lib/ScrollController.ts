import { IScrollerOptions } from './IScrollerOptions';


export interface IPosition {
  isMoving: boolean;
  left: number;
  top: number;
}


function createPosition(contentLeft: number, contentTop: number, containerWidth: number, containerHeight: number) {
  return Object.freeze({
    isMoving: false,
    left: contentLeft,
    top: contentTop,
    width: containerWidth,
    height: containerHeight,
  });
}


export class ScrollController {
  private _containerWidth: number;
  private _containerHeight: number;
  private _contentWidth: number;
  private _contentHeight: number;
  private _x: number;
  private _y: number;
  private _vx: number;
  private _vy: number;
  private _pos:  IPosition;
  private _lastTs: number;

  private _touchX: number = 0;
  private _touchY: number = 0;
  private _touchInnerX: number = 0;
  private _touchInnerY: number = 0;
  private _isTouch: boolean = false;

  public constructor(options: IScrollerOptions) {
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

  public getPosition(): IPosition {
    this._updatePosition();
    return this._pos;
  }

  public setContainerSize(width: number, height: number): void {
    //
  }

  public setContentSize(width: number, height: number): void {
    //
  }

  public onTouchStart(containerX: number, containerY: number): void {
    console.log('onTouchStart');
    this._isTouch = true;
    this._touchX = containerX;
    this._touchY = containerX;
    this._touchInnerX = this._pos.left + containerX;
    this._touchInnerY = this._pos.top + containerY;
  }

  public onTouchMove(containerX: number, containerY: number): void {
    if (this._isTouch) {
      const dx = containerX - this._touchX;
      const dy = containerY - this._touchY;
      this._x = this._touchInnerX - dx;
      this._y = this._touchInnerY - dy;
    }
  }

  public onTouchEnd(containerX: number, containerY: number): void {
    if (this._isTouch) {
      console.log('onTouchEnd');
      this._isTouch = false;
    }    
  }

  // private section
  
  private _updatePosition() {
    const ts: number = new Date().valueOf();
    this._pos = createPosition(this._x, this._y, this._containerWidth, this._contentHeight);
  }
}
