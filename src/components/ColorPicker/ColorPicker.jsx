import { FormGroup, Input, Label } from "reactstrap";
import { useStateContext } from "../../context/ContextProvider";
import "./color-picker.css";

const ColorPicker = () => {
    const { frameColor, setFrameColor } = useStateContext();
    return (
        <FormGroup>
            <Label for="exampleRange">Color</Label>
            <Input
                className="color-picker__input"
                id="colorPicker"
                name="color"
                placeholder={frameColor}
                type="color"
                value={frameColor}
                onChange={e => setFrameColor(e.target.value)}
            />
        </FormGroup>
    );
};

export default ColorPicker;
