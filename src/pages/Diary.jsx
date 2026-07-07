import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Badge, Button } from '../components/UI';
import { BookHeart, CheckCircle2, Sparkles, Smile, MessageCircle, Edit2 } from 'lucide-react';
import './Pages.css';

const Diary = () => {
  const { tasks } = useAppContext();
  const todayTasks = tasks.filter(t => t.date === new Date().toISOString().split('T')[0]);
  const completedTasks = todayTasks.filter(t => t.completed);

  const [mood, setMood] = useState(3);
  const [isEditing, setIsEditing] = useState(false);
  const [journalText, setJournalText] = useState(() => {
    if (completedTasks.length > 0) {
      return `${completedTasks[0].title} 끝내고 홀가분하게 쉬었다. 내일도 화이팅!`;
    }
    return `오늘 하루도 무사히 마무리. 내일은 더 알차게 보내자!`;
  });

  const generateAnalysisMessage = () => {
    if (completedTasks.length === 0) {
      return <>오늘은 아직 완료한 일정이 없어요. 작은 일부터 하나씩 시작해볼까요? 응원합니다!</>;
    }
    
    const prefix = `오늘은 ${completedTasks.length}개의 일정을 완료했어요. `;
    const todayNum = new Date().getDate();
    const templates = [
      `특히 <strong>${completedTasks[0].title}</strong> 일정을 멋지게 마무리하셨네요! 차근차근 해내는 모습이 훌륭해요.`,
      `그 중에서도 <strong>${completedTasks[0].title}</strong>을(를) 해결하신 점이 돋보입니다. 남은 시간도 파이팅하세요!`,
      `<strong>${completedTasks[0].title}</strong> 일정을 포함해 목표를 달성하는 모습이 정말 대단합니다. 내일도 기대할게요.`
    ];
    
    const templateIndex = todayNum % templates.length;
    
    return <span dangerouslySetInnerHTML={{ __html: prefix + templates[templateIndex] }} />;
  };

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      
      {/* AI Analysis */}
      <Card highlight style={{ marginBottom: '24px' }}>
        <div className="flex-between" style={{ marginBottom: '12px' }}>
          <div className="flex-center" style={{ gap: '8px' }}>
            <Sparkles size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '16px', color: 'var(--primary)' }}>AI 하루 분석</h3>
          </div>
        </div>
        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-primary)' }}>
          {generateAnalysisMessage()}
        </p>
      </Card>

      {/* Completed Tasks */}
      <div className="section">
        <h3 className="section-header" style={{ fontSize: '16px' }}>오늘 완료한 일</h3>
        <Card style={{ padding: '0' }}>
          {completedTasks.length > 0 ? (
            <div className="task-list" style={{ padding: '16px', gap: '0' }}>
              {completedTasks.map((task, i) => (
                <div key={task.id} className="flex-between" style={{ padding: '12px 0', borderBottom: i < completedTasks.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                  <div className="flex-center" style={{ gap: '12px' }}>
                    <CheckCircle2 size={18} color="var(--primary)" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{task.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        <Badge color={task.category === '과제' ? 'warm' : 'gray'} className="filter-badge" style={{ padding: '2px 8px', marginRight: '4px' }}>{task.category}</Badge>
                        {task.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
              아직 완료한 일정이 없어요.
            </div>
          )}
        </Card>
      </div>

      {/* Mood Tracker */}
      <div className="section">
        <h3 className="section-header" style={{ fontSize: '16px' }}>오늘의 기분</h3>
        <Card>
          <div className="flex-between" style={{ padding: '8px 0' }}>
            {['😭', '😕', '😐', '🙂', '🥰'].map((emoji, i) => (
              <button 
                key={i} 
                onClick={() => setMood(i)}
                style={{ 
                  fontSize: '28px', 
                  opacity: i === mood ? 1 : 0.4, 
                  transform: i === mood ? 'scale(1.2)' : 'none', 
                  transition: 'all 0.2s',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                {emoji}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Journal */}
      <div className="section">
        <Card>
          <div className="flex-between" style={{ marginBottom: '12px' }}>
            <div className="flex-center" style={{ gap: '8px' }}>
              <MessageCircle size={18} color="var(--text-secondary)" />
              <h4 style={{ fontSize: '15px' }}>한 줄 일기</h4>
            </div>
            <button className="icon-btn" onClick={() => setIsEditing(!isEditing)}>
              <Edit2 size={16} color="var(--text-secondary)" />
            </button>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#F3F4F6', borderRadius: '8px' }}>
            {isEditing ? (
              <input 
                type="text" 
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                autoFocus
                style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', color: 'var(--text-secondary)' }}
              />
            ) : (
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }} onClick={() => setIsEditing(true)}>
                {journalText}
              </div>
            )}
          </div>
        </Card>
      </div>

    </div>
  );
};

export default Diary;
