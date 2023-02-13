import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DrawBoard } from '@components/DrawBoard/DrawBoard';
import { EditorTools } from '@components/EditorTools/EditorTools';
import { Notification } from '@components/UI/Notification/Notification';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { clearBoardHandler, drawDependOnBtn } from '@utils/editorFunctions';
import {
  ImageInDB,
  MousePosition,
  NotificationType,
} from '@interfaces/interfaces';
import { localStorageHandler } from '@utils/localStorage';
import {
  ErrorMessages,
  errorNotification,
  successNotification,
  TitleText,
} from '@constants/text/text';
import { setActiveToolAction } from '@store/editorSlice';
import { addImage } from '@store/imageSlice';
import classes from './Editor.module.scss';
import { tools } from '@constants/tools';

export const Editor = () => {
  const { t } = useTranslation();
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

  const dispatch = useAppDispatch();
  const activeColor = useAppSelector((state) => state.editor.activeColor);
  const lineSize = useAppSelector((state) => state.editor.lineSize);
  const activeTool = useAppSelector((state) => state.editor.activeTool);

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
  }, [canvasContext, mousePosition, mouseDownPosition, mouseUpPosition]);

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
    if (btn === tools.bin.value && canvasContext) {
      setMousePosition(null);
      clearBoardHandler(canvasContext);
      return;
    }

    if (btn === tools.save.value) {
      saveImg();
      return;
    }

    if (btn === tools.bin.value) {
      return;
    }

    dispatch(setActiveToolAction(btn));
  };

  const saveImg = () => {
    const userUID = localStorageHandler('getItem', 'uid');

    if (canvas && userUID) {
      const imageNew = canvas.toDataURL();
      const imageData: ImageInDB = {
        image: imageNew,
        userUID,
      };
      const error = errorNotification;
      const success = successNotification;

      if (!canvasContext?.getImageData) {
        error.text = ErrorMessages.cleanBlank;
        setNotification(() => ({ ...error }));

        return;
      }

      if (imageNew === image) {
        setNotification(() => ({ ...error }));

        return;
      }

      setImage(imageNew);
      dispatch(addImage(imageData));
      setNotification(() => ({ ...success }));
    }
  };

  return (
    <>
      <h1 className={classes.Title}>{t(TitleText.editor)}</h1>
      <div className={classes.EditorBody}>
        <EditorTools onClick={(btn: string) => setActiveToolBtn(btn)} />
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
