import { canvasColor, canvasSize } from './constants';
import { MousePosition } from './interfaces';

export const setColor = (
  color: string,
  context: CanvasRenderingContext2D,
  fill: boolean
) => {
  if (fill) {
    context.fillStyle = color;
  } else {
    context.strokeStyle = color;
  }
};

export const setLineSize = (
  size: number,
  context: CanvasRenderingContext2D
) => {
  context.lineWidth = size;
};

export const clearBoardHandler = (context: CanvasRenderingContext2D) => {
  const boardSize = canvasSize;

  context.clearRect(0, 0, boardSize.width, boardSize.height);
};

export const drawDependOnBtn = (
  btn: string,
  lineSize: number,
  activeColor: string,
  context: CanvasRenderingContext2D,
  position: MousePosition,
  mouseDownPosition: MousePosition | null,
  mouseUpPosition: MousePosition | null
) => {
  const PI = Math.PI;
  const { x, y } = position;

  if (btn === 'pencil') {
    setColor(activeColor, context, true);
    context.fillRect(x, y, lineSize, lineSize);
  }

  if (btn === 'eraser') {
    setColor(canvasColor, context, true);
    setLineSize(lineSize, context);
    context.fillRect(x, y, lineSize, lineSize);
  }

  if (mouseDownPosition && mouseUpPosition) {
    const a = mouseDownPosition?.x;
    const b = mouseDownPosition?.y;
    const height = mouseUpPosition?.x - a;
    const width = mouseUpPosition?.y - b;
    const radius = (Math.abs(height) ** 2 + Math.abs(width) ** 2) ** (1 / 2);

    context.beginPath();
    setColor(activeColor, context, false);
    setLineSize(lineSize, context);
    context.lineCap = 'round';

    switch (btn) {
      case 'rect':
        context.rect(a, b, height, width);
        context.stroke();

        break;
      case 'circle':
        context.arc(a, b, radius, 0, 2 * PI, false);
        context.stroke();
        break;
      case 'line':
        if (mouseDownPosition) {
          context.moveTo(mouseDownPosition?.x, mouseDownPosition?.y);
        }

        if (mouseUpPosition) {
          context.lineTo(mouseUpPosition?.x, mouseUpPosition?.y);
          context.stroke();
        }
        break;
      case 'triangle':
        if (mouseDownPosition) {
          context.moveTo(mouseDownPosition?.x, mouseDownPosition?.y);
        }

        if (mouseUpPosition) {
          context.lineTo(mouseUpPosition?.x, mouseUpPosition?.y);
          context.lineTo(
            mouseDownPosition?.x * 2 - mouseUpPosition?.x,
            mouseUpPosition?.y
          );
          context.lineTo(mouseDownPosition?.x, mouseDownPosition?.y);
          context.stroke();
        }
        break;
      case 'pentagon':
        if (mouseDownPosition) {
          context.moveTo(mouseDownPosition?.x, mouseDownPosition?.y);
        }

        if (mouseUpPosition) {
          context.lineTo(
            2 * mouseUpPosition?.x - mouseDownPosition?.x,
            (2 * mouseDownPosition?.y + mouseUpPosition?.y) / 3
          );
          context.lineTo(mouseUpPosition?.x, mouseUpPosition?.y);
          context.lineTo(
            mouseDownPosition?.x * 2 - mouseUpPosition?.x,
            mouseUpPosition?.y
          );
          context.lineTo(
            -2 * mouseUpPosition?.x + 3 * mouseDownPosition?.x,
            (2 * mouseDownPosition?.y + mouseUpPosition?.y) / 3
          );
          context.lineTo(mouseDownPosition?.x, mouseDownPosition?.y);
          context.stroke();
        }
        break;
      case 'star':
        if (mouseDownPosition) {
          context.moveTo(mouseDownPosition?.x, mouseDownPosition?.y);
        }

        if (mouseUpPosition) {
          context.lineTo(
            (mouseUpPosition?.x + 2 * mouseDownPosition?.x) / 3,
            (2 * mouseDownPosition?.y + mouseUpPosition?.y) / 3
          );
          context.lineTo(
            2 * mouseUpPosition?.x - mouseDownPosition?.x,
            (2 * mouseDownPosition?.y + mouseUpPosition?.y) / 3
          );
          context.lineTo(
            (2 * mouseUpPosition?.x + mouseDownPosition?.x) / 3,
            (2 * mouseUpPosition?.y + mouseDownPosition?.y) / 3
          );
          context.lineTo(mouseUpPosition?.x, mouseUpPosition?.y);
          context.lineTo(
            mouseDownPosition?.x,
            (2 * mouseUpPosition?.y + mouseDownPosition?.y) / 3
          );
          context.lineTo(
            mouseDownPosition?.x * 2 - mouseUpPosition?.x,
            mouseUpPosition?.y
          );
          context.lineTo(
            (-2 * mouseUpPosition?.x + 5 * mouseDownPosition?.x) / 3,
            (2 * mouseUpPosition?.y + mouseDownPosition?.y) / 3
          );
          context.lineTo(
            -2 * mouseUpPosition?.x + 3 * mouseDownPosition?.x,
            (2 * mouseDownPosition?.y + mouseUpPosition?.y) / 3
          );
          context.lineTo(
            (4 * mouseDownPosition?.x - mouseUpPosition?.x) / 3,
            (2 * mouseDownPosition?.y + mouseUpPosition?.y) / 3
          );
          context.lineTo(mouseDownPosition?.x, mouseDownPosition?.y);
          context.stroke();
        }
        break;
      case 'circlePart':
        context.arc(a, b, radius, 0, PI, true);
        context.stroke();
        break;
      case 'save':
        break;
      default:
        break;
    }

    context.closePath();
  }
};
