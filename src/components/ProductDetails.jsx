// import { useEffect, useState } from "react";
// import { data, Link, useParams } from "react-router-dom"
// import { useCart } from "../context/CartContext";


// export default function ProductDetails () {
//     const { id } =useParams();
    
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const { addToCart } = useCart();

//     useEffect(()=> {
//     const url = "https://dummyjson.com{id}";

//     console.log("Fetching From:", url);

//     fetch(url)
//     .then((res)=> {
//         if(!res.ok) throw new Error("Product not found");
//         return res.json();
//     })
//     .then((data) => {
//         setProduct(data);
//         setLoading(false);
//     })
//     .catch((err)=> {
//         console.error("Fetch Error:", err);
//         setLoading(false);
//     })
// }, [id] );
    

//     if (loading) return <div className="text-center mt-20 text-xl">Loading Details...</div>;
//     if (!product) return <div className="text-center mt-20">Product not Found!</div>
//     return(
//         <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
//             {/*product image */}
//             <div className="bg-white p-4 rounded-xl shadow-sm border">
//                 <img src={product.thumbnail} alt={product.title} className="w-full h-96 object-contain" />
//             </div>
//             {/*Product Info */}
//             <div>
//                 <Link to="/" className="text-blue-500 mb-4 hover:underline">← Back to Products</Link>
//                 <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
//                 <p className="text-gray-600 text-lg mb-6">{product.description}</p>
//                 <div className="flex items-center gap-4 mb-8">
//                     <span className="text-3xl font-bold text-gray-600">${product.price}</span>
//                     <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">⭐ {product.rating}</span>
//                 </div>
//                 <button
//                  onClick={()=> addToCart(product)}
//                  className="bg-blue-600 text-white text-xl py-4 rounded-xl *:font-bold hover:bg-blue-700 transition"
//                  >
//                     Add to Shoping Cart
//                  </button>
//                  <div className="mt-8 border-t pt-4 text-sm text-gray-500">
//                     <p>Category: <span className="capitalize">{product.category}</span></p>
//                     <p>Stock: {product.stock} items remaining</p>
//                  </div>
//             </div>
//         </div>
//     )
// }

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Removed 'data' as it's not needed
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
    const { id } = useParams();
    
console.log("TEST 1 - URL ID IS:", id);
console.log("TEST 2 - URL BEING FETCHED:", `https://dummyjson.com{id}`);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    // useEffect(() => {
    //     // FIXED: Added /products/ and the $ sign
    //     const url = `dummyjson.com{id}`;

    //     console.log("Fetching From:", url);

    //     fetch(url)
    //         .then((res) => {
    //             if (!res.ok) throw new Error("Product not found");
    //             return res.json();
    //         })
    //         .then((data) => {
    //             setProduct(data);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             console.error("Fetch Error:", err);
    //             setLoading(false);
    //         });
    // }, [id]);

    useEffect(() => {
  // Use backticks ` (NOT ' or ") and ensure the $ is exactly before {id}
  const url = `https://dummyjson.com/products/` + id;
  
  
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    })
    .then((data) => {
      setProduct(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
      setLoading(false);
    });
}, [id]);

    if (loading) return <div className="text-center mt-20 text-xl">Loading Details...</div>;
    if (!product) return <div className="text-center mt-20">Product not Found!</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product image */}
            <div className="bg-white p-4 rounded-xl shadow-sm border">
                {/* FIXED: added space in h-96 */}
                <img src={product.thumbnail} alt={product.title} className="w-full h-96 object-contain" />
            </div>

            {/* Product Info */}
            <div>
                <Link to="/" className="text-blue-500 mb-4 inline-block hover:underline">← Back to Products</Link>
                <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                {/* FIXED: spelled description correctly */}
                <p className="text-gray-600 text-lg mb-6">{product.description}</p>
                
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-bold text-green-600">${product.price}</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">⭐ {product.rating}</span>
                </div>

                <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white text-xl py-4 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                    Add to Shopping Cart
                </button>

                <div className="mt-8 border-t pt-4 text-sm text-gray-500">
                    <p>Category: <span className="capitalize">{product.category}</span></p>
                    <p>Stock: {product.stock} items remaining</p>
                </div>
            </div>
        </div>
    );
}
