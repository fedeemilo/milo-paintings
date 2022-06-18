import { FormGroup, Input, Label } from "reactstrap";

const WidthPicker = ({ setWidth, label }) => {
    return (
        <FormGroup>
            <Label for="exampleRange">{label}</Label>
            <Input
                id="exampleRange"
                name="range"
                type="range"
                onChange={e => setWidth(e.target.value)}
            />
        </FormGroup>
    );
};

export default WidthPicker;
