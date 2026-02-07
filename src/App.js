import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import ProductList from './components/ProductList';
import RawMaterialList from './components/RawMaterialList';
import ProductionSuggestion from './components/ProductionSuggestion';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="nav-container">
              <h1 className="logo">Inventory System</h1>
              <ul className="nav-links">
                <li>
                  <Link to="/">Products</Link>
                </li>
                <li>
                  <Link to="/raw-materials">Raw Materials</Link>
                </li>
                <li>
                  <Link to="/production">Production</Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/raw-materials" element={<RawMaterialList />} />
              <Route path="/production" element={<ProductionSuggestion />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
