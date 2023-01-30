import React, { useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { linesWidth } from '../../constants/constants';
import { Tools } from '../../interfaces/interfaces';
import { InputLabels } from '../../constants/text/text';
import { tools } from '../../constants/tools';
import { changeColorAction, changeLineSizeAction } from '../../store/EditorSlice';
import { EditorToolsBtn } from '../EditorToolsBtn/EditorToolsBtn';
import { Select } from '../UI/Select/Select';
import classes from './EditorTools.module.scss';

export const EditorTools = (props: {onClick: (btn: string) => void}) => {
  const toolsParams: Tools = tools;
  const lines = linesWidth;
  const dispatch = useAppDispatch();
  const [activeLine, setActiveLine] = useState(lines[1].value);

  const changeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeColorAction(event.target.value));
  }

  const lineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const numberSize = parseInt(event.target.value);

    setActiveLine(event.target.value);
    dispatch(changeLineSizeAction(numberSize));
  }

  const renderTools = () => {
    return Object.keys(toolsParams as Tools).map((key: string) => {
      return <EditorToolsBtn
        key={key}
        img={toolsParams[key].path}
        value={toolsParams[key].value}
        onClick={(btn: string) => props.onClick(btn)}
      />
    })
  }

  return (
    <div className={classes.EditorTools}>
      {renderTools()}
      <div className={classes.ColorInput}>
        <input type={'color'} onChange={changeColor}/>

      </div>
      <Select
          onChange={lineChange}
          value={activeLine}
          type="little"
          labelText={InputLabels.selectLine}
          options={lines.length ? lines : []}/>
    </div>
  );
};
