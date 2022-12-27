import React, { useEffect, useRef, useState } from 'react';
import { MousePosition } from '../../shared/interfaces';

import classes from './DrawBoard.module.scss';

export const DrawBoard = (props: any) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(
    null
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = props.draw;
  let context;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas == null) return;

    context = canvas.getContext('2d');

    if (context == null) return;

    draw(context, mousePosition);
  }, [draw, mousePosition]);

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
    setMouseDown(true);
  };

  const onMouseUp = (event: React.MouseEvent) => {
    setMouseDown(false);
    setMousePosition(null);
  };

  return (
    <div className={classes.DrawBoard}>
      <canvas
        width={500}
        height={600}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
    </div>
  );
};
