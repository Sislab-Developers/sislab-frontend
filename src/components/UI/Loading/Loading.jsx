import './Loading.scss';
import { useAppContext } from '../../../context/AppContext.jsx';
import { Jelly } from '@uiball/loaders';

export const Loading = () => {
  const {
    state: { loading },
  } = useAppContext();

  if (!loading) {
    return null;
  }

  return (
    <div className="backdrop">
      <div className="wrap">
        <div className="ring">
          <Jelly size={200} speed={0.5} color="#39c9b5" />
        </div>
      </div>
    </div>
  );
};
