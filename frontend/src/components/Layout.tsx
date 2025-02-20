import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTheme } from "../redux/slices/themeSlice";
import { useTranslation } from "react-i18next";

const Layout: React.FC = () => {
    const { theme } = useSelector((state: RootState) => state.theme);
    const { t, i18n } = useTranslation();
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.className = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(setTheme(newTheme));
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">FormsFlow</Link>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard">{t("dashboard")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={toggleTheme} className="btn btn-sm btn-outline-secondary me-2">
                                            {t("changeTheme")}
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <select
                                            onChange={handleLanguageChange}
                                            value={i18n.language}
                                            className="form-select form-select-sm"
                                            style={{ width: "auto" }}
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Español</option>
                                        </select>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">{t("login")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">{t("register")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={toggleTheme} className="btn btn-sm btn-outline-secondary me-2">
                                            {t("changeTheme")}
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <select
                                            onChange={handleLanguageChange}
                                            value={i18n.language}
                                            className="form-select form-select-sm"
                                            style={{ width: "auto" }}
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Español</option>
                                        </select>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-3">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
