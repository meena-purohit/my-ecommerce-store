import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Home() {
    const {addToCart} =useCart();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    
    const handleAddToCart =(product) => {
        addToCart(product);
        setShowToast(true);
       setTimeout(()=> setShowToast(false), 2000)
    };

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((res) => {
               
                if (!res.ok) throw new Error("Server error - could not get products");
                return res.json();
            })
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    

    if (loading) return <div className="text-center mt-10 text-xl">Loading Products...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

    
    return (
        <div className="p-6">
            <div className="max-w-md mx-auto mb-8">
                <input type="text"
                placeholder="Search products..."
                className="w-full p-3 border-2 border-blue-200 rounded-xl outline-none focus:border-blue-500"
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">

            {filteredProducts.map((product ) => (
                
                <div key={product.id} 
                
                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    <Link to={`/details/${product.id}`} className="block">
                    <img src={product.thumbnail} alt={product.title} className="h-40 mx-auto mb-4 object-contain" />
                    <div>
                        <h3 className="font-bold text-sm line-clamp-2">{product.title}</h3>
                        
                        <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                    </div>
                    </Link>
                    <button onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Add to Cart
                    </button>

                </div>
            ))}
        </div>
            {showToast && (
        <div className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl animate-bounce z-50">
            ✅ Item added to cart!
        </div>
    )}
        </div>
    );
}
