import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import { MachineL, Example1, Example2, Example3 } from "./pages/MachineL";
import NewCertificate from "./pages/NewCertificate";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/start" exact element={<Start />} />
        <Route path="/machineLearning/" exact element={<MachineL />} />
        <Route path="/machineLearning/example1" exact element={<Example1 />} />
        <Route path="/machineLearning/example2" exact element={<Example2 />} />
        <Route path="/machineLearning/example3" exact element={<Example3 />} />
        <Route path="/new-certificate" exact element={<NewCertificate />} />
        <Route
          path="/new-certificate-edit/:id"
          exact
          element={<NewCertificate />}
        />
      </Routes>
    </Router>
  );
}

export default App;
