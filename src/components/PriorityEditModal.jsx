import { useState } from 'react';
import { X, Check, Trash2, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './UI';
import './TaskModal.css';

const PriorityEditModal = ({ onClose }) => {
  const { priorities: initialPriorities, updatePriorities } = useAppContext();
  const [priorities, setPriorities] = useState([...initialPriorities]);
  const [newPri, setNewPri] = useState('');

  const handleAdd = () => {
    const trimmed = newPri.trim();
    if (trimmed && !priorities.includes(trimmed)) {
      setPriorities([...priorities, trimmed]);
      setNewPri('');
    }
  };

  const handleDelete = (index) => {
    setPriorities(priorities.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newPris = [...priorities];
    const temp = newPris[index - 1];
    newPris[index - 1] = newPris[index];
    newPris[index] = temp;
    setPriorities(newPris);
  };

  const handleMoveDown = (index) => {
    if (index === priorities.length - 1) return;
    const newPris = [...priorities];
    const temp = newPris[index + 1];
    newPris[index + 1] = newPris[index];
    newPris[index] = temp;
    setPriorities(newPris);
  };

  const handleSave = () => {
    updatePriorities(priorities);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">우선순위 편집</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} color="var(--text-secondary)" />
          </button>
        </div>

        <div className="modal-body" style={{ paddingBottom: '16px' }}>
          <div className="flex-between" style={{ gap: '8px', marginBottom: '20px' }}>
            <input 
              type="text" 
              value={newPri} 
              onChange={(e) => setNewPri(e.target.value)} 
              placeholder="새 우선순위 이름"
              style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <Button variant="secondary" onClick={handleAdd} style={{ padding: '10px' }}>
              <Plus size={20} />
            </Button>
          </div>

          <div style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {priorities.map((pri, index) => (
              <div key={pri} className="flex-between" style={{ padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: '500', fontSize: '15px' }}>{pri}</span>
                
                <div className="flex-center" style={{ gap: '4px' }}>
                  <button className="icon-btn" onClick={() => handleMoveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.3 : 1 }}>
                    <ArrowUp size={16} />
                  </button>
                  <button className="icon-btn" onClick={() => handleMoveDown(index)} disabled={index === priorities.length - 1} style={{ opacity: index === priorities.length - 1 ? 0.3 : 1 }}>
                    <ArrowDown size={16} />
                  </button>
                  <button className="icon-btn" onClick={() => handleDelete(index)} style={{ color: '#EF4444', marginLeft: '4px' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {priorities.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px 0', fontSize: '14px' }}>
                우선순위 항목이 없습니다.
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

export default PriorityEditModal;
