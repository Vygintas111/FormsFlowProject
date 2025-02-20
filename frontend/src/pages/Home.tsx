import React from "react";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="text-center">
            <h1>{t("welcome")}</h1>
            <p>This is the core landing page.</p>
        </div>
    );
};

export default Home;
