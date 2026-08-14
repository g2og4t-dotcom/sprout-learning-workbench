import test from 'node:test';
import assert from 'node:assert/strict';
import { allCards, getSubjects } from '../content.mjs';
import {
  calculateStreak,
  cardProgress,
  checkIn,
  createDefaultState,
  localDayKey,
  markCardViewed,
  monthCalendar,
  normalizeState,
  rollStateToDay,
  redeemReward,
  safeImportedState,
  setCardMastered,
  studyCount,
  taskCompletion,
  toggleTask,
  totalProgress
} from '../core.mjs';

test('default state includes safe local-first defaults', () => {
  const state = createDefaultState('2026-08-13');
  assert.equal(state.flowers, 0);
  assert.equal(state.profile.grade, 'grade1');
  assert.equal(state.settings.dailyGoal, 5);
  assert.equal(state.dailyTaskDate, '2026-08-13');
  assert.ok(state.rewards.length >= 3);
});

test('viewing a card is unique in the daily study count', () => {
  let state = createDefaultState('2026-08-13');
  state = markCardViewed(state, allCards[0].id, '2026-08-13');
  state = markCardViewed(state, allCards[0].id, '2026-08-13');
  assert.equal(studyCount(state, '2026-08-13'), 1);
  assert.equal(state.views[allCards[0].id], 2);
});

test('mastery gives one flower only once even after unmastering', () => {
  let state = createDefaultState();
  let result = setCardMastered(state, allCards[0].id, true);
  assert.equal(result.earned, 1);
  assert.equal(result.state.flowers, 1);
  result = setCardMastered(result.state, allCards[0].id, false);
  result = setCardMastered(result.state, allCards[0].id, true);
  assert.equal(result.earned, 0);
  assert.equal(result.state.flowers, 1);
});

test('subject and total progress report mastered cards', () => {
  let state = createDefaultState();
  state = setCardMastered(state, 'g1-cn-pinyin', true).state;
  state = setCardMastered(state, 'g1-math-add', true).state;
  assert.equal(cardProgress(state, 'g1-chinese').mastered, 1);
  assert.equal(totalProgress(state).mastered, 2);
  assert.equal(totalProgress(state).total, getSubjects('grade1').flatMap((subject) => subject.cards).length);
});

test('task reward cannot be farmed by toggling completion', () => {
  let state = createDefaultState('2026-08-13');
  let result = toggleTask(state, 'task-read', '2026-08-13');
  assert.equal(result.state.flowers, 1);
  result = toggleTask(result.state, 'task-read', '2026-08-13');
  assert.equal(result.state.flowers, 1);
  result = toggleTask(result.state, 'task-read', '2026-08-13');
  assert.equal(result.state.flowers, 1);
  assert.equal(result.earned, 0);
});

test('daily study task completes automatically at configured goal', () => {
  const today = localDayKey();
  let state = createDefaultState(today);
  state.settings.dailyGoal = 2;
  state = markCardViewed(state, allCards[0].id, today);
  state = markCardViewed(state, allCards[1].id, today);
  assert.equal(taskCompletion(state).completed, 1);
});

test('check-in can only reward once a day', () => {
  let state = createDefaultState();
  let result = checkIn(state, '2026-08-13');
  assert.equal(result.earned, 2);
  result = checkIn(result.state, '2026-08-13');
  assert.equal(result.earned, 0);
  assert.equal(result.state.flowers, 2);
});

test('streak counts back from today or yesterday', () => {
  const checkins = { '2026-08-10': true, '2026-08-11': true, '2026-08-12': true };
  assert.equal(calculateStreak(checkins, new Date(2026, 7, 13)), 3);
  checkins['2026-08-13'] = true;
  assert.equal(calculateStreak(checkins, new Date(2026, 7, 13)), 4);
});

test('calendar uses Monday-first cells and marks check-ins', () => {
  const cells = monthCalendar(2026, 7, { '2026-08-13': true });
  const firstDay = cells.find((cell) => cell?.day === 1);
  assert.equal(cells.indexOf(firstDay), 5);
  assert.equal(cells.find((cell) => cell?.day === 13).checked, true);
});

test('reward redemption validates balance and records success', () => {
  let state = createDefaultState();
  const reward = state.rewards[0];
  let result = redeemReward(state, reward.id);
  assert.equal(result.ok, false);
  state.flowers = reward.cost;
  result = redeemReward(state, reward.id);
  assert.equal(result.ok, true);
  assert.equal(result.state.flowers, 0);
  assert.equal(result.state.redemptions.length, 1);
});

test('normalization resets daily tasks on a new day', () => {
  const state = createDefaultState('2026-08-12');
  state.dailyTasks['task-read'] = true;
  const next = normalizeState(state, '2026-08-13');
  assert.equal(next.dailyTasks['task-read'], false);
  assert.equal(next.dailyTaskDate, '2026-08-13');
});

test('an already-open app can roll daily state across midnight', () => {
  const state = createDefaultState('2026-08-12');
  state.dailyTasks['task-read'] = true;
  const next = rollStateToDay(state, '2026-08-13');
  assert.equal(next.dailyTaskDate, '2026-08-13');
  assert.equal(next.dailyTasks['task-read'], false);
});

test('import validation rejects future incompatible versions', () => {
  assert.throws(() => safeImportedState({ version: 999 }), /更新版本/);
  assert.doesNotThrow(() => safeImportedState(createDefaultState()));
});

test('import validation sanitizes embedded markup and unsafe identifiers', () => {
  const imported = safeImportedState({
    version: 1,
    profile: { name: '<img src=x>', avatar: '<svg/onload=alert(1)>' },
    customTasks: [{ id: '\" onclick=alert(1)', icon: '<img>', label: '<b>任务</b>' }],
    rewards: [{ id: 'safe-id', icon: '<img>', name: '<script>坏</script>', cost: -5 }]
  });
  assert.equal(imported.profile.avatar, '🐣');
  assert.match(imported.customTasks[0].id, /^task-import-/);
  assert.equal(imported.customTasks[0].icon, '⭐');
  assert.equal(imported.rewards[0].cost, 1);
});
