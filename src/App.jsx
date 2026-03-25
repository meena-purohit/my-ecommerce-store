import CartPage from "./components/CartPage";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Navbar from "./components/Navbar";




function App() {
 
   

  return(
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          
          <Route  path="/" element={<Home />}/>
         <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
   
  
    </div>
    
  );
}
export default App;

