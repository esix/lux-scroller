
export interface IScrollerOptions {
  // sizes setup
  containerWidth: number;
  containerHeight: number;
  contentWidth?: number;
  contentHeight?: number;
  // initial state
  initialX?: number;
  initialY?: number;
  // behaviour setup
  horizontal?: boolean;
  vertical?: boolean;
}
