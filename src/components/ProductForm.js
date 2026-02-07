import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../store/slices/productsSlice';
import { fetchRawMaterials } from '../store/slices/rawMaterialsSlice';
import './ProductForm.css';

const ProductForm = ({ product, onClose, onSaveSuccess }) => {
  const dispatch = useDispatch();
  const { items: rawMaterials } = useSelector((state) => state.rawMaterials);
  
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    compositions: [],
  });

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        value: product.value || '',
        compositions: product.compositions || [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddComposition = () => {
    setFormData({
      ...formData,
      compositions: [
        ...formData.compositions,
        { rawMaterialId: '', quantityRequired: '' },
      ],
    });
  };

  const handleCompositionChange = (index, field, value) => {
    const newCompositions = [...formData.compositions];
    newCompositions[index][field] = value;
    setFormData({ ...formData, compositions: newCompositions });
  };

  const handleRemoveComposition = (index) => {
    const newCompositions = formData.compositions.filter((_, i) => i !== index);
    setFormData({ ...formData, compositions: newCompositions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      value: parseFloat(formData.value),
      compositions: formData.compositions.map((comp) => ({
        rawMaterialId: parseInt(comp.rawMaterialId),
        quantityRequired: parseFloat(comp.quantityRequired),
      })),
    };

    try {
      if (product) {
        await dispatch(updateProduct({ id: product.id, product: productData }));
      } else {
        await dispatch(createProduct(productData));
      }
      onSaveSuccess();
    } catch (error) {
      alert('Error saving product: ' + error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{product ? 'Edit Product' : 'New Product'}</h3>
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
            <label>Value:</label>
            <input
              type="number"
              step="0.01"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Materials:</label>
            {formData.compositions.map((comp, index) => (
              <div key={index} className="composition-row">
                <select
                  value={comp.rawMaterialId}
                  onChange={(e) =>
                    handleCompositionChange(index, 'rawMaterialId', e.target.value)
                  }
                  required
                >
                  <option value="">Select material</option>
                  {rawMaterials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Quantity"
                  value={comp.quantityRequired}
                  onChange={(e) =>
                    handleCompositionChange(index, 'quantityRequired', e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  className="btn btn-remove"
                  onClick={() => handleRemoveComposition(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddComposition}
            >
              Add Material
            </button>
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

export default ProductForm;
