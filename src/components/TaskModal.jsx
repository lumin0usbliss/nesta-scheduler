import { useState } from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './UI';
import CategoryEditModal from './CategoryEditModal';
import PriorityEditModal from './PriorityEditModal';
import './TaskModal.css';

const TaskModal = ({ onClose, onAdd, defaultDate }) => {
  const { categories, priorities } = useAppContext();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0] || '기타');
  const [priority, setPriority] = useState(priorities[0] || '보통');
  const [isCategoryEditModalOpen, setIsCategoryEditModalOpen] = useState(false);
  const [isPriorityEditModalOpen, setIsPriorityEditModalOpen] = useState(false);
  const [datetime, setDatetime] = useState(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localNow = new Date(now - offset).toISOString().slice(0, 16);
    
    if (defaultDate) {
      return `${defaultDate}T${localNow.split('T')[1]}`;
    }
    return localNow;
  });

  const handleCategoryChange = (e) => {
    if (e.target.value === '__EDIT_CATEGORIES__') {
      setIsCategoryEditModalOpen(true);
    } else {
      setCategory(e.target.value);
    }
  };

  const handlePriorityChange = (e) => {
    if (e.target.value === '__EDIT_PRIORITIES__') {
      setIsPriorityEditModalOpen(true);
    } else {
      setPriority(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;
    
    let submitDate = datetime;
    let submitTime = null;
    
    if (datetime.includes('T')) {
      const parts = datetime.split('T');
      submitDate = parts[0];
      submitTime = parts[1];
    }
    
    onAdd({
      title,
      category,
      priority,
      date: submitDate,
      time: submitTime,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">새 할 일 추가</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} color="var(--text-secondary)" />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>제목</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="할 일을 입력하세요"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            />
          </div>

          <div className="form-group">
            <label>카테고리</label>
            <select value={category} onChange={handleCategoryChange}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="__EDIT_CATEGORIES__">✏️ 카테고리 편집...</option>
            </select>
          </div>

          <div className="form-group">
            <label>우선순위</label>
            <select value={priority} onChange={handlePriorityChange}>
              {priorities.map(pri => (
                <option key={pri} value={pri}>{pri}</option>
              ))}
              <option value="__EDIT_PRIORITIES__">✏️ 우선순위 편집...</option>
            </select>
          </div>

          <div className="form-group">
            <label>마감일</label>
            <div className="date-input-wrapper">
              <CalendarIcon size={18} color="var(--text-secondary)" className="date-icon" />
              <input 
                type="datetime-local" 
                value={datetime} 
                onChange={(e) => setDatetime(e.target.value)} 
              />
            </div>
          </div>

          <div className="modal-footer flex-between" style={{ gap: '12px' }}>
            <Button variant="outline" fullWidth onClick={onClose} type="button">취소</Button>
            <Button variant="primary" fullWidth onClick={handleSubmit} type="button">추가</Button>
          </div>
        </div>
      </div>
      
      {isCategoryEditModalOpen && (
        <CategoryEditModal onClose={() => setIsCategoryEditModalOpen(false)} />
      )}
      {isPriorityEditModalOpen && (
        <PriorityEditModal onClose={() => setIsPriorityEditModalOpen(false)} />
      )}
    </div>
  );
};

export default TaskModal;
