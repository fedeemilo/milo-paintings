import { useMemo } from "react";
import Router from "./Router";

const App = () => {
    return (
        <>
            <div className="container">
                {useMemo(() => {
                    return <Router />;
                }, [])}
            </div>
        </>
    );
};

export default App;
