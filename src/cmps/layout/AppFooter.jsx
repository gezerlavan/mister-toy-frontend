import { useSelector } from "react-redux";
import { ShoppingCart } from "../toy/ShoppingCart";

export function AppFooter() {
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
    const shoppingCart = useSelector(storeState => storeState.toyModule.shoppingCart)

    return (
        <footer className="app-footer">
            <p>
                Coffeerights to Tal Elias©
            </p>
            <ShoppingCart
                isCartShown={isCartShown}
                shoppingCart={shoppingCart}
            />
        </footer>
    )
}