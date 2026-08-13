import { allCards, defaultRewards, findSubject, subjects } from './content.mjs';
import {
  STORAGE_KEY,
  allTasksForState,
  calculateStreak,
  cardProgress,
  checkIn,
  createDefaultState,
  localDayKey,
  markCardViewed,
  monthCalendar,
  normalizeState,
  recordAnswer,
  redeemReward,
  safeImportedState,
  setCardMastered,
  studyCount,
  taskCompletion,
  toggleTask,
  totalProgress
} from './core.mjs';

const page = document.querySelector('#appPage');
const pageTitle = document.querySelector('#pageTitle');
const pageEyebrow = document.querySelector('#pageEyebrow');
const soundToggle = document.querySelector('#soundToggle');
const importInput = document.querySelector('#importInput');

let state = loadState();
let route = { name: 'today' };
let categoryFilter = '全部';
let answerVisible = false;
let selectedChoice = null;
let calendarCursor = new Date();

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return raw ? safeImportedState(raw) : createDefaultState();
  } catch {
    return createDefaultState();
  }
}

function saveState(next = state) {
  state = normalizeState(next);
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  syncChrome();
}

function ensureCurrentDay() {
  const today = localDayKey();
  if (state.dailyTaskDate === today) return false;
  state = normalizeState(state, today);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return true;
}

function syncChrome() {
  document.querySelector('#navFlowers').textContent = state.flowers;
  document.querySelector('#profileName').textContent = state.profile.name;
  document.querySelector('#profileClass').textContent = state.profile.className;
  document.querySelector('#profileAvatar').textContent = state.profile.avatar;
  soundToggle.textContent = state.settings.sound ? '🔊' : '🔇';
  soundToggle.setAttribute('aria-label', state.settings.sound ? '关闭语音与音效' : '打开语音与音效');
  document.body.classList.toggle('reduce-motion', state.settings.reduceMotion);
  const scale = state.settings.textScale === 'large' ? 1.12 : state.settings.textScale === 'small' ? .94 : 1;
  document.documentElement.style.setProperty('--text-scale', scale);
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function formatDate(iso) {
  return new Intl.DateTimeFormat('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
}

function routeTo(name, params = {}) {
  route = { name, ...params };
  answerVisible = false;
  selectedChoice = null;
  if (name !== 'subject') categoryFilter = '全部';
  document.querySelectorAll('[data-route]').forEach((button) => button.classList.toggle('is-active', button.dataset.route === name || (name === 'subject' && button.dataset.route === 'learn') || (name === 'study' && button.dataset.route === 'learn')));
  window.scrollTo({ top: 0, behavior: state.settings.reduceMotion ? 'auto' : 'smooth' });
  render();
}

function setHeading(title, eyebrow) {
  pageTitle.textContent = title;
  pageEyebrow.textContent = eyebrow;
}

function flowerBurst(count = 16) {
  if (state.settings.reduceMotion) return;
  const celebration = document.querySelector('#celebration');
  for (let index = 0; index < count; index += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = index % 3 === 0 ? '🌼' : index % 2 ? '✨' : '🌸';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty('--drift', `${(Math.random() - .5) * 220}px`);
    petal.style.animationDelay = `${Math.random() * .35}s`;
    celebration.appendChild(petal);
    setTimeout(() => petal.remove(), 2400);
  }
}

function toast(message) {
  const item = document.createElement('div');
  item.className = 'toast';
  item.textContent = message;
  document.querySelector('#toastRegion').appendChild(item);
  setTimeout(() => item.remove(), 2500);
}

function speak(text, lang = 'zh-CN') {
  if (!state.settings.sound) {
    toast('语音已关闭，可点右上角打开');
    return;
  }
  if (!('speechSynthesis' in window)) {
    toast('当前浏览器暂不支持语音朗读');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(text).replace(/\n/g, '，'));
  utterance.lang = lang;
  utterance.rate = lang.startsWith('zh') ? .82 : .78;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

function subjectTiles(limit = subjects.length) {
  return subjects.slice(0, limit).map((subject) => {
    const progress = cardProgress(state, subject.id);
    return `
      <button class="subject-tile" data-open-subject="${subject.id}" style="--tile-bg:${subject.soft};--tile-color:${subject.color};--tile-line:${subject.color}33">
        <span class="tile-icon">${subject.icon}</span>
        <h3>${subject.name}</h3>
        <p>${subject.description}</p>
        <div class="mini-progress"><i style="width:${progress.percent}%"></i></div>
        <span class="tile-progress-label"><span>已掌握 ${progress.mastered}</span><span>${progress.percent}%</span></span>
      </button>`;
  }).join('');
}

function todayView() {
  setHeading('我的今日计划', '今天也要开心学习');
  const learned = studyCount(state);
  const overall = totalProgress(state);
  const streak = calculateStreak(state.checkins);
  const completion = taskCompletion(state);
  const tasks = allTasksForState(state);
  const checkedIn = Boolean(state.checkins[localDayKey()]);
  page.innerHTML = `
    <div class="hero-grid">
      <article class="welcome-card">
        <div class="welcome-copy">
          <p class="eyebrow">${new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }).format(new Date())}</p>
          <h2>${escapeHtml(state.profile.name)}，准备好探索新知识了吗？</h2>
          <p>今天学 ${state.settings.dailyGoal} 张卡片，再完成两个小任务，就可以收获满满的小红花。</p>
          <button class="primary-button" data-route="learn">开始今天的学习</button>
        </div>
        <span class="mascot" aria-hidden="true">🐣</span>
      </article>
      <div class="today-stats">
        <article class="stat-card"><span>今日学习</span><strong>${learned}</strong><small>目标 ${state.settings.dailyGoal} 张</small></article>
        <article class="stat-card"><span>连续打卡</span><strong>${streak} 天</strong><small>${checkedIn ? '今天已打卡' : '今天等你来'}</small></article>
        <article class="stat-card"><span>掌握知识</span><strong>${overall.mastered}</strong><small>共 ${overall.total} 张</small></article>
        <article class="stat-card"><span>小红花</span><strong>🌼 ${state.flowers}</strong><small>可兑换奖励</small></article>
      </div>
    </div>

    <div class="section-head"><div><h2>今天想学什么？</h2><p>选一个喜欢的主题开始</p></div><button class="text-button" data-route="learn">全部科目 →</button></div>
    <div class="subject-grid">${subjectTiles(4)}</div>

    <div class="section-head"><div><h2>今日任务</h2><p>已完成 ${completion.completed}/${completion.total} 项</p></div><button class="${checkedIn ? 'secondary-button' : 'primary-button'}" id="checkinButton" ${checkedIn ? 'disabled' : ''}>${checkedIn ? '🌼 今天已打卡' : '完成今日打卡 +2 🌼'}</button></div>
    <div class="task-panel">
      ${tasks.map((task) => {
        const done = task.autoDone || state.dailyTasks[task.id];
        const hint = task.type === 'cards' ? `${task.progress}/${task.target} 张 · 学习后自动完成` : done ? '已完成，真棒！' : '完成后请点右侧圆圈';
        return `<div class="task-row">
          <span class="task-icon">${escapeHtml(task.icon)}</span>
          <span class="task-copy"><b>${escapeHtml(task.label)}</b><small>${hint}</small></span>
          <button class="check-button ${done ? 'is-done' : ''}" data-toggle-task="${escapeHtml(task.id)}" ${task.autoDone ? 'disabled' : ''} aria-label="${done ? '取消完成' : '标记完成'}">✓</button>
        </div>`;
      }).join('')}
    </div>`;
}

function learnView() {
  setHeading('七彩乐园', '选择一个今天感兴趣的主题');
  const total = totalProgress(state);
  page.innerHTML = `
    <div class="learning-header">
      <div><h2 style="margin:0 0 5px">从好奇心出发</h2><p style="margin:0;color:var(--muted)">每张卡片都可以点读，学会后会放进你的成长册。</p></div>
      <div class="learning-summary"><span>总进度</span><strong>${total.mastered}/${total.total}</strong><span>🌼 ${state.flowers}</span></div>
    </div>
    <div class="subject-grid">${subjectTiles()}</div>`;
}

function subjectView(subjectId) {
  const subject = findSubject(subjectId);
  if (!subject) return routeTo('learn');
  setHeading(subject.name, subject.description);
  const categories = ['全部', ...new Set(subject.cards.map((card) => card.category))];
  const visibleCards = categoryFilter === '全部' ? subject.cards : subject.cards.filter((card) => card.category === categoryFilter);
  const progress = cardProgress(state, subject.id);
  page.innerHTML = `
    <div class="learning-header">
      <div><button class="text-button" data-route="learn">← 返回七彩乐园</button><p style="margin:0;color:var(--muted)">${subject.icon} 已掌握 ${progress.mastered}/${progress.total} 张卡片</p></div>
      <button class="primary-button" data-start-subject="${subject.id}">从头开始学习</button>
    </div>
    <div class="category-chips">${categories.map((category) => `<button class="chip ${category === categoryFilter ? 'is-active' : ''}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('')}</div>
    <div class="card-grid">
      ${visibleCards.map((card) => `<button class="card-preview ${state.mastered[card.id] ? 'is-mastered' : ''}" data-study-card="${card.id}" data-subject="${subject.id}">
        <span class="card-preview-top"><span class="card-preview-image">${card.image}</span>${state.mastered[card.id] ? '<span class="mastered-badge">✓</span>' : ''}</span>
        <span><h3>${escapeHtml(card.prompt)}</h3><p>${escapeHtml(card.category)}${card.pinyin ? ` · ${escapeHtml(card.pinyin)}` : ''}</p></span>
      </button>`).join('')}
    </div>`;
}

function studyView(subjectId, cardId) {
  const subject = findSubject(subjectId);
  if (!subject) return routeTo('learn');
  const index = Math.max(0, subject.cards.findIndex((card) => card.id === cardId));
  const card = subject.cards[index];
  const alreadyLogged = (state.studyLog[localDayKey()] || []).includes(card.id);
  if (!alreadyLogged) saveState(markCardViewed(state, card.id));
  setHeading(subject.name, `${subject.icon} ${card.category}`);
  const progress = cardProgress(state, subject.id);
  const isLong = card.prompt.length > 15;
  page.innerHTML = `
    <div class="study-layout" style="--subject-color:${subject.color};--subject-soft:${subject.soft}">
      <article class="study-card">
        <header class="study-card-head"><span class="category-label">${escapeHtml(card.category)}</span><span class="card-count">${index + 1} / ${subject.cards.length}</span></header>
        <div class="study-card-body">
          <div class="study-card-content">
            <div class="study-emoji">${card.image}</div>
            <h2 class="study-prompt ${isLong ? 'is-long' : ''}">${escapeHtml(card.prompt)}</h2>
            ${card.pinyin ? `<p class="study-pinyin">${escapeHtml(card.pinyin)}</p>` : ''}
            ${card.choices ? `<div class="choice-grid">${card.choices.map((choice) => `<button class="choice-button ${selectedChoice === choice ? (choice === card.answer ? 'is-correct' : 'is-wrong') : ''}" data-answer-choice="${escapeHtml(choice)}">${escapeHtml(choice)}</button>`).join('')}</div>` : ''}
            ${answerVisible ? `<div class="answer-box"><strong>${escapeHtml(card.answer)}</strong><p>${escapeHtml(card.detail || '')}${card.story ? `\n${escapeHtml(card.story)}` : ''}</p></div>` : ''}
          </div>
        </div>
        <footer class="study-actions">
          <button class="ghost-button prev" data-step-card="-1" ${index === 0 ? 'disabled' : ''}>← 上一张</button>
          <button class="secondary-button speak-button" id="speakCard">🔊 读一读</button>
          <button class="ghost-button master-button ${state.mastered[card.id] ? 'is-mastered' : ''}" id="masterCard">${state.mastered[card.id] ? '✓ 已学会' : '🌱 我学会了'}</button>
          <button class="primary-button next" data-step-card="1">${index === subject.cards.length - 1 ? '完成学习' : '下一张 →'}</button>
        </footer>
      </article>
      <aside class="study-aside">
        <article class="aside-card"><h3>本主题进度</h3><div class="aside-progress-value">${progress.percent}%</div><p>已掌握 ${progress.mastered} 张。学会一张卡片可以获得 1 朵小红花。</p></article>
        <article class="aside-card"><h3>卡片导航</h3><div class="dot-nav">${subject.cards.map((item, itemIndex) => `<button class="${itemIndex === index ? 'is-current' : ''} ${state.mastered[item.id] ? 'is-mastered' : ''}" data-study-card="${item.id}" data-subject="${subject.id}" aria-label="第 ${itemIndex + 1} 张">${itemIndex + 1}</button>`).join('')}</div></article>
      </aside>
    </div>`;
}

function progressView() {
  setHeading('我的成长册', '看见每一天积累起来的进步');
  const overall = totalProgress(state);
  const streak = calculateStreak(state.checkins);
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const cells = monthCalendar(year, month, state.checkins);
  page.innerHTML = `
    <div class="progress-grid">
      <article class="panel">
        <h2>学习总进度</h2>
        <div class="big-progress">
          <div class="progress-ring" style="--progress:${overall.percent}"><span>${overall.percent}%</span></div>
          <div><h3>${overall.mastered} 张已经掌握</h3><p style="color:var(--muted);line-height:1.7">你已经浏览了 ${overall.viewed} 张知识卡。慢慢来，每一次重复都会让记忆更牢固。</p><button class="primary-button" data-route="learn">继续学习</button></div>
        </div>
        <div class="section-head"><div><h2>各科学习进度</h2></div></div>
        <div class="subject-progress-list">${subjects.map((subject) => {
          const progress = cardProgress(state, subject.id);
          return `<div class="progress-row"><span class="progress-row-name"><span>${subject.icon}</span>${subject.name}</span><span class="progress-track"><i style="width:${progress.percent}%;background:${subject.color}"></i></span><small>${progress.mastered}/${progress.total}</small></div>`;
        }).join('')}</div>
      </article>
      <article class="panel">
        <div class="calendar-head"><button class="ghost-button" data-calendar-step="-1" aria-label="上个月">←</button><h2 style="margin:0">${year} 年 ${month + 1} 月</h2><button class="ghost-button" data-calendar-step="1" aria-label="下个月">→</button></div>
        <div class="calendar-week"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
        <div class="calendar-grid">${cells.map((cell) => cell ? `<span class="calendar-day ${cell.checked ? 'is-checked' : ''} ${cell.isToday ? 'is-today' : ''}">${cell.day}</span>` : '<span></span>').join('')}</div>
        <div class="streak-callout"><span>🔥</span><div><b>连续打卡 ${streak} 天</b><p>${state.checkins[localDayKey()] ? '今天也完成啦，继续保持！' : '完成今日任务后，记得回来打卡。'}</p></div></div>
      </article>
    </div>`;
}

function rewardsView() {
  setHeading('小红花商店', '努力学习，也要好好庆祝');
  page.innerHTML = `
    <div class="reward-hero"><div><h2>把努力变成期待 🌼</h2><p>奖励由家长设置。兑换后，请一起约定兑现时间。</p></div><div class="reward-balance">🌼 ${state.flowers}</div></div>
    <div class="section-head"><div><h2>可以兑换</h2><p>选择一个喜欢的家庭奖励</p></div><button class="text-button" data-route="parent">家长管理 →</button></div>
    <div class="reward-grid">${state.rewards.map((reward) => `<article class="reward-card"><div class="reward-icon">${escapeHtml(reward.icon)}</div><h3>${escapeHtml(reward.name)}</h3><p>需要 ${reward.cost} 朵小红花 · 当前有 ${state.flowers} 朵</p><button class="${state.flowers >= reward.cost ? 'primary-button' : 'ghost-button'}" data-redeem="${escapeHtml(reward.id)}">${state.flowers >= reward.cost ? `兑换 · ${reward.cost} 🌼` : `还差 ${reward.cost - state.flowers} 朵`}</button></article>`).join('')}</div>
    <div class="section-head"><div><h2>最近兑换</h2></div></div>
    <div class="panel history-list">${state.redemptions.length ? state.redemptions.slice(0, 8).map((item) => `<div class="history-row"><span>${escapeHtml(item.icon)}</span><b>${escapeHtml(item.name)}</b><small>−${item.cost} 🌼 · ${formatDate(item.at)}</small></div>`).join('') : '<div class="empty-state"><span>🎁</span>还没有兑换记录，继续积攒小红花吧。</div>'}</div>`;
}

function parentView() {
  setHeading('家长小站', '设置目标、奖励与数据备份');
  page.innerHTML = `
    <div class="parent-grid">
      <article class="panel">
        <h2>孩子资料与学习偏好</h2>
        <form id="profileForm">
          <div class="form-grid">
            <div class="field"><label for="childName">孩子称呼</label><input id="childName" name="name" maxlength="10" value="${escapeHtml(state.profile.name)}"></div>
            <div class="field"><label for="childClass">班级或阶段</label><input id="childClass" name="className" maxlength="16" value="${escapeHtml(state.profile.className)}"></div>
            <div class="field"><label for="childAvatar">头像</label><select id="childAvatar" name="avatar">${['🐣','🐰','🐼','🦊','🐯','🐨'].map((avatar) => `<option ${avatar === state.profile.avatar ? 'selected' : ''}>${avatar}</option>`).join('')}</select></div>
            <div class="field"><label for="dailyGoal">每日卡片目标</label><input id="dailyGoal" name="dailyGoal" type="number" min="1" max="20" value="${state.settings.dailyGoal}"></div>
            <div class="field"><label for="textScale">文字大小</label><select id="textScale" name="textScale"><option value="small" ${state.settings.textScale === 'small' ? 'selected' : ''}>较小</option><option value="normal" ${state.settings.textScale === 'normal' ? 'selected' : ''}>标准</option><option value="large" ${state.settings.textScale === 'large' ? 'selected' : ''}>较大</option></select></div>
            <div class="field"><label for="reduceMotion">动画效果</label><select id="reduceMotion" name="reduceMotion"><option value="false" ${!state.settings.reduceMotion ? 'selected' : ''}>开启</option><option value="true" ${state.settings.reduceMotion ? 'selected' : ''}>减少动画</option></select></div>
          </div>
          <div class="button-row"><button class="primary-button" type="submit">保存设置</button></div>
        </form>
      </article>
      <article class="panel">
        <h2>自定义今日任务</h2>
        <form id="taskForm" class="form-grid"><div class="field"><label for="taskIcon">图标</label><select id="taskIcon" name="icon">${['⭐','📖','✍️','🎵','🧹','🛌'].map((icon) => `<option>${icon}</option>`).join('')}</select></div><div class="field"><label for="taskLabel">任务名称</label><input id="taskLabel" name="label" required maxlength="24" placeholder="例如：整理自己的书包"></div><div class="field full"><button class="secondary-button" type="submit">＋ 添加任务</button></div></form>
        <div class="custom-list">${state.customTasks.length ? state.customTasks.map((task) => `<div class="custom-row"><span>${escapeHtml(task.icon)}</span><b>${escapeHtml(task.label)}</b><button data-delete-task="${escapeHtml(task.id)}" aria-label="删除任务">删除</button></div>`).join('') : '<div class="empty-state"><span>📝</span>还没有自定义任务。</div>'}</div>
      </article>
      <article class="panel">
        <h2>自定义家庭奖励</h2>
        <form id="rewardForm" class="form-grid"><div class="field"><label for="rewardIcon">图标</label><select id="rewardIcon" name="icon">${['🎁','📚','🎲','🚲','🍿','🏕️'].map((icon) => `<option>${icon}</option>`).join('')}</select></div><div class="field"><label for="rewardCost">需要小红花</label><input id="rewardCost" name="cost" type="number" min="1" max="99" value="8"></div><div class="field full"><label for="rewardName">奖励名称</label><input id="rewardName" name="name" required maxlength="28" placeholder="例如：选择周末的家庭电影"></div><div class="field full"><button class="secondary-button" type="submit">＋ 添加奖励</button></div></form>
        <div class="custom-list">${state.rewards.map((reward) => `<div class="custom-row"><span>${escapeHtml(reward.icon)}</span><b>${escapeHtml(reward.name)} · ${reward.cost} 🌼</b><button data-delete-reward="${escapeHtml(reward.id)}" aria-label="删除奖励">删除</button></div>`).join('')}</div>
      </article>
      <article class="panel">
        <h2>数据与隐私</h2>
        <p class="privacy-note">学习记录仅保存在当前设备的浏览器中，不会上传。导出的备份是明文文件，可能包含孩子称呼、学习记录和奖励历史，请妥善保管，不要随意转发。</p>
        <div class="button-row"><button class="ghost-button" id="exportData">导出备份</button><button class="ghost-button" id="importData">导入备份</button><button class="danger-button" id="resetData">清空全部记录</button></div>
        <div class="section-head"><div><h3>安装到设备</h3></div></div>
        <p style="color:var(--muted);font-size:.84rem;line-height:1.75">iPhone / iPad：使用 Safari 打开，点“分享”→“添加到主屏幕”。<br>Mac：在 Safari 中点“分享”→“添加到程序坞”。</p>
      </article>
    </div>`;
}

function render() {
  ensureCurrentDay();
  syncChrome();
  switch (route.name) {
    case 'today': todayView(); break;
    case 'learn': learnView(); break;
    case 'subject': subjectView(route.subjectId); break;
    case 'study': studyView(route.subjectId, route.cardId); break;
    case 'progress': progressView(); break;
    case 'rewards': rewardsView(); break;
    case 'parent': parentView(); break;
    default: routeTo('today');
  }
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.route) return routeTo(target.dataset.route);
  if (target.dataset.openSubject) return routeTo('subject', { subjectId: target.dataset.openSubject });
  if (target.dataset.startSubject) {
    const subject = findSubject(target.dataset.startSubject);
    return routeTo('study', { subjectId: subject.id, cardId: subject.cards[0].id });
  }
  if (target.dataset.studyCard) return routeTo('study', { subjectId: target.dataset.subject, cardId: target.dataset.studyCard });
  if (target.dataset.category) { categoryFilter = target.dataset.category; return render(); }
  if (target.dataset.stepCard) {
    const subject = findSubject(route.subjectId);
    const index = subject.cards.findIndex((card) => card.id === route.cardId);
    const nextIndex = index + Number(target.dataset.stepCard);
    if (nextIndex >= subject.cards.length) {
      flowerBurst(18); toast('这一组学习完成啦！'); return routeTo('subject', { subjectId: subject.id });
    }
    if (nextIndex >= 0) return routeTo('study', { subjectId: subject.id, cardId: subject.cards[nextIndex].id });
  }
  if (target.id === 'speakCard') {
    const subject = findSubject(route.subjectId); const card = subject.cards.find((item) => item.id === route.cardId);
    return speak(card.speak || `${card.prompt}。${card.answer}`, card.lang || 'zh-CN');
  }
  if (target.id === 'masterCard') {
    const cardId = route.cardId; const mastered = !state.mastered[cardId]; const result = setCardMastered(state, cardId, mastered);
    saveState(result.state); if (result.earned) { flowerBurst(); toast('学会一张，获得 1 朵小红花 🌼'); } else toast('已移回“学习中”');
    return render();
  }
  if (target.dataset.answerChoice) {
    if (selectedChoice !== null) return;
    const subject = findSubject(route.subjectId); const card = subject.cards.find((item) => item.id === route.cardId); const choice = target.dataset.answerChoice;
    selectedChoice = choice; answerVisible = true; saveState(recordAnswer(state, card.id, choice === card.answer));
    toast(choice === card.answer ? '答对啦，真会观察！' : '很接近了，看看提示再试一次');
    if (choice === card.answer) flowerBurst(8);
    return render();
  }
  if (target.dataset.toggleTask) {
    const result = toggleTask(state, target.dataset.toggleTask); saveState(result.state); toast(result.earned > 0 ? '完成任务，获得 1 朵小红花 🌼' : result.completed ? '任务已完成' : '已取消完成'); return render();
  }
  if (target.id === 'checkinButton') {
    ensureCurrentDay();
    const completion = taskCompletion(state);
    if (completion.completed === 0 && studyCount(state) === 0) return toast('先完成一项学习或生活任务，再来打卡吧');
    const result = checkIn(state); saveState(result.state); if (result.earned) { flowerBurst(24); toast('今日打卡成功，获得 2 朵小红花！'); } return render();
  }
  if (target.dataset.calendarStep) { calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + Number(target.dataset.calendarStep), 1); return render(); }
  if (target.dataset.redeem) {
    const result = redeemReward(state, target.dataset.redeem); if (!result.ok) return toast(result.reason);
    saveState(result.state); flowerBurst(20); toast(`兑换成功：${result.reward.name}`); return render();
  }
  if (target.dataset.deleteTask) { state.customTasks = state.customTasks.filter((task) => task.id !== target.dataset.deleteTask); delete state.dailyTasks[target.dataset.deleteTask]; saveState(state); return render(); }
  if (target.dataset.deleteReward) { state.rewards = state.rewards.filter((reward) => reward.id !== target.dataset.deleteReward); saveState(state); return render(); }
  if (target.id === 'exportData') return exportData();
  if (target.id === 'importData') return importInput.click();
  if (target.id === 'resetData') {
    if (!window.confirm('确定清空所有学习进度、小红花和设置吗？这个操作无法撤销。')) return;
    localStorage.removeItem(STORAGE_KEY); state = createDefaultState(); saveState(state); toast('已经恢复为全新工作台'); return routeTo('today');
  }
});

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  if (event.target.id === 'profileForm') {
    state.profile = { name: String(data.name).trim() || '小朋友', className: String(data.className).trim() || '幼小衔接班', avatar: data.avatar };
    state.settings.dailyGoal = Math.min(20, Math.max(1, Number(data.dailyGoal) || 5));
    state.settings.textScale = data.textScale; state.settings.reduceMotion = data.reduceMotion === 'true';
    saveState(state); toast('设置已经保存'); return render();
  }
  if (event.target.id === 'taskForm') {
    state.customTasks.push({ id: `task-${Date.now()}`, icon: data.icon, label: String(data.label).trim(), type: 'manual', target: 1 });
    saveState(state); toast('新任务已加入今日计划'); return render();
  }
  if (event.target.id === 'rewardForm') {
    state.rewards.push({ id: `reward-${Date.now()}`, icon: data.icon, name: String(data.name).trim(), cost: Math.min(99, Math.max(1, Number(data.cost) || 1)) });
    saveState(state); toast('新奖励已经上架'); return render();
  }
});

soundToggle.addEventListener('click', () => { state.settings.sound = !state.settings.sound; saveState(state); toast(state.settings.sound ? '语音已打开' : '语音已关闭'); });

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `小芽学习备份-${localDayKey()}.json`; link.click(); URL.revokeObjectURL(link.href); toast('备份已经导出');
}

importInput.addEventListener('change', async () => {
  const file = importInput.files?.[0]; if (!file) return;
  if (file.size > 1_000_000) { toast('备份文件过大，无法导入'); importInput.value = ''; return; }
  try { const imported = safeImportedState(JSON.parse(await file.text())); saveState(imported); toast('备份导入成功'); routeTo('today'); }
  catch (error) { toast(error.message || '无法读取这个备份'); }
  finally { importInput.value = ''; }
});

window.addEventListener('keydown', (event) => {
  if (route.name !== 'study' || ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
  if (event.key === 'ArrowRight') document.querySelector('[data-step-card="1"]')?.click();
  if (event.key === 'ArrowLeft') document.querySelector('[data-step-card="-1"]')?.click();
  if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); answerVisible = !answerVisible; render(); }
});

document.addEventListener('visibilitychange', () => { if (!document.hidden && ensureCurrentDay()) render(); });
window.addEventListener('pageshow', () => { if (ensureCurrentDay()) render(); });
setInterval(() => { if (ensureCurrentDay()) render(); }, 60_000);

if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(() => {});

syncChrome();
render();
