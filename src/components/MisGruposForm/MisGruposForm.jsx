import './MisGruposForm.scss';
import { GroupItem } from '../GroupItem';

export const MisGruposForm = () => {
  return (
    <>
      <div className="title">
        <h1>Mis grupos</h1>
        <h1>Semestre 2023-1</h1>
      </div>
      <div className="subtitle">
        <h1>
          Llena este formulario para crear tu primer{' '}
          <span className="color_en_texto">grupo</span>
        </h1>
      </div>

      <div className="contentWrapper">
        <GroupItem />
      </div>
    </>
  );
};
