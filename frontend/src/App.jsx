import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import "./App.css";
import ChartDisplay from "./components/ChartDisplay";
import DataList from "./components/DataList";

function App() {
  const [fileUploaded, setIsFileUploaded] = useState(false);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<div className="container">
          <FileUpload setIsFileUploaded={setIsFileUploaded} />
          <DataList fileUploaded={fileUploaded}/>
          </div>}
        />
        <Route path="/:id" element={<ChartDisplay fileUploaded />} />
      </Routes>
    </Router>
  );
}

export default App;
