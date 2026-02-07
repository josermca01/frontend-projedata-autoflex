import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createRawMaterial, updateRawMaterial } from '../store/slices/rawMaterialsSlice';
import './RawMaterialForm.css';

const RawMaterialForm = ({ rawMaterial, onClose, onSaveSuccess }) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
    stockQuantity: '',
  });

  useEffect(() => {
    if (rawMaterial) {
      setFormData({
        name: rawMaterial.name || '',
        stockQuantity: rawMaterial.stockQuantity || '',
      });
    }
  }, [rawMaterial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const materialData = {
      name: formData.name,
      stockQuantity: parseFloat(formData.stockQuantity),
    };

    try {
      if (rawMaterial) {
        await dispatch(updateRawMaterial({ id: rawMaterial.id, rawMaterial: materialData }));
      } else {
        await dispatch(createRawMaterial(materialData));
      }
      onSaveSuccess();
    } catch (error) {
      alert('Error saving raw material: ' + error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{rawMaterial ? 'Edit Raw Material' : 'New Raw Material'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock Quantity:</label>
            <input
              type="number"
              step="0.01"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RawMaterialForm;
