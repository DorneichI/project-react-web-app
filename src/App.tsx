import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";

import MovieMatrix from "./project/MovieMatrix";

function App() {
    return (
      <HashRouter>
      <div>
        <Routes>
          <Route path="/"         element={<Navigate to="/MovieMatrix/Home"/>}/>
          <Route path="/MovieMatrix/*"   element={<MovieMatrix/>}/>
        </Routes>
      </div>
    </HashRouter>
    );

};

export default App;