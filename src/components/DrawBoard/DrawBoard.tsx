import React, { useEffect, useRef, useState } from 'react';

import { canvasSize } from '../../shared/constants';
import { MousePosition } from '../../shared/interfaces';

import classes from './DrawBoard.module.scss';

export const DrawBoard = (props: any) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(
    null
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const draw = props.draw;
  const mouseDownProp = props.mouseDown;
  const mouseUpProp = props.mouseUp;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas == null) return;

    setContext(canvas.getContext('2d'));

    if (context == null) return;
  }, [context]);

  useEffect(() => {
    if (context && mousePosition) {
      draw(context, mousePosition);
    }
  }, [context, mousePosition]);

  const onMouseMove = (event: React.MouseEvent) => {
    if (mouseDown) {
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

    mouseDownProp(mouseDownPosition);
    setMouseDown(true);
  };

  const onMouseUp = (event: React.MouseEvent) => {
    const mouseUpPosition = {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };

    mouseUpProp(mouseUpPosition);
    setMouseDown(false);
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
