import { useEffect, useState } from "react";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((res) => {
                // All response logic must be inside this block
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {products.map((product) => (
                <div key={product.id} 
                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    {/* Changed product.image to product.thumbnail */}
                    <img src={product.thumbnail} alt={product.title} className="h-40 mx-auto mb-4 object-contain" />
                    <div>
                        <h3 className="font-bold text-sm line-clamp-2">{product.title}</h3>
                        <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                    </div>
                    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}
