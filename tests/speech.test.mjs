import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSpeechText, selectSpeechVoice, speechSettings } from '../speech.mjs';

test('normalizes poetry pauses without doubling punctuation', () => {
  assert.equal(
    normalizeSpeechText('床前明月光，疑是地上霜。\n举头望明月，低头思故乡。'),
    '床前明月光，疑是地上霜。 举头望明月，低头思故乡。'
  );
});

test('turns math symbols into natural Chinese speech', () => {
  assert.equal(normalizeSpeechText('4 + 3 = ?'), '4 加 3 等于 ？');
  assert.equal(normalizeSpeechText('8 > 6'), '8 大于 6');
});

test('prefers a known local voice in the requested language', () => {
  const voices = [
    { name: 'Generic Chinese', lang: 'zh-CN', localService: true, default: true },
    { name: 'Tingting', lang: 'zh-CN', localService: true, default: false },
    { name: 'Samantha', lang: 'en-US', localService: true, default: false }
  ];
  assert.equal(selectSpeechVoice(voices, 'zh-CN').name, 'Tingting');
  assert.equal(selectSpeechVoice(voices, 'en-US').name, 'Samantha');
});

test('uses natural voice settings', () => {
  assert.deepEqual(speechSettings('zh-CN'), { rate: 0.9, pitch: 1, volume: 1 });
  assert.deepEqual(speechSettings('en-US'), { rate: 0.88, pitch: 1, volume: 1 });
});
