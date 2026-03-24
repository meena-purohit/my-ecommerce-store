import { BrowserRouter, Link, Route, Routes } from "react-router";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Navbar from "./components/Navbar";

//Create a simple Cart component for now so the app doesn't crash
function Cart() {
  return <h2 className="p-10 text-2xl font-bold">Your Shoping Cart id here!</h2>;
}
function App() {
 
   

  return(
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route  path="/" element={<Home />}/>
          <Route path="/datails/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
   
  
    </div>
    
  );
}
export default App;

