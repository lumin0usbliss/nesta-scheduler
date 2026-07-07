import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './UI';
import './TaskModal.css';

const FixedScheduleModal = ({ onClose, initialData }) => {
  const { addFixedSchedule, updateFixedSchedule } = useAppContext();
  const [title, setTitle] = useState(initialData?.title || '');
  const [day, setDay] = useState(initialData?.day || '월');
  const [startTime, setStartTime] = useState(initialData?.startTime || '09:00');
  const [endTime, setEndTime] = useState(initialData?.endTime || '10:30');
  const [color, setColor] = useState(initialData?.color || 'var(--primary-light)');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDay(initialData.day || '월');
      setStartTime(initialData.startTime || '09:00');
      setEndTime(initialData.endTime || '10:30');
      setColor(initialData.color || 'var(--primary-light)');
    } else {
      setTitle('');
      setDay('월');
      setStartTime('09:00');
      setEndTime('10:30');
      setColor('var(--primary-light)');
    }
  }, [initialData]);

  const colors = [
    'var(--primary-light)', '#FCA5A5', '#FCD34D', '#86EFAC', '#93C5FD', '#D8B4FE'
  ];

  const handleSave = () => {
    if (!title.trim()) return;
    if (initialData?.id) {
      updateFixedSchedule(initialData.id, { title, day, startTime, endTime, color });
    } else {
      addFixedSchedule({ title, day, startTime, endTime, color });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{initialData?.id ? '고정 일정 수정' : '고정 일정 추가'}</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} color="var(--text-secondary)" />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>일정명 (예: 전공 필수)</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          </div>
          <div className="form-group">
            <label>요일</label>
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              {['월', '화', '수', '목', '금', '토', '일'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="flex-between" style={{ gap: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>시작 시간</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>종료 시간</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>색상</label>
            <div className="flex-center" style={{ gap: '8px', justifyContent: 'flex-start' }}>
              {colors.map(c => (
                <div 
                  key={c} 
                  onClick={() => setColor(c)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%', backgroundColor: c,
                    cursor: 'pointer', border: color === c ? '2px solid var(--text-primary)' : '2px solid transparent'
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="modal-footer" style={{ marginTop: '24px' }}>
            <Button variant="primary" fullWidth onClick={handleSave} className="flex-center" style={{ gap: '8px' }}>
              <Check size={18} /> {initialData?.id ? '수정하기' : '추가하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedScheduleModal;
