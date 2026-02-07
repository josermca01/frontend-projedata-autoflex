import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRawMaterials, deleteRawMaterial } from '../store/slices/rawMaterialsSlice';
import RawMaterialForm from './RawMaterialForm';
import './RawMaterialList.css';

const RawMaterialList = () => {
  const dispatch = useDispatch();
  const { items: rawMaterials, loading, error } = useSelector((state) => state.rawMaterials);
  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this raw material?')) {
      await dispatch(deleteRawMaterial(id));
      dispatch(fetchRawMaterials());
    }
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMaterial(null);
  };

  const handleSaveSuccess = () => {
    handleCloseForm();
    dispatch(fetchRawMaterials());
  };

  if (loading) return <div className="loading">Loading raw materials...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="raw-material-list-container">
      <div className="header">
        <h2>Raw Materials</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add Raw Material
        </button>
      </div>

      {showForm && (
        <RawMaterialForm
          rawMaterial={editingMaterial}
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
              <th>Stock Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rawMaterials.map((material) => (
              <tr key={material.id}>
                <td>{material.id}</td>
                <td>{material.name}</td>
                <td>{material.stockQuantity}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(material)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(material.id)}
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

export default RawMaterialList;
