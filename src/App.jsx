import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.scss'

import { store } from './store/store'
import { UserMsg } from './cmps/common/UserMsg'
import { AppHeader } from './cmps/layout/AppHeader'
import { AppFooter } from './cmps/layout/AppFooter'
import { AboutUs } from './pages/AboutUS'
import { HomePage } from './pages/HomePage'
import { ToyIndex } from './pages/ToyIndex'
import { ToyEdit } from './pages/ToyEdit'
import { ToyDetails } from './pages/ToyDetails'
import { Dashboard } from './pages/Dashboard'
import { AdminIndex } from './pages/AdminIndex'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app main-layout">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="about" />
                            <Route element={<Dashboard />} path="dashboard" />
                            <Route element={<ToyIndex />} path="toy" />
                            <Route element={<ToyEdit />} path="toy/edit" />
                            <Route element={<ToyEdit />} path="toy/edit/:toyId" />
                            <Route element={<ToyDetails />} path="toy/:toyId" />
                            <Route element={<AdminIndex />} path="admin" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
            <UserMsg />
        </Provider>
    )
}