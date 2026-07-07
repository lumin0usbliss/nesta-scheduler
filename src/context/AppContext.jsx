import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('nesta_profile');
    return saved ? JSON.parse(saved) : {
      name: '김우주',
      school: '한국대학교',
      department: '경영정보학과',
      grade: '4학년'
    };
  });

  const [fixedSchedules, setFixedSchedules] = useState(() => {
    const saved = localStorage.getItem('nesta_fixed_schedules');
    return saved ? JSON.parse(saved) : [];
  });

  const [skippedFixedSchedules, setSkippedFixedSchedules] = useState(() => {
    const saved = localStorage.getItem('nesta_skipped_schedules');
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('nesta_categories');
    return saved ? JSON.parse(saved) : ['수업', '과제', '시험', '프로젝트'];
  });

  const [priorities, setPriorities] = useState(() => {
    const saved = localStorage.getItem('nesta_priorities');
    return saved ? JSON.parse(saved) : ['좆됨', '못하면 못하는거지~'];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('nesta_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: '알고리즘 과제 제출', category: '과제', date: new Date().toISOString().split('T')[0], completed: false, priority: 'high' },
      { id: 2, title: '데이터베이스 수업', category: '수업', date: new Date().toISOString().split('T')[0], completed: true, time: '14:00', priority: 'medium' },
      { id: 3, title: '웹 프로그래밍 프로젝트 회의', category: '프로젝트', date: new Date(Date.now() + 86400000*2).toISOString().split('T')[0], completed: false, priority: 'high' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('nesta_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('nesta_fixed_schedules', JSON.stringify(fixedSchedules));
  }, [fixedSchedules]);

  useEffect(() => {
    localStorage.setItem('nesta_skipped_schedules', JSON.stringify(skippedFixedSchedules));
  }, [skippedFixedSchedules]);

  useEffect(() => {
    localStorage.setItem('nesta_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('nesta_priorities', JSON.stringify(priorities));
  }, [priorities]);

  useEffect(() => {
    localStorage.setItem('nesta_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [studyTime, setStudyTime] = useState({
    today: 5.5,
    weekly: 24,
    goal: 30
  });

  const completeTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (task) => {
    setTasks(prev => [...prev, { ...task, id: Date.now(), completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const updateCategories = (newCategories) => {
    setCategories(newCategories);
  };

  const updatePriorities = (newPriorities) => {
    setPriorities(newPriorities);
  };

  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addFixedSchedule = (schedule) => {
    setFixedSchedules(prev => [...prev, { ...schedule, id: Date.now() }]);
  };

  const updateFixedSchedule = (id, updates) => {
    setFixedSchedules(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteFixedSchedule = (id) => {
    setFixedSchedules(prev => prev.filter(s => s.id !== id));
  };

  const skipFixedSchedule = (scheduleId, date) => {
    setSkippedFixedSchedules(prev => [...prev, { scheduleId, date }]);
  };

  const value = {
    profile,
    categories,
    priorities,
    tasks,
    fixedSchedules,
    skippedFixedSchedules,
    studyTime,
    completeTask,
    addTask,
    deleteTask,
    updateTask,
    updateCategories,
    updatePriorities,
    updateProfile,
    addFixedSchedule,
    updateFixedSchedule,
    deleteFixedSchedule,
    skipFixedSchedule
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
