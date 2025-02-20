import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await api("/auth/login", "POST", { username, password });
        if (res.token) {
            dispatch(setCredentials({ token: res.token, user: res.user }));
            navigate("/dashboard");
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>{t("Login")}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">{t("Username")}</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">{t("Password")}</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary">{t("Login")}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
