import { IScrollerOptions } from './IScrollerOptions';


interface IVector {
  x: number;
  y: number;
}


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
    const {x, y} = this._innerFromContainer({x: containerX, y: containerY});
    console.log('onTouchStart ', containerX, containerY, 'inner ', x, y);
    this._isTouch = true;
    this._touchInnerX = x;
    this._touchInnerY = y;
  }

  public onTouchMove(containerX: number, containerY: number): void {
    if (this._isTouch) {
      this._x = this._touchInnerX - containerX;
      this._y = this._touchInnerY - containerY;
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
    const newPos = createPosition(this._x, this._y, this._containerWidth, this._contentHeight);
    if (newPos.left !== this._pos.left || newPos.top !== this._pos.top) {
      this._pos = newPos;
    }
  }

  private _innerFromContainer({x, y}: IVector): IVector {
    x = this._pos.left + x;
    y = this._pos.top + y;
    return {x, y};
  }
}
