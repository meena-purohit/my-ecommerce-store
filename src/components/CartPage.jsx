import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"

export default function CartPage() {
    const {cart, removeFromCart, updateQuantity } = useCart();

    //Calculate total price 
    const totalPrice = cart.reduce((sum, item)=> sum + item.price * item.quantity, 0);

    if(cart.length === 0) {
        return(
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold mb-4">Your Cart is empty!</h2>
                <Link to="/" className="text-blue-500 underline">Go back to shopping</Link>
            </div>
        );
    }
    console.log("current cart items:",cart);
    
    return(
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Your Shoping Cart</h1>
            <div>
                {cart.map((item)=>(
                    <div key={item.id} className="flex flex-wrap items-center justify-between border-b pb-4 gap-4 mb-4">
                        <div className="flex items-center gap-6">
                            <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
                            <div>
                                <h3 className="font-bold">{item.title}</h3>
                                <p className="text-gray-600">${item.price}</p>
                            </div>
                        </div>
                        {/* <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-lg overflow-visible bg-white">
                                <button onClick={()=> updateQuantity(item.id, -1)} className=" flex-col sm:flex-row px-3 py-3 border-l bg-gray-200 hover:bg-gray-300 text-black font-bold">-</button>
                                <span className="px-4">{item.quantity}</span>
                                <button onClick={()=>updateQuantity(item.id, 1)} className=" flex-col sm:flex-row px-3 py-3 border-l bg-gray-200 hover:bg-gray-300 text-black font-bold">+</button>
                            </div>
                        <button onClick={()=>removeFromCart(item.id)} className="text-red-500 font-medium hover:underline text-sm">Remove </button>
                        </div> */}
                        <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-gray-200">
    <div className="flex items-center border border-gray-400 rounded-md overflow-hidden min-w-\[120px\]">
        <button 
            onClick={() => updateQuantity(item.id, -1)} 
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black font-bold text-xl leading-none"
        >
            -
        </button>
        <span className="px-4 font-bold text-gray-900 border-x border-gray-400 bg-white min-w-\[40px\] text-center">
            {item.quantity}
        </span>
        <button 
            onClick={() => updateQuantity(item.id, 1)} 
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black font-bold text-xl leading-none"
        >
            +
        </button>
    </div>
    
    <button 
        onClick={() => removeFromCart(item.id)} 
        className="text-red-600 font-bold hover:underline ml-4"
    >
        REMOVE
    </button>
</div>

                    </div>
                ))}
            </div>
            <div className="mt-10 p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-xl font-bold">
                    <span>Total Amount:</span>
                    <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full mt-6 bg-green-600 text-white py-3 font-bold hover:bg-green-700 transition">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}