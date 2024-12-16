import { DashBoard } from "./pages"
import {Routes, Route} from "react-router-dom"

const App = () => (
    <div>
        <Routes>
            <Route path="/home" element={<DashBoard/>}/>
        </Routes>
    </div>
)


export default App