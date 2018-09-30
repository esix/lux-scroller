export interface IVec2 {
  x: number;
  y: number;
}

export class Vec2 implements IVec2 {
  constructor(public x: number, public y: number) {
    //
  }

  public eq(v: IVec2): boolean {
    return (this.x === v.x) && (this.y === v.y);
  }

  public neg(): Vec2 {
    return new Vec2(-this.x, -this.y);
  }

  public add(v: IVec2): Vec2 {
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  public sub(v: IVec2): Vec2 {
    return new Vec2(this.x - v.x, this.y - v.y);
  }
  
  public inv(): Vec2 {
    return new Vec2(1 / this.x, 1 / this.y);
  }

  public mul(n: number): Vec2 {
    return new Vec2(this.x * n, this.y * n);
  }

  public div(n: number): Vec2 {
    return new Vec2(this.x / n, this.y / n);
  }

  public div2(): Vec2 {
    return new Vec2(this.x / 2, this.y / 2);
  }

  public dot(v: IVec2): number {
    return this.x * v.x + this.y * v.y;
  }

  public hadamard(v: IVec2): Vec2 {
    return new Vec2(this.x * v.x, this.y * v.y);
  }

  public len(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public unit(): Vec2 {
    return this.div(this.len());
  }

  public a(): number {
    return Math.atan2(this.y, this.x);
  }

  public clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  // static

  public static eq(v1: IVec2, v2: IVec2): boolean {
    return (v1.x === v2.x) && (v1.y === v2.y);
  }

  public static neg(v: IVec2): Vec2 {
    return new Vec2(-v.x, -v.y);
  }

  public static add(v1: IVec2, v2: IVec2): Vec2 {
    return new Vec2(v1.x + v2.x, v1.y + v2.y);
  }

  public static sub(v1: IVec2, v2: IVec2): Vec2 {
    return new Vec2(v1.x - v2.x, v1.y - v2.y);
  }

  public static inv(v: IVec2): Vec2 {
    return new Vec2(1 / v.x, 1 / v.y);
  }

  public static mul(v: IVec2, n: number): Vec2 {
    return new Vec2(v.x * n, v.y * n);
  }

  public static div(v: IVec2, n: number): Vec2 {
    return new Vec2(v.x / n, v.y / n);
  }

  public static div2(v: IVec2): Vec2 {
    return new Vec2(v.x / 2, v.y / 2);
  }

  public static dot(v1: IVec2, v2: IVec2): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  public static hadamard(v1: IVec2, v2: IVec2): Vec2 {
    return new Vec2(v1.x * v2.x, v1.y * v2.y);
  }

  public static len(v: IVec2): number {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  public static unit(v: IVec2): Vec2 {
    return Vec2.div(v, Vec2.len(v));
  }

  public static a(v: IVec2): number {
    return Math.atan2(v.y, v.x);
  }

  public static clone(v: IVec2): Vec2 {
    return new Vec2(v.x, v.y);
  }

  public static make(x: number, y: number): Vec2 {
    return new Vec2(x, y);
  }
}
