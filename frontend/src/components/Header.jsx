import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const accessToken = localStorage.getItem("access_token");

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
    };
    useEffect(() => {
        const access = localStorage.getItem("access_token");
        if (access) {
            try {
                const decoded = jwtDecode(access);
                setUser({
                    user_id: decoded.user_id,
                    is_admin: decoded.is_admin || decoded.is_staff || false,
                });
            } catch (err) {
                console.error("Invalid token", err);
            }
        }
    }, []);

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    Bookstore
                </Link>

                {/* Nav buttons */}
                <div className="nav-links">
                    {!accessToken ? (
                        <Link to="/login" className="btn btn-login">
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link to="/admin" className="btn btn-admin">
                                Admin Portal
                            </Link>
                            <Link to="/cart" className="btn btn-cart">
                                Cart
                            </Link>
                            <button onClick={handleLogout} className="btn btn-logout">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
