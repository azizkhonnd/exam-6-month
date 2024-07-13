import { Link, Outlet } from "react-router-dom"
import './Auth.scss'

const Auth = () => {
    return (
        <div className="auth">
            <Link to="/"></Link>
            <div className="form-container">
                <Outlet />
            </div>
        </div>
    )
}

export default Auth