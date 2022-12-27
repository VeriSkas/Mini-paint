import { DrawBoard } from '../../components/DrawBoard/DrawBoard';
import { EditorTools } from '../../components/EditorTools/EditorTools';
import { MousePosition } from '../../shared/interfaces';
import { TitleText } from '../../shared/text/text';
import classes from './Editor.module.scss';

export const Editor = () => {
  const draw = (
    context: CanvasRenderingContext2D,
    position: MousePosition | null
  ) => {
    if (position && context) {
      const { x, y } = position;

      context.fillRect(x - 5, y - 5, 10, 10);
    }
  };

  return (
    <>
      <h1 className={classes.Title}>{TitleText.editor}</h1>
      <div className={classes.EditorBody}>
        <EditorTools />
        <DrawBoard draw={draw} />
      </div>
    </>
  );
};

export const drawDependOnBtn = (btn: any) => {
  switch (btn) {
    case 'pencil':
      break;
    case 'rect':
      break;
    case 'circle':
      break;
    case 'line':
      break;
    case 'circlePart':
      break;
    case 'eraser':
      break;
    case 'bin':
      break;
    case 'save':
      break;

    default:
      break;
  }
};
