import { children, createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    
    // Initialize from localStorage so items persist on refresh
    const [cart, setCart] = useState(()=> {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const removeFromCart = (id) => {
            setCart((prevCart)=> prevCart.filter((item) => item.id !== id))
         };

         const updateQuantity = (id, amount) => {
            setCart((prevCart)=> 
            prevCart.map((item)=>
            item.id === id ? {...item, quantity:Math.max(1, item.quantity + amount) } : item
            )
            );
         };
    //Sync to localStorage whenever cart changes
    useEffect(()=> {
        localStorage.setItem('cart',JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item)=> item.id === product.id);
            if(existingItem) {
                //if already in cart, increase quantity
                return prevCart.map((item)=>
                item.id === product.id ? {...item,quantity: item.quantity+1} :item
            );
            }
            //if new, add with quantity 1 
            return [...prevCart,{...product, quantity: 1}];
        });
    };

    
    
    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
}

//Custom hook for easy access
export const useCart = ()=> useContext(CartContext);