import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";

import MustardMatrix from "./Project";

function App() {
    return (
      <HashRouter>
      <div>
        <Routes>
          <Route path="/"         element={<Navigate to="/MustardMatrix/Home"/>}/>
          <Route path="/MustardMatrix/*"   element={<MustardMatrix/>}/>
        </Routes>
      </div>
    </HashRouter>
    );

};

export default App;