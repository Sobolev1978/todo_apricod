import React, {FC} from 'react';
import Button from "../Button";
import style from './ButtonPanel.module.scss';
import mobx from '../../store/todo'

const ButtonPanel: FC = () => {
  return (
    <div className={style.panelBlock}>
      <Button className={mobx.filterMobx === 'all' ? style.active : ''}
              onClick={() => mobx.changeFilter('all')}>All</Button>
      <Button className={mobx.filterMobx === 'undone' ? style.active : ''}
              onClick={() => mobx.changeFilter('undone')}>Active</Button>
      <Button className={mobx.filterMobx === 'done' ? style.active : ''}
              onClick={() => mobx.changeFilter('done')}>Completed</Button>
    </div>
  );
};

export default ButtonPanel;