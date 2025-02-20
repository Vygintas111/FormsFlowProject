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

    const navbarStyle =
        theme === "dark"
            ? { backgroundColor: "#1b1e21" }  // slightly darker dark
            : { backgroundColor: "#dcdcdc" }; // slightly darker light

    return (
        <>
            <nav style={navbarStyle} className={`navbar navbar-expand-lg ${theme === "dark" ? "navbar-dark" : "navbar-light"} align-items-center`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{t("welcomeTo")} FormFlow</Link>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav align-items-center">
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard">{t("dashboard")}</Link>
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
                                </>
                            )}
                            <li className="nav-item ms-2">
                                <button onClick={toggleTheme} className="btn btn-sm btn-outline-secondary">
                                    {t("changeTheme")}
                                </button>
                            </li>
                            <li className="nav-item ms-2">
                                <select
                                    onChange={handleLanguageChange}
                                    value={i18n.language}
                                    className="form-select form-select-sm"
                                    style={{ width: "auto" }}
                                >
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    <option value="de">Deutsch</option>
                                </select>
                            </li>
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
