import { FormGroup, Input, Label } from "reactstrap";
import { useStateContext } from "../../context/ContextProvider";

const FramePicker = () => {
    const { setFrameWidth } = useStateContext();

    return (
        <FormGroup>
            <Label for="exampleRange">Ancho</Label>
            <Input
                id="exampleRange"
                name="range"
                type="range"
                onChange={e => setFrameWidth(e.target.value)}
            />
        </FormGroup>
    );
};

export default FramePicker;
