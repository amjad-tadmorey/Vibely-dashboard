// context/ShopContext.jsx
import {
    createContext,
    useContext,
    useState,
} from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export function ShopProvider({ children }) {
    const [shop, setShop] = useState(null);

    return (
        <ShopContext.Provider value={{ shop, setShop }}>
            {children}
        </ShopContext.Provider>
    );
}
