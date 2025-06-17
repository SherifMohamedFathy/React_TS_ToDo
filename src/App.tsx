import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import "react-confirm-alert/src/react-confirm-alert.css"; // required css

function App() {
  return (
    <div>
      <Home />
      <Toaster />
    </div>
  );
}

export default App;
