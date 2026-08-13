const VOICE_PREFERENCES = {
  zh: ['Tingting', '婷婷', 'Li-Mu', 'Lili', 'Meijia', 'Sin-ji', 'Xiaoxiao', '晓晓'],
  en: ['Samantha', 'Ava', 'Allison', 'Susan', 'Tom', 'Alex', 'Karen', 'Daniel']
};

function languageFamily(lang = '') {
  return String(lang).toLowerCase().split('-')[0];
}

export function normalizeSpeechText(text, lang = 'zh-CN') {
  let normalized = String(text ?? '')
    .trim()
    .replace(/([.!?。！？；])\s*\n+\s*/g, '$1 ')
    .replace(/\s*\n+\s*/g, '。')
    .replace(/。{2,}/g, '。')
    .replace(/\s+/g, ' ');

  if (languageFamily(lang) === 'zh') {
    normalized = normalized
      .replace(/\s*\+\s*/g, ' 加 ')
      .replace(/\s*[−–]\s*/g, ' 减 ')
      .replace(/\s+-\s+/g, ' 减 ')
      .replace(/\s*=\s*/g, ' 等于 ')
      .replace(/\s*>\s*/g, ' 大于 ')
      .replace(/\s*<\s*/g, ' 小于 ')
      .replace(/\s*→\s*/g, '，接下来是，')
      .replace(/\?/g, '？')
      .replace(/\s+/g, ' ')
      .trim();
  }

  return normalized;
}

export function selectSpeechVoice(voices = [], lang = 'zh-CN') {
  const requested = String(lang).toLowerCase();
  const family = languageFamily(requested);
  const exactMatches = voices.filter((voice) => String(voice.lang).toLowerCase() === requested);
  const familyMatches = voices.filter((voice) => languageFamily(voice.lang) === family);
  const candidates = exactMatches.length ? exactMatches : familyMatches;
  if (!candidates.length) return null;

  const preferences = VOICE_PREFERENCES[family] || [];
  return [...candidates].sort((left, right) => {
    const score = (voice) => {
      const preferredIndex = preferences.findIndex((name) => String(voice.name).toLowerCase().includes(name.toLowerCase()));
      return (preferredIndex >= 0 ? 100 - preferredIndex : 0)
        + (voice.localService ? 20 : 0)
        + (voice.default ? 5 : 0);
    };
    return score(right) - score(left);
  })[0];
}

export function speechSettings(lang = 'zh-CN') {
  return {
    rate: languageFamily(lang) === 'zh' ? 0.9 : 0.88,
    pitch: 1,
    volume: 1
  };
}
