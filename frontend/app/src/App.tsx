import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import ChatPage from "./views/ChatPage";

const App = () => {
    return (
        <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/chat"} element={<ChatPage />} />
        </Routes>
    );
};

export default App;
