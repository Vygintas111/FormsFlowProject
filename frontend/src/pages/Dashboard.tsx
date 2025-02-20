import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Dashboard: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {auth.user ? (
                <>
                    <p>Welcome, {auth.user.username}</p>
                    <button className="btn btn-secondary mb-3" onClick={handleLogout}>Logout</button>
                    <div>
                        <Link to="/templates/new" className="btn btn-success">Create New Template</Link>
                    </div>
                    {/* Additional dashboard components can be added here */}
                </>
            ) : (
                <p>Please login to view your dashboard.</p>
            )}
        </div>
    );
};

export default Dashboard;
