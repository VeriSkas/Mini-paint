import React, { useState } from 'react';

import { linesWidth } from '../../shared/constants';
import { Tools } from '../../shared/interfaces';
import { InputLabels } from '../../shared/text/text';
import { tools } from '../../shared/tools';
import { EditorToolsBtn } from '../EditorToolsBtn/EditorToolsBtn';
import { Select } from '../UI/Select/Select';
import classes from './EditorTools.module.scss';

export const EditorTools = (props: any) => {
  const toolsParams: Tools = tools;
  const [lines, setLines] = useState(linesWidth);
  const [activeLine, setActiveLine] = useState(linesWidth[1].value);

  const changeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.changeColor(event.target.value);
  }

  const lineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveLine(event.target.value);
    props.lineChange(event.target.value);
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
          type='little'
          labelText={InputLabels.selectLine}
          options={lines.length ? lines : []}/>
    </div>
  );
};
