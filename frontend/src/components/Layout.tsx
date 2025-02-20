import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTheme } from "../redux/slices/themeSlice";
import { useTranslation } from "react-i18next";

const Layout: React.FC = () => {
    const { theme } = useSelector((state: RootState) => state.theme);
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(setTheme(newTheme));
    };

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{t("welcome")}</Link>
                    <div>
                        <Link className="nav-link" to="/dashboard">{t("dashboard")}</Link>
                        <button onClick={toggleTheme} className="btn btn-sm btn-outline-secondary me-2">
                            {t("changeTheme")}
                        </button>
                        <button onClick={() => changeLanguage("en")} className="btn btn-sm btn-outline-secondary me-2">EN</button>
                        <button onClick={() => changeLanguage("es")} className="btn btn-sm btn-outline-secondary">
                            {t("changeLanguage")}
                        </button>
                    </div>
                </div>
            </nav>
            <div className={`container mt-3 ${theme === "dark" ? "bg-dark text-light" : ""}`}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
