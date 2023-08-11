import { Route, Routes } from "react-router-dom";
import { DirView, FileView, TableView } from "./scenes";

function App() {
  return (
    <div className="w-[100vw]">
      <Routes>
        <Route path="/dir_view" element={<DirView />} />
        <Route path="/table_view" element={<TableView />} />
        <Route path="/file_view" element={<FileView />} />
      </Routes>
    </div>
  );
}

export default App;
