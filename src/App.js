import { Route, Routes } from "react-router-dom";
import DirView from "./scenes/DirView";
import TableView from "./scenes/TableView";

function App() {
  return (
    <div className="w-[100vw]">
      <Routes>
        <Route path="/dir_view" element={<DirView />} />
        <Route path="/table_view" element={<TableView />} />
      </Routes>
    </div>
  );
}

export default App;
