import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Badge, Button, ProgressBar } from '../components/UI';
import { CheckCircle2, Sparkles, Clock, Target, Trash2 } from 'lucide-react';
import TaskModal from '../components/TaskModal';
import './Pages.css';

const Home = () => {
  const { profile, tasks, priorities, studyTime, completeTask, deleteTask, addTask, fixedSchedules, skippedFixedSchedules, skipFixedSchedule } = useAppContext();

  const getPriorityEmoji = (priorityName) => {
    const index = priorities.indexOf(priorityName);
    if (index <= 0) return '🚨';
    if (index === priorities.length - 1) return '🔵';
    return '🟡';
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.date === todayStr);
  const todayDayKor = ['일', '월', '화', '수', '목', '금', '토'][new Date().getDay()];
  
  const todaysFixedSchedules = (fixedSchedules || []).filter(s => 
    s.day === todayDayKor && 
    !(skippedFixedSchedules || []).some(skip => skip.scheduleId === s.id && skip.date === todayStr)
  );
  
  const completedCount = todayTasks.filter(t => t.completed).length;
  const progress = todayTasks.length === 0 ? 0 : (completedCount / todayTasks.length) * 100;

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="hero-section">
        {/* Placeholder for the generated image, we will use a background color for now with a warm gradient */}
        <div className="hero-image-placeholder">
          <img src="/spring_campus.png" alt="Spring Campus" className="hero-img" onError={(e) => { e.target.style.display = 'none'; }} />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>AI와 함께 만드는<br/>가장 똑똑한 대학생활.</h1>
          <p>오늘 하루를 AI와 함께 계획해보세요.</p>
        </div>
      </div>

      {/* AI Briefing */}
      <div className="section">
        <Card highlight className="ai-briefing">
          <div className="flex-between" style={{ marginBottom: '12px' }}>
            <div className="flex-center" style={{ gap: '8px' }}>
              <Sparkles size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '16px', color: 'var(--primary)' }}>오늘의 브리핑</h3>
            </div>
            <Badge color="warm">바쁜 날</Badge>
          </div>
          <h2 style={{ fontSize: '22px', marginBottom: '8px' }}>Good Morning, {profile.name}님.</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '16px' }}>
            오늘은 <strong>과제 {todayTasks.filter(t=>t.category==='과제').length}개</strong>, 
            <strong>수업 {todayTasks.filter(t=>t.category==='수업').length}개</strong>가 있습니다.
          </p>
          <div className="ai-insight">
            <p>💡 이번 주 중 가장 바쁜 날입니다. 오후 2시 데이터베이스 수업 전에 알고리즘 과제를 끝내는 것을 추천합니다.</p>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <Button variant="primary" fullWidth onClick={() => setIsModalOpen(true)}>오늘 일정 추가</Button>
            <Button variant="secondary">AI 플랜 생성</Button>
          </div>
        </Card>
      </div>

      {/* Today's Tasks */}
      <div className="section">
        <div className="section-header flex-between">
          <h3>오늘의 할 일</h3>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{completedCount}/{todayTasks.length} 완료</span>
        </div>
        <Card>
          <div style={{ marginBottom: '16px' }}>
            <div className="flex-between" style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>달성률</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary)' }}>{Math.round(progress)}%</span>
            </div>
            <ProgressBar progress={progress} />
          </div>
          <div className="task-list">
            {todaysFixedSchedules.map(schedule => (
              <div key={`fixed-${schedule.id}`} className="task-item flex-between" style={{ borderLeft: `3px solid ${schedule.color}`, paddingLeft: '8px', marginBottom: '8px' }}>
                <div className="flex-center" style={{ gap: '12px' }}>
                  <div style={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
                    <Clock size={16} color="var(--text-secondary)" />
                  </div>
                  <div>
                    <div className="task-title">{schedule.title}</div>
                    <div className="task-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Badge color="gray">고정 일정</Badge>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {schedule.startTime} - {schedule.endTime}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  className="icon-btn delete-btn" 
                  onClick={() => skipFixedSchedule(schedule.id, todayStr)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {todayTasks.map(task => (
              <div key={task.id} className="task-item flex-between">
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
                        {getPriorityEmoji(task.priority)} {task.priority}
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
            ))}
          </div>
        </Card>
      </div>



      {isModalOpen && (
        <TaskModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={addTask} 
          defaultDate={new Date().toISOString().split('T')[0]}
        />
      )}
    </div>
  );
};

export default Home;
