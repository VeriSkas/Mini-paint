import { useEffect, useState } from 'react';

import { DrawBoard } from '../../components/DrawBoard/DrawBoard';
import { EditorTools } from '../../components/EditorTools/EditorTools';
import { clearBoardHandler, drawDependOnBtn } from '../../editorFunctions';
import { MousePosition } from '../../shared/interfaces';
import { TitleText } from '../../shared/text/text';
import classes from './Editor.module.scss';

export const Editor = () => {
  const [activeTool, setActiveTool] = useState('pencil');
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(
    null
  );
  const [mouseUpPosition, setMouseUpPosition] = useState<MousePosition | null>(
    null
  );
  const [mouseDownPosition, setMouseDownPosition] =
    useState<MousePosition | null>(null);
  const [lineSize, setLineSize] = useState(2);
  const [activeColor, setActiveColor] = useState('black');

  useEffect(() => {
    if (mousePosition && canvasContext) {
      drawDependOnBtn(
        activeTool,
        lineSize,
        activeColor,
        canvasContext,
        mousePosition,
        mouseDownPosition,
        mouseUpPosition
      );
    }
  }, [
    activeTool,
    lineSize,
    canvasContext,
    mousePosition,
    mouseDownPosition,
    mouseUpPosition,
    activeColor,
  ]);

  useEffect(() => {
    if (mouseUpPosition) {
      clearMousePositions();
    }
  }, [mouseUpPosition]);

  const clearMousePositions = () => {
    setMousePosition(null);
    setMouseDownPosition(null);
    setMouseUpPosition(null);
  };

  const draw = (
    context: CanvasRenderingContext2D,
    position: MousePosition | null
  ) => {
    if (context && position) {
      setCanvasContext(context);
      setMousePosition((prevState) => ({ ...prevState, ...position }));
    }
  };

  const mouseDown = (downPosition: MousePosition | null) => {
    if (downPosition) {
      setMouseDownPosition((prevState) => ({ ...prevState, ...downPosition }));
      setMouseUpPosition(null);
    }
  };

  const mouseUp = (upPosition: MousePosition | null) => {
    if (upPosition) {
      setMouseUpPosition((prevState) => ({ ...prevState, ...upPosition }));
    }
  };

  const setActiveToolBtn = (btn: string) => {
    if (btn === 'bin' && canvasContext) {
      setMousePosition(null);
      clearBoardHandler(canvasContext);
      return;
    }

    setActiveTool(btn);
  };

  const changeColor = (color: string) => {
    setActiveColor(color);
  };

  const lineChange = (size: string) => {
    const numberSize = parseInt(size);

    setLineSize(numberSize);
  };

  return (
    <>
      <h1 className={classes.Title}>{TitleText.editor}</h1>
      <div className={classes.EditorBody}>
        <EditorTools
          onClick={(btn: string) => setActiveToolBtn(btn)}
          changeColor={changeColor}
          lineChange={lineChange}
        />
        <DrawBoard draw={draw} mouseUp={mouseUp} mouseDown={mouseDown} />
      </div>
    </>
  );
};
