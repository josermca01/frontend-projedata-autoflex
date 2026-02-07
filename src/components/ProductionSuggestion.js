import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductionSuggestion } from '../store/slices/productionSlice';
import './ProductionSuggestion.css';

const ProductionSuggestion = () => {
  const dispatch = useDispatch();
  const { suggestion, loading, error } = useSelector((state) => state.production);

  useEffect(() => {
    dispatch(fetchProductionSuggestion());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchProductionSuggestion());
  };

  if (loading) return <div className="loading">Loading production suggestion...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="production-suggestion-container">
      <div className="header">
        <h2>Production Suggestion</h2>
        <button className="btn btn-primary" onClick={handleRefresh}>
          Refresh
        </button>
      </div>

      {suggestion && suggestion.items && suggestion.items.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit Value</th>
                  <th>Quantity to Produce</th>
                  <th>Total Value</th>
                </tr>
              </thead>
              <tbody>
                {suggestion.items.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.productName}</td>
                    <td>${item.productValue.toFixed(2)}</td>
                    <td>{item.quantityToProduce}</td>
                    <td>${item.totalValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="total-section">
            <h3>Total Production Value: ${suggestion.totalValue.toFixed(2)}</h3>
          </div>

          <div className="info-box">
            <p>
              <strong>Note:</strong> This suggestion prioritizes products with higher values.
              The system calculates the maximum quantity of each product that can be produced
              with the available raw materials in stock.
            </p>
          </div>
        </>
      ) : (
        <div className="no-data">
          <p>No production can be suggested with the current stock levels.</p>
          <p>Please check your raw materials inventory.</p>
        </div>
      )}
    </div>
  );
};

export default ProductionSuggestion;
