import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import CreatePaintingForm from "./components/PaintingForm/PaintingForm";
import Home from "./pages/Home/Home";
import Painting from "./pages/Painting/Painting";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} element={<Home />} />
                <Route path={"/milo-painting/:title"} element={<Painting />} />
                <Route
                    path={"/painting-form"}
                    element={<CreatePaintingForm />}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
