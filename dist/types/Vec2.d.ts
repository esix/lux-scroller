export interface IVec2 {
    x: number;
    y: number;
}
export declare class Vec2 implements IVec2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    eq(v: IVec2): boolean;
    neg(): Vec2;
    add(v: IVec2): Vec2;
    sub(v: IVec2): Vec2;
    inv(): Vec2;
    mul(n: number): Vec2;
    div(n: number): Vec2;
    div2(): Vec2;
    dot(v: IVec2): number;
    hadamard(v: IVec2): Vec2;
    len(): number;
    unit(): Vec2;
    a(): number;
    clone(): Vec2;
    toString(): string;
    static eq(v1: IVec2, v2: IVec2): boolean;
    static neg(v: IVec2): Vec2;
    static add(v1: IVec2, v2: IVec2): Vec2;
    static sub(v1: IVec2, v2: IVec2): Vec2;
    static inv(v: IVec2): Vec2;
    static mul(v: IVec2, n: number): Vec2;
    static div(v: IVec2, n: number): Vec2;
    static div2(v: IVec2): Vec2;
    static dot(v1: IVec2, v2: IVec2): number;
    static hadamard(v1: IVec2, v2: IVec2): Vec2;
    static len(v: IVec2): number;
    static unit(v: IVec2): Vec2;
    static a(v: IVec2): number;
    static clone(v: IVec2): Vec2;
    static make(x: number, y: number): Vec2;
}
