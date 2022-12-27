import { Tools } from '../../shared/interfaces';
import { tools } from '../../shared/tools';
import { EditorToolsBtn } from '../EditorToolsBtn/EditorToolsBtn';
import classes from './EditorTools.module.scss';

export const EditorTools = () => {
  const toolsParams: Tools = tools;

  const renderTools = () => {
    return Object.keys(toolsParams as Tools).map((key: string) => {
      return <EditorToolsBtn key={key} img={toolsParams[key].path} />
    })
  }

  return (
    <div className={classes.EditorTools}>
      {renderTools()}
    </div>
  );
};
