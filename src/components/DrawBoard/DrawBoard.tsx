import React, { FC, useEffect, useRef, useState } from 'react';

import { canvasSize } from '@constants/constants';
import classes from './DrawBoard.module.scss';
import { DrawBoardProps, MousePosition } from '@interfaces/interfaces';

export const DrawBoard: FC<DrawBoardProps> = ({
  mouseUp,
  mouseDown,
  draw,
  takeCanvasData,
}) => {
  const [mouseDownPosition, setMouseDownPosition] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(
    null
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas == null) return;

    setContext(canvas.getContext('2d'));

    if (context == null) return;

    takeCanvasData(canvas);
  }, [context, takeCanvasData]);

  useEffect(() => {
    if (context && mousePosition) {
      draw(context, mousePosition);
    }
  }, [context, mousePosition]);

  const onMouseMove = (event: React.MouseEvent) => {
    if (mouseDownPosition) {
      const newPosition = {
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      };

      setMousePosition((prevState) => ({ ...prevState, ...newPosition }));
    }
  };

  const onMouseDown = (event: React.MouseEvent) => {
    const mouseDownPosition = {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };

    mouseDown(mouseDownPosition);
    setMouseDownPosition(true);
  };

  const onMouseUp = (event: React.MouseEvent) => {
    const mouseUpPosition = {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };

    mouseUp(mouseUpPosition);
    setMouseDownPosition(false);
    setMousePosition(null);
  };

  return (
    <div className={classes.DrawBoard}>
      <canvas
        width={canvasSize.width}
        height={canvasSize.height}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
    </div>
  );
};
