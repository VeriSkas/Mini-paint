import { useEffect, useState } from 'react';

import { createImage } from '../../api/apiHandlers/dataBaseHandler';
import { DrawBoard } from '../../components/DrawBoard/DrawBoard';
import { EditorTools } from '../../components/EditorTools/EditorTools';
import { Notification } from '../../components/UI/Notification/Notification';
import {
  clearBoardHandler,
  drawDependOnBtn,
} from '../../shared/editorFunctions';
import {
  ImageInDB,
  MousePosition,
  NotificationType,
} from '../../shared/interfaces';
import { localStorageHandler } from '../../shared/localStorage';
import {
  ErrorMessages,
  NotificationTypeString,
  SuccessMessages,
  TitleText,
} from '../../shared/text/text';
import classes from './Editor.module.scss';

export const Editor = () => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<string>('');
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(
    null
  );
  const [mouseUpPosition, setMouseUpPosition] = useState<MousePosition | null>(
    null
  );
  const [mouseDownPosition, setMouseDownPosition] =
    useState<MousePosition | null>(null);
  const [activeTool, setActiveTool] = useState('pencil');
  const [lineSize, setLineSize] = useState(2);
  const [activeColor, setActiveColor] = useState('black');

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(() => null);
      }, 5000);
    }
  }, [notification]);

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

  const takeCanvasData = (event: HTMLCanvasElement) => {
    setCanvas(event);
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

    if (btn === 'save') {
      saveImg();
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

  const saveImg = () => {
    const userUID = localStorageHandler('getItem', 'uid');

    if (canvas && userUID) {
      const imageNew = canvas.toDataURL();
      const imageData: ImageInDB = {
        image: imageNew,
        userUID,
      };
      const errorNotification: NotificationType = {
        type: NotificationTypeString.error,
        text: ErrorMessages.samePicture,
      };
      const successNotification: NotificationType = {
        type: NotificationTypeString.success,
        text: SuccessMessages.savePicture,
      };

      if (imageNew !== image) {
        setImage(imageNew);
        createImage(imageData)
          .then(() => {
            setNotification(() => ({ ...successNotification }));
          })
          .catch((error) => {
            setNotification(() => ({ ...errorNotification, error }));
          });

        return;
      }

      setNotification(() => ({ ...errorNotification }));
    }
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
        <DrawBoard
          takeCanvasData={takeCanvasData}
          draw={draw}
          mouseUp={mouseUp}
          mouseDown={mouseDown}
        />
      </div>
      {notification ? <Notification {...notification} /> : null}
    </>
  );
};
