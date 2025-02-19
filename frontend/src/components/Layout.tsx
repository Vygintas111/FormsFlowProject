import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Forms App</a>
                </div>
            </nav>
            <main className="py-4">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
