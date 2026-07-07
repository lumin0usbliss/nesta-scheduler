import { useAppContext } from '../context/AppContext';
import { Card, Button, Badge } from '../components/UI';
import { Sparkles, CalendarSync, AlertTriangle, ArrowRight } from 'lucide-react';
import './Pages.css';

const AIManager = () => {
  const { tasks, updateTask } = useAppContext();

  const analyzeTasks = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const windowDays = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today.getTime() + i * 86400000);
      const offset = d.getTimezoneOffset() * 60000;
      const dateStr = new Date(d.getTime() - offset).toISOString().split('T')[0];
      windowDays.push(dateStr);
    }

    const activeTasks = tasks.filter(t => windowDays.includes(t.date));

    if (activeTasks.length === 0) {
      return { hasInsight: false, message: '향후 7일간 등록된 일정이 없습니다. 플래너에서 일정을 추가해 보세요!' };
    }

    const catCounts = {};
    activeTasks.forEach(t => {
      catCounts[t.category] = (catCounts[t.category] || 0) + 1;
    });

    let mainCat = '';
    let maxCatCount = 0;
    ['과제', '시험', '프로젝트'].forEach(cat => {
      if (catCounts[cat] > maxCatCount) {
        maxCatCount = catCounts[cat];
        mainCat = cat;
      }
    });
    if (!mainCat && Object.keys(catCounts).length > 0) {
      mainCat = Object.keys(catCounts)[0];
      maxCatCount = catCounts[mainCat];
    }

    const dateCounts = {};
    const tasksByDate = {};
    windowDays.forEach(d => {
      dateCounts[d] = 0;
      tasksByDate[d] = [];
    });

    activeTasks.forEach(t => {
      dateCounts[t.date] += 1;
      tasksByDate[t.date].push(t);
    });

    let maxDate = windowDays[0];
    let maxDateCount = 0;
    windowDays.forEach(d => {
      if (dateCounts[d] > maxDateCount) {
        maxDateCount = dateCounts[d];
        maxDate = d;
      }
    });

    let minDate = '';
    let minDateCount = 999;
    windowDays.forEach(d => {
      if (dateCounts[d] < minDateCount && d !== maxDate) {
        minDateCount = dateCounts[d];
        minDate = d;
      }
    });

    if (maxDateCount < 2) {
      return { hasInsight: false, message: `향후 7일간 총 ${activeTasks.length}개의 일정이 있습니다. 여유로운 주간이 예상됩니다.` };
    }

    const formatDate = (dateStr) => {
      const d = new Date(dateStr);
      const days = ['일', '월', '화', '수', '목', '금', '토'];
      return `${d.getMonth()+1}/${d.getDate()}(${days[d.getDay()]})`;
    };

    return {
      hasInsight: true,
      mainCat,
      maxCatCount,
      maxDate,
      maxDateStr: formatDate(maxDate),
      minDate,
      minDateStr: formatDate(minDate),
      taskToMove: tasksByDate[maxDate][0]
    };
  };

  const insight = analyzeTasks();

  const handleApply = () => {
    if (!insight.hasInsight) return;
    
    updateTask(insight.taskToMove.id, { date: insight.minDate });
    alert(`성공적으로 ${insight.minDateStr}로 일정을 이동했습니다!`);
  };

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>스마트 일정 관리</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>AI가 당신의 캠퍼스 라이프를 최적화합니다.</p>
      </div>

      <Card highlight className="ai-insight-card">
        <div className="flex-between" style={{ marginBottom: '12px' }}>
          <div className="flex-center" style={{ gap: '8px' }}>
            <AlertTriangle size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '16px', color: 'var(--primary)' }}>일정 과부하 감지</h3>
          </div>
        </div>
        {insight.hasInsight ? (
          <>
            <p style={{ fontSize: '15px', lineHeight: '1.5', marginBottom: '16px' }}>
              향후 7일간 <strong>{insight.mainCat}이(가) {insight.maxCatCount}개</strong> 있습니다.<br/>
              {insight.maxDateStr}에 일정이 과도하게 집중되어 있습니다. {insight.minDateStr}로 {insight.taskToMove.category} 일정을 이동하는 것을 추천합니다.
            </p>
            
            <div className="recommendation-preview" style={{ background: 'white', borderRadius: '8px', padding: '12px', marginBottom: '16px', border: '1px solid var(--border-color)' }}>
              <div className="flex-between" style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>이동 전 ({insight.maxDateStr})</span>
                <ArrowRight size={14} color="var(--text-secondary)" />
                <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600' }}>이동 후 ({insight.minDateStr})</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{insight.taskToMove.title}</div>
            </div>
            
            <Button variant="primary" fullWidth onClick={handleApply}>추천 일정 적용하기</Button>
          </>
        ) : (
          <p style={{ fontSize: '15px', lineHeight: '1.5', marginBottom: '16px' }}>
            {insight.message}
          </p>
        )}
      </Card>

      <div className="section">
        <h3 className="section-header" style={{ fontSize: '16px' }}>주간 분석 리포트</h3>
        <div className="grid-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Card style={{ padding: '16px' }}>
            <CalendarSync size={24} color="var(--text-secondary)" style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>공강 시간 활용</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>화/목 오후에 3시간의 공강이 있습니다.</div>
          </Card>
          <Card style={{ padding: '16px' }}>
            <Sparkles size={24} color="var(--accent-warm)" style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>시험 대비 전략</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>운영체제 기출문제를 풀어볼 시간입니다.</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIManager;
