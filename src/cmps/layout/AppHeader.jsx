import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { logout } from '../../store/actions/user.actions'

import { SET_CART_IS_SHOWN } from '../../store/reducers/toy.reducer'
import { LoginSignup } from '../toy/LoginSignup'

export function AppHeader() {

    const dispatch = useDispatch()
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout successfully')
        } catch (err) {
            console.log('Error during logout:', err)
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header full">
            <div className="nav-logo">
                <nav>
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/toy"> Toys</NavLink> |
                    <NavLink to="/dashboard"> Dashboard</NavLink> |
                    <NavLink to="/about"> About</NavLink> |
                    <NavLink to="/admin"> Admin</NavLink> |
                    <a href="#" onClick={(ev) => {
                        ev.preventDefault()
                        dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })
                    }}>
                        🛒 Cart
                    </a>
                </nav>
                <div className="logo">Mister Toy</div>
            </div>
            {user && <section className="user-info">
                <p>
                    {user.fullname}'s balance: <span>${user.score.toLocaleString()}</span>
                </p>
                <button onClick={onLogout}>Logout</button>
            </section>}
            {!user && <section className="user-info">
                <LoginSignup />
            </section>}
        </header>
    )
}