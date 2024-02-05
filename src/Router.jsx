import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom'
import CreatePaintingForm from './components/PaintingForm'
import PaintingsGrid from './components/PaintingsGrid/PaintingsGrid'
import Home from './pages/Home'
import Painting from './pages/Painting'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} element={<Home />} />
                <Route path={'/milo-painting/:title'} element={<Painting />} />
                <Route
                    path={'/painting-form'}
                    element={<CreatePaintingForm />}
                />
                <Route path={'/paintings-list'} element={<PaintingsGrid />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router
