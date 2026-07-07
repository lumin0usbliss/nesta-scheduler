import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './UI';
import './TaskModal.css';

const ProfileEditModal = ({ onClose }) => {
  const { profile, updateProfile } = useAppContext();
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">내 정보 수정</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} color="var(--text-secondary)" />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>이름</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>학교</label>
            <input name="school" type="text" value={formData.school} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>전공/학과</label>
            <input name="department" type="text" value={formData.department} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>학년</label>
            <input name="grade" type="text" value={formData.grade} onChange={handleChange} />
          </div>
          
          <div className="modal-footer" style={{ marginTop: '24px' }}>
            <Button variant="primary" fullWidth onClick={handleSave} className="flex-center" style={{ gap: '8px' }}>
              <Check size={18} /> 저장하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
