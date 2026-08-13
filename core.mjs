import { allCards, defaultRewards, defaultTasks, subjects } from './content.mjs';

export const APP_VERSION = 1;
export const STORAGE_KEY = 'sprout-workbench:v1';

export function localDayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createDefaultState(today = localDayKey()) {
  return {
    version: APP_VERSION,
    profile: { name: '小朋友', className: '幼小衔接班', avatar: '🐣' },
    flowers: 0,
    mastered: {},
    views: {},
    correct: {},
    wrong: {},
    studyLog: {},
    checkins: {},
    dailyTasks: Object.fromEntries(defaultTasks.map((task) => [task.id, false])),
    dailyTaskDate: today,
    customTasks: [],
    rewards: defaultRewards.map((reward) => ({ ...reward })),
    redemptions: [],
    rewardClaims: {},
    settings: { sound: true, reduceMotion: false, textScale: 'normal', dailyGoal: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function normalizeState(raw, today = localDayKey()) {
  const base = createDefaultState(today);
  if (!raw || typeof raw !== 'object') return base;
  const next = {
    ...base,
    ...raw,
    profile: { ...base.profile, ...(raw.profile || {}) },
    settings: { ...base.settings, ...(raw.settings || {}) },
    mastered: { ...(raw.mastered || {}) },
    views: { ...(raw.views || {}) },
    correct: { ...(raw.correct || {}) },
    wrong: { ...(raw.wrong || {}) },
    studyLog: { ...(raw.studyLog || {}) },
    checkins: { ...(raw.checkins || {}) },
    rewards: Array.isArray(raw.rewards) ? raw.rewards : base.rewards,
    customTasks: Array.isArray(raw.customTasks) ? raw.customTasks : [],
    redemptions: Array.isArray(raw.redemptions) ? raw.redemptions : [],
    rewardClaims: { ...(raw.rewardClaims || {}) }
  };
  if (next.dailyTaskDate !== today) {
    next.dailyTaskDate = today;
    next.dailyTasks = Object.fromEntries([
      ...defaultTasks.map((task) => task.id),
      ...next.customTasks.map((task) => task.id)
    ].map((id) => [id, false]));
  } else {
    next.dailyTasks = { ...base.dailyTasks, ...(raw.dailyTasks || {}) };
  }
  next.flowers = Math.max(0, Number(next.flowers) || 0);
  next.settings.dailyGoal = Math.min(20, Math.max(1, Number(next.settings.dailyGoal) || 5));
  return next;
}

export function rollStateToDay(state, today = localDayKey()) {
  return normalizeState(state, today);
}

export function cardProgress(state, subjectId) {
  const subject = subjects.find((item) => item.id === subjectId);
  if (!subject) return { mastered: 0, viewed: 0, total: 0, percent: 0 };
  const mastered = subject.cards.filter((card) => state.mastered[card.id]).length;
  const viewed = subject.cards.filter((card) => state.views[card.id]).length;
  return { mastered, viewed, total: subject.cards.length, percent: subject.cards.length ? Math.round(mastered / subject.cards.length * 100) : 0 };
}

export function totalProgress(state) {
  const mastered = allCards.filter((card) => state.mastered[card.id]).length;
  const viewed = allCards.filter((card) => state.views[card.id]).length;
  return { mastered, viewed, total: allCards.length, percent: Math.round(mastered / allCards.length * 100) };
}

export function studyCount(state, day = localDayKey()) {
  return new Set(state.studyLog[day] || []).size;
}

export function markCardViewed(state, cardId, day = localDayKey()) {
  const next = structuredClone(state);
  next.views[cardId] = (next.views[cardId] || 0) + 1;
  next.studyLog[day] = [...new Set([...(next.studyLog[day] || []), cardId])];
  next.updatedAt = new Date().toISOString();
  return next;
}

export function setCardMastered(state, cardId, mastered = true) {
  const next = structuredClone(state);
  const claimKey = `card:${cardId}`;
  if (mastered) next.mastered[cardId] = new Date().toISOString();
  else delete next.mastered[cardId];
  const earned = mastered && !next.rewardClaims[claimKey];
  if (earned) {
    next.rewardClaims[claimKey] = new Date().toISOString();
    next.flowers += 1;
  }
  next.updatedAt = new Date().toISOString();
  return { state: next, earned: earned ? 1 : 0 };
}

export function recordAnswer(state, cardId, isCorrect) {
  const next = structuredClone(state);
  const bucket = isCorrect ? 'correct' : 'wrong';
  next[bucket][cardId] = (next[bucket][cardId] || 0) + 1;
  next.updatedAt = new Date().toISOString();
  return next;
}

export function toggleTask(state, taskId, day = localDayKey()) {
  const next = normalizeState(state, day);
  const wasDone = Boolean(next.dailyTasks[taskId]);
  next.dailyTasks[taskId] = !wasDone;
  const claimKey = `task:${day}:${taskId}`;
  const earned = !wasDone && !next.rewardClaims[claimKey];
  if (earned) {
    next.rewardClaims[claimKey] = new Date().toISOString();
    next.flowers += 1;
  }
  next.updatedAt = new Date().toISOString();
  return { state: next, earned: earned ? 1 : 0, completed: !wasDone };
}

export function checkIn(state, day = localDayKey()) {
  const next = structuredClone(state);
  if (next.checkins[day]) return { state: next, earned: 0 };
  next.checkins[day] = new Date().toISOString();
  next.flowers += 2;
  next.updatedAt = new Date().toISOString();
  return { state: next, earned: 2 };
}

export function calculateStreak(checkins, today = new Date()) {
  let streak = 0;
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!checkins[localDayKey(cursor)]) cursor.setDate(cursor.getDate() - 1);
  while (checkins[localDayKey(cursor)]) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function monthCalendar(year, monthIndex, checkins = {}) {
  const first = new Date(year, monthIndex, 1);
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const mondayOffset = (first.getDay() + 6) % 7;
  const cells = Array.from({ length: mondayOffset }, () => null);
  for (let day = 1; day <= days; day += 1) {
    const date = new Date(year, monthIndex, day);
    const key = localDayKey(date);
    cells.push({ day, key, checked: Boolean(checkins[key]), isToday: key === localDayKey() });
  }
  while (cells.length % 7) cells.push(null);
  return cells;
}

export function redeemReward(state, rewardId) {
  const next = structuredClone(state);
  const reward = next.rewards.find((item) => item.id === rewardId);
  if (!reward) return { state: next, ok: false, reason: '没有找到这个奖励' };
  if (next.flowers < reward.cost) return { state: next, ok: false, reason: '小红花还不够，再学习一会儿吧' };
  next.flowers -= reward.cost;
  next.redemptions.unshift({ id: `redeem-${Date.now()}`, rewardId, name: reward.name, icon: reward.icon, cost: reward.cost, at: new Date().toISOString() });
  next.updatedAt = new Date().toISOString();
  return { state: next, ok: true, reward };
}

export function allTasksForState(state) {
  const learned = studyCount(state);
  return [
    { ...defaultTasks[0], target: state.settings.dailyGoal, autoDone: learned >= state.settings.dailyGoal, progress: Math.min(learned, state.settings.dailyGoal) },
    ...defaultTasks.slice(1),
    ...state.customTasks
  ];
}

export function taskCompletion(state) {
  const tasks = allTasksForState(state);
  const completed = tasks.filter((task) => task.autoDone || state.dailyTasks[task.id]).length;
  return { completed, total: tasks.length, percent: tasks.length ? Math.round(completed / tasks.length * 100) : 0 };
}

export function safeImportedState(data) {
  if (!data || typeof data !== 'object') throw new Error('备份文件格式不正确');
  if (Number(data.version) > APP_VERSION) throw new Error('这个备份来自更新版本，当前应用无法读取');
  const safeId = (value, fallback) => /^[a-zA-Z0-9:_-]{1,80}$/.test(String(value || '')) ? String(value) : fallback;
  const safeText = (value, fallback = '', max = 40) => typeof value === 'string' ? value.trim().slice(0, max) : fallback;
  const safeIcon = (value, fallback) => {
    const icon = safeText(value, fallback, 8);
    return /^[^<>"'&]{1,8}$/u.test(icon) ? icon : fallback;
  };
  const imported = normalizeState(data);
  imported.profile = {
    name: safeText(data.profile?.name, '小朋友', 10) || '小朋友',
    className: safeText(data.profile?.className, '幼小衔接班', 16) || '幼小衔接班',
    avatar: safeIcon(data.profile?.avatar, '🐣')
  };
  imported.customTasks = (Array.isArray(data.customTasks) ? data.customTasks : []).slice(0, 30).map((task, index) => ({
    id: safeId(task?.id, `task-import-${index}`),
    icon: safeIcon(task?.icon, '⭐'),
    label: safeText(task?.label, '自定义任务', 24) || '自定义任务',
    type: 'manual', target: 1
  }));
  imported.rewards = (Array.isArray(data.rewards) ? data.rewards : defaultRewards).slice(0, 30).map((reward, index) => ({
    id: safeId(reward?.id, `reward-import-${index}`),
    icon: safeIcon(reward?.icon, '🎁'),
    name: safeText(reward?.name, '家庭奖励', 28) || '家庭奖励',
    cost: Math.min(99, Math.max(1, Number(reward?.cost) || 1))
  }));
  imported.redemptions = (Array.isArray(data.redemptions) ? data.redemptions : []).slice(0, 100).map((item, index) => ({
    id: safeId(item?.id, `redeem-import-${index}`),
    rewardId: safeId(item?.rewardId, 'unknown'),
    icon: safeIcon(item?.icon, '🎁'),
    name: safeText(item?.name, '家庭奖励', 28) || '家庭奖励',
    cost: Math.min(99, Math.max(1, Number(item?.cost) || 1)),
    at: Number.isNaN(Date.parse(item?.at)) ? new Date().toISOString() : new Date(item.at).toISOString()
  }));
  return imported;
}
