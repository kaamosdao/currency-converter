import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout: React.FC = () => (
  <div className="d-flex flex-column h-100">
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Currency Converter</span>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Convertation
            </Link>
            <Link className="nav-link" to="/exchangerates">
              ExchangeRates
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Outlet />
    </div>
  </div>
);

export default Layout;
