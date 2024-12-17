import { DashBoard } from "./pages"
import {Routes, Route} from "react-router-dom"

const App = () => (
    <div>
        <Routes>
            <Route path="/" element={<DashBoard forceFilter={{}}/>}/>
            <Route path="/products-hors-stock" element={<DashBoard forceFilter={{"quantity" : 0}}/>}/>
        </Routes>
    </div>
)


export default App