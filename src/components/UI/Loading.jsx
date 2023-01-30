import style from "../../styles/Loading.css";
import { useAppContext } from "../../context/AppContext";
import { Ripples } from "@uiball/loaders";

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
          <Ripples size={200} color="#39c9b5" />
        </div>
      </div>
    </div>
  );
};
