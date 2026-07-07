import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Badge, Button } from '../components/UI';
import { Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight, Plus, Trash2, Edit2 } from 'lucide-react';
import TaskModal from '../components/TaskModal';
import CategoryEditModal from '../components/CategoryEditModal';
import './Pages.css';

const Planner = () => {
  const { tasks, categories, completeTask, addTask, deleteTask } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [selectedDate, setSelectedDate] = useState('2026-07-07');
  
  const getFullDate = (index, dateNum) => {
    if (index < 3) return `2026-06-${String(dateNum).padStart(2, '0')}`;
    if (index > 33) return `2026-08-${String(dateNum).padStart(2, '0')}`;
    return `2026-07-${String(dateNum).padStart(2, '0')}`;
  };

  const formatHeaderDate = (isoString) => {
    const [y, m, d] = isoString.split('-');
    const dateObj = new Date(y, parseInt(m)-1, d);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${parseInt(m)}월 ${parseInt(d)}일 (${days[dateObj.getDay()]})`;
  };
  
  // Basic mock calendar state for UI purposes
  const currentMonth = "7월 2026";
  const dates = [28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1];
  
  const selectedDateTasks = tasks.filter(t => t.date === selectedDate);
  const displayedTasks = activeCategory === '전체' 
    ? selectedDateTasks 
    : selectedDateTasks.filter(t => t.category === activeCategory);

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      
      {/* Calendar View */}
      <Card className="calendar-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="calendar-header flex-between" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <button className="icon-btn"><ChevronLeft size={20} /></button>
          <span style={{ fontWeight: '600', fontSize: '16px' }}>{currentMonth}</span>
          <button className="icon-btn"><ChevronRight size={20} /></button>
        </div>
        
        <div className="calendar-grid" style={{ padding: '16px' }}>
          <div className="calendar-row header">
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="calendar-cell day-name">{day}</div>
            ))}
          </div>
          
          <div className="calendar-row dates">
            {dates.map((date, i) => {
              const dateStr = getFullDate(i, date);
              const isSelected = dateStr === selectedDate;
              const hasTask = tasks.some(t => t.date === dateStr);
              const isOtherMonth = i < 3 || i > 33;
              
              return (
                <div 
                  key={i} 
                  className={`calendar-cell date-cell ${isSelected ? 'active' : ''} ${isOtherMonth ? 'other-month' : ''}`}
                  onClick={() => setSelectedDate(dateStr)}
                >
                  <span className="date-number">{date}</span>
                  {hasTask && !isSelected && <div className="task-dot"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Categories Filter */}
      <div className="category-filters" style={{ display: 'flex', gap: '8px', margin: '20px 0', overflowX: 'auto', paddingBottom: '4px', alignItems: 'center' }}>
        {['전체', ...categories].map(cat => (
          <Badge 
            key={cat} 
            color={activeCategory === cat ? 'blue' : 'gray'} 
            className={`filter-badge ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            style={{ flexShrink: 0 }}
          >
            {cat}
          </Badge>
        ))}
        <Badge 
          color="gray" 
          className="filter-badge flex-center" 
          onClick={() => setIsCategoryModalOpen(true)}
          style={{ flexShrink: 0, padding: '6px 10px' }}
        >
          <Edit2 size={16} />
        </Badge>
      </div>

      {/* Task List */}
      <div className="task-list-section">
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px' }}>{formatHeaderDate(selectedDate)}</h3>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{displayedTasks.length}개</span>
        </div>
        
        <div className="task-list">
          {displayedTasks.map(task => (
            <Card key={task.id} style={{ padding: '16px', marginBottom: '12px' }}>
              <div className="flex-between">
                <div className="flex-center" style={{ gap: '12px' }}>
                  <div 
                    className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                    onClick={() => completeTask(task.id)}
                  >
                    {task.completed && <CheckCircle2 size={16} color="white" />}
                  </div>
                  <div>
                    <div className={`task-title ${task.completed ? 'completed' : ''}`}>{task.title}</div>
                    <div className="task-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Badge color={task.category === '과제' ? 'warm' : 'blue'}>{task.category}</Badge>
                      <span style={{ fontSize: '11px', letterSpacing: '1px' }}>
                        {task.priority === 'high' || task.priority === '높음' ? '⭐⭐⭐' : 
                         task.priority === 'medium' || task.priority === '보통' ? '⭐⭐' : '⭐'}
                      </span>
                      {task.time && <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{task.time}</span>}
                    </div>
                  </div>
                </div>
                <button 
                  className="icon-btn delete-btn" 
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* FAB (Floating Action Button) */}
      <button className="fab-button flex-center" onClick={() => setIsModalOpen(true)}>
        <Plus size={24} color="white" />
      </button>

      {isModalOpen && (
        <TaskModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={addTask} 
          defaultDate={selectedDate}
        />
      )}

      {isCategoryModalOpen && (
        <CategoryEditModal onClose={() => setIsCategoryModalOpen(false)} />
      )}
    </div>
  );
};

export default Planner;
