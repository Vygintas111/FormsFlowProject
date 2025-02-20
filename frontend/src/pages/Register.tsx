import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useTranslation } from "react-i18next";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await api("/auth/register", "POST", { username, email, password });
        if (res.message === "User registered successfully") navigate("/login");
        else alert(res.message);
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>{t("Register")}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">{t("Username")}</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">{t("Email")}</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">{t("Password")}</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary">{t("Register")}</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
