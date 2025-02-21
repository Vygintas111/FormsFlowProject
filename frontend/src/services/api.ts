const API_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}`
    : "https://formflow-backend";

export const api = async (endpoint: string, method = "GET", data?: any, token?: string) => {
    const config: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        }
    };
    if (data) config.body = JSON.stringify(data);
    const res = await fetch(`${API_URL}/api${endpoint}`, config);
    return res.json();
};
