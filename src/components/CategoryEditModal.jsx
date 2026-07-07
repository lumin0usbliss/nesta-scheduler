import { useState } from 'react';
import { X, Check, Trash2, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './UI';
import './TaskModal.css';

const CategoryEditModal = ({ onClose }) => {
  const { categories: initialCategories, updateCategories } = useAppContext();
  const [categories, setCategories] = useState([...initialCategories]);
  const [newCat, setNewCat] = useState('');

  const handleAdd = () => {
    const trimmed = newCat.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setNewCat('');
    }
  };

  const handleDelete = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newCats = [...categories];
    const temp = newCats[index - 1];
    newCats[index - 1] = newCats[index];
    newCats[index] = temp;
    setCategories(newCats);
  };

  const handleMoveDown = (index) => {
    if (index === categories.length - 1) return;
    const newCats = [...categories];
    const temp = newCats[index + 1];
    newCats[index + 1] = newCats[index];
    newCats[index] = temp;
    setCategories(newCats);
  };

  const handleSave = () => {
    updateCategories(categories);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">카테고리 편집</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} color="var(--text-secondary)" />
          </button>
        </div>

        <div className="modal-body" style={{ paddingBottom: '16px' }}>
          <div className="flex-between" style={{ gap: '8px', marginBottom: '20px' }}>
            <input 
              type="text" 
              value={newCat} 
              onChange={(e) => setNewCat(e.target.value)} 
              placeholder="새 카테고리 이름"
              style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <Button variant="secondary" onClick={handleAdd} style={{ padding: '10px' }}>
              <Plus size={20} />
            </Button>
          </div>

          <div style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categories.map((cat, index) => (
              <div key={cat} className="flex-between" style={{ padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: '500', fontSize: '15px' }}>{cat}</span>
                
                <div className="flex-center" style={{ gap: '4px' }}>
                  <button className="icon-btn" onClick={() => handleMoveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.3 : 1 }}>
                    <ArrowUp size={16} />
                  </button>
                  <button className="icon-btn" onClick={() => handleMoveDown(index)} disabled={index === categories.length - 1} style={{ opacity: index === categories.length - 1 ? 0.3 : 1 }}>
                    <ArrowDown size={16} />
                  </button>
                  <button className="icon-btn" onClick={() => handleDelete(index)} style={{ color: '#EF4444', marginLeft: '4px' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {categories.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px 0', fontSize: '14px' }}>
                카테고리가 없습니다.
              </div>
            )}
          </div>

          <div className="modal-footer">
            <Button variant="primary" fullWidth onClick={handleSave} className="flex-center" style={{ gap: '8px' }}>
              <Check size={18} />
              저장 및 반영
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditModal;
