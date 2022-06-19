import { ColorPicker, WidthPicker } from "../";
import { useStateContext } from "../../context/ContextProvider";
import {
    Row,
    Col,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import "./settings.css";
import { MEDIA_DATA } from "../../constants/imgs";
import { BACKGROUND_PATTERNS } from "../../assets/dummy";
import { useState } from "react";

const Settings = ({ isHome }) => {
    const { frameColor, setFrameWidth, setImgPlusWidth } = useStateContext();
    const [toggle, setToggle] = useState(false);
    const [texture, setTexture] = useState("Texturas");

    const changeBgPattern = (pattern = MEDIA_DATA.TRIANGLES_PATTERN) =>
        (document.body.style.backgroundImage = `url(${pattern})`);

    return (
        <>
            <div
                className="settings__container"
                style={{
                    border: `1px dashed ${frameColor}`
                }}
            >
                <Row xs="2">
                    <Col>
                        <ColorPicker />
                    </Col>
                    <Col>
                        <WidthPicker
                            setWidth={isHome ? setFrameWidth : setImgPlusWidth}
                            label={isHome ? "Ancho" : "Tamaño"}
                        />
                    </Col>
                    <Col className="mt-2">
                        <Dropdown
                            toggle={() => setToggle(!toggle)}
                            isOpen={toggle}
                        >
                            <DropdownToggle className="bg-secondary" caret>
                                {texture}
                            </DropdownToggle>
                            <DropdownMenu>
                                {BACKGROUND_PATTERNS.map(
                                    ({ key, pattern, name }) => (
                                        <DropdownItem
                                            key={key}
                                            onClick={() => {
                                                changeBgPattern(pattern);
                                                setTexture(name);
                                            }}
                                        >
                                            {name}
                                        </DropdownItem>
                                    )
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Settings;
