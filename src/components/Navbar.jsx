import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Navbar() {
    const {cart} = useCart();
    //Calculate total items (sum of quantities)
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
            <Link to="/" className="text-2xl font-bold text-blue-600 ">MyStore</Link>
            <div className="flex gap-6 items-center">
                <Link to="/" className="hover:text-blue-500">Home</Link>
            <Link to="/cart" className="relative bg-gray-100 p-2 rounded-full">
            🛒<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
            </span>
            </Link>
            </div>
        </nav>
    );
}