import { ColorPicker, WidthPicker } from "../";
import { useStateContext } from "../../context/ContextProvider";
import "./settings.css";

const Settings = ({ isHome }) => {
    const { frameColor, setFrameWidth, setImgPlusWidth, imgPlusWidth } =
        useStateContext();

    return (
        <div
            className="settings__container"
            style={{
                border: `1px dashed ${frameColor}`
            }}
        >
            <ColorPicker />
            <WidthPicker
                setWidth={isHome ? setFrameWidth : setImgPlusWidth}
                label={isHome ? "Ancho" : "Tamaño"}
            />
        </div>
    );
};

export default Settings;
