import { BrowserRouter, Link, Route, Routes } from "react-router";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";

function App() {
 
  
  return(
    <div>
      <h1 className="text-4xl font-extrabold text-blue-600">
   My E-Commerce Store App</h1>
  <Home />
    </div>
    
  )
}
export default App;