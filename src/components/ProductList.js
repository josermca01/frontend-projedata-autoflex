import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../store/slices/productsSlice';
import ProductForm from './ProductForm';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(id));
      dispatch(fetchProducts());
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSaveSuccess = () => {
    handleCloseForm();
    dispatch(fetchProducts());
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-list-container">
      <div className="header">
        <h2>Products</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleCloseForm}
          onSaveSuccess={handleSaveSuccess}
        />
      )}

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Value</th>
              <th>Materials</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.value}</td>
                <td>
                  {product.compositions && product.compositions.length > 0 ? (
                    <ul className="materials-list">
                      {product.compositions.map((comp) => (
                        <li key={comp.id}>
                          {comp.rawMaterialName}: {comp.quantityRequired}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="no-materials">No materials</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
