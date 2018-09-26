import { IScrollerOptions } from './IScrollerOptions';
import { IVec2, Vec2 } from './Vec2'



export interface IPosition {
  // public
  isMoving: boolean;
  zoomX: number;
  zoomY: number;
  width: number;
  height: number;
  left: number;
  top: number;
  // right: number;
  // bottom: number;
  // internal
  containerSize: IVec2;           // container size
  viewportSize: IVec2;            // viewport size
  zoom: IVec2;                    // zoom
  center: IVec2;                  // center
  lx: number;                     // left x
  ty: number;                     // top y
  rx: number;                     // right x
  by: number;                     // bottom y
}


function createPosition(center: Vec2, zoom: Vec2, containerSize: Vec2): IPosition {
  const viewportSize: Vec2 = containerSize.hadamard(zoom.inv());
  const lt: Vec2 = center.sub(viewportSize.div(2));
  const rb: Vec2 = lt.add(viewportSize);

  return Object.freeze({
    isMoving: false,
    zoomX: zoom.x,
    zoomY: zoom.y,
    width: viewportSize.x,
    height: viewportSize.y,
    left: lt.x,
    top: lt.y,
    // 
    containerSize, viewportSize, zoom, center, 
    lx: lt.x, 
    ty: lt.y,
    rx: rb.x,
    by: rb.y,
  });
}


export class ScrollController {
  private _containerSize: Vec2;
  private _innerSize: Vec2;
  private _center: Vec2;
  private _zoom: Vec2;
  private _v: Vec2;
  private _pos:  IPosition;
  private _lastTs: number;

  private _touch: Vec2 | null = null;

  public constructor(options: IScrollerOptions) {
    this._containerSize = new Vec2(options.containerWidth, options.containerHeight);
    this._innerSize = new Vec2((typeof options.contentWidth === 'number') ? options.contentWidth : this._containerSize.x,
                               (typeof options.contentHeight === 'number') ? options.contentHeight : this._containerSize.y)

    const lt = new Vec2((typeof options.initialX === 'number') ? options.initialX : 0, (typeof options.initialY === 'number') ? options.initialY : 0);
    this._center = lt.add(this._containerSize.div(2));

    this._zoom = new Vec2(1, 1);
    this._v = new Vec2(0, 0);

    this._pos = createPosition(this._center, this._zoom, this._containerSize);
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
    const outerPos = new Vec2(containerX, containerY);
    const innerPos = this._innerFromContainer(outerPos);
    console.log('onTouchStart outer:', outerPos.toString(), 'inner:', innerPos.toString());
    this._touch = innerPos;
  }

  public onTouchMove(containerX: number, containerY: number): void {
    if (this._touch) {
      const outerPos = new Vec2(containerX, containerY);
      const innerPos = this._innerFromContainer(outerPos);
      this._center = this._touch.sub(outerPos.sub(this._containerSize.div2()).hadamard(this._zoom.inv()))
    }
  }

  public onTouchEnd(containerX: number, containerY: number): void {
    if (this._touch) {
      console.log('onTouchEnd');
      this._touch = null;
    }    
  }

  public onZoomIn(dZoom: number, containerX: number, containerY: number): void {
    this._zoom = this._zoom.hadamard({x: 1.1, y:1});
  }

  public onZoomOut(dZoom: number, containerX: number, containerY: number): void {
    this._zoom = this._zoom.hadamard({x: 1/1.1, y:1});
  }
  // private section
  
  private _updatePosition() {
    const ts: number = new Date().valueOf();
    const newPos = createPosition(this._center, this._zoom, this._containerSize);;
    if (newPos.left !== this._pos.left || newPos.top !== this._pos.top) {
      this._pos = newPos;
    }
  }

  private _innerFromContainer(outerPos: Vec2): Vec2 {
    return outerPos.sub(this._containerSize.div2()).hadamard(this._zoom.inv()).add(this._center);
  }
}
