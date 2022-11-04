import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout: React.FC = () => (
  <div className="d-flex flex-column h-100">
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Currency Converter</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Convertation
            </Link>
            <Link className="nav-link ms-3" to="/exchangerates">
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
