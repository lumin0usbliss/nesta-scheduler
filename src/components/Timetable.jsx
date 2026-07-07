import { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

const Timetable = ({ isEditMode, onScheduleDrag, onScheduleClick }) => {
  const { fixedSchedules, deleteFixedSchedule } = useAppContext();
  
  const [dragState, setDragState] = useState(null);
  
  // Parse schedules
  const parsed = fixedSchedules.map(s => {
    const [sh, sm] = s.startTime.split(':').map(Number);
    const [eh, em] = s.endTime.split(':').map(Number);
    return { ...s, sh, sm, eh, em, startMin: sh * 60 + sm, endMin: eh * 60 + em };
  });

  // Calculate days
  const allDays = ['월', '화', '수', '목', '금', '토', '일'];
  const hasWeekend = parsed.some(s => s.day === '토' || s.day === '일');
  const days = hasWeekend ? allDays : ['월', '화', '수', '목', '금'];

  // Calculate hours
  let minHour = 9;
  let maxHour = 18;
  parsed.forEach(s => {
    if (s.sh < minHour) minHour = s.sh;
    if (s.eh > maxHour) maxHour = Math.max(s.eh, maxHour);
    if (s.eh === maxHour && s.em > 0) maxHour = s.eh + 1; 
  });

  const hourHeight = 50; 
  const hours = [];
  for (let h = minHour; h <= maxHour; h++) {
    hours.push(h);
  }

  const handleMouseDown = (e, day) => {
    if (!isEditMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setDragState({ isDragging: true, day, startY: y, currentY: y });
  };

  const handleMouseMove = (e) => {
    if (!dragState || !dragState.isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const y = Math.max(0, e.clientY - rect.top);
    setDragState(prev => ({ ...prev, currentY: y }));
  };

  const handleMouseUp = () => {
    if (!dragState || !dragState.isDragging) return;
    
    const { startY, currentY, day } = dragState;
    const minPixel = Math.min(startY, currentY);
    const maxPixel = Math.max(startY, currentY);
    
    const snapInterval = hourHeight / 2; // 30 mins
    const snappedStart = Math.floor(minPixel / snapInterval) * snapInterval;
    const snappedEnd = Math.ceil(maxPixel / snapInterval) * snapInterval;
    
    const finalEnd = (snappedEnd - snappedStart < snapInterval) ? snappedStart + hourHeight : snappedEnd;

    const startHourNum = minHour + Math.floor(snappedStart / hourHeight);
    const startMinNum = (snappedStart % hourHeight) === 0 ? 0 : 30;
    const endHourNum = minHour + Math.floor(finalEnd / hourHeight);
    const endMinNum = (finalEnd % hourHeight) === 0 ? 0 : 30;

    const pad = (n) => n.toString().padStart(2, '0');
    
    if (onScheduleDrag) {
      onScheduleDrag({
        day,
        startTime: `${pad(startHourNum)}:${pad(startMinNum)}`,
        endTime: `${pad(endHourNum)}:${pad(endMinNum)}`
      });
    }

    setDragState(null);
  };

  const handleMouseLeave = () => {
    if (dragState?.isDragging) handleMouseUp();
  };

  return (
    <div className="timetable-container" style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', position: 'relative' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ width: '40px', flexShrink: 0, borderRight: '1px solid var(--border-color)' }}></div>
        {days.map(d => (
          <div key={d} style={{ flex: 1, textAlign: 'center', padding: '8px 0', fontSize: '14px', fontWeight: '500', borderRight: '1px solid var(--border-color)' }}>
            {d}
          </div>
        ))}
      </div>
      
      <div style={{ position: 'relative', display: 'flex' }}>
        <div style={{ width: '40px', flexShrink: 0, borderRight: '1px solid var(--border-color)', backgroundColor: '#FAFAFA' }}>
          {hours.map(h => (
            <div key={h} style={{ height: `${hourHeight}px`, fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-6px', left: 0, right: 0 }}>{h}</span>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', flex: 1, position: 'relative', minHeight: `${hours.length * hourHeight}px` }}>
          {/* Grid lines */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
            {hours.map((h, i) => (
              <div key={h} style={{ height: `${hourHeight}px`, borderBottom: i < hours.length -1 ? '1px solid #f0f0f0' : 'none' }}></div>
            ))}
          </div>

          {/* Day columns for absolute positioning */}
          {days.map((d, dIdx) => (
            <div 
              key={d} 
              style={{ flex: 1, borderRight: dIdx < days.length -1 ? '1px solid #f0f0f0' : 'none', position: 'relative', cursor: isEditMode ? 'crosshair' : 'default' }}
              onMouseDown={(e) => handleMouseDown(e, d)}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {/* Drag selection overlay */}
              {dragState && dragState.day === d && (
                <div style={{
                  position: 'absolute',
                  left: 2, right: 2,
                  top: Math.min(dragState.startY, dragState.currentY),
                  height: Math.max(dragState.startY, dragState.currentY) - Math.min(dragState.startY, dragState.currentY),
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.5)',
                  borderRadius: '4px',
                  pointerEvents: 'none',
                  zIndex: 10
                }} />
              )}
              {parsed.filter(s => s.day === d).map(s => {
                const top = (s.sh - minHour) * hourHeight + (s.sm / 60) * hourHeight;
                const duration = (s.endMin - s.startMin) / 60;
                const height = duration * hourHeight;
                return (
                  <div 
                    key={s.id} 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isEditMode && onScheduleClick) onScheduleClick(s);
                    }}
                    style={{
                      position: 'absolute', top: `${top}px`, height: `${height}px`,
                      left: '2px', right: '2px',
                      backgroundColor: s.color, borderRadius: '4px',
                      padding: '4px', fontSize: '11px', overflow: 'hidden',
                      display: 'flex', flexDirection: 'column', gap: '2px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      color: '#1F2937',
                      cursor: isEditMode ? 'pointer' : 'default'
                    }}
                  >
                    <div className="flex-between">
                      <span style={{ fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</span>
                      {isEditMode && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFixedSchedule(s.id);
                          }}
                          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'rgba(0,0,0,0.4)' }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <span style={{ fontSize: '10px', opacity: 0.8 }}>{s.startTime}-{s.endTime}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
