import test from 'node:test';
import assert from 'node:assert/strict';
import { allCards, getSubjects, gradeLevels } from '../content.mjs';

test('offers foundation, grade one and grade two curricula', () => {
  assert.deepEqual(gradeLevels.map((grade) => grade.id), ['foundation', 'grade1', 'grade2']);
  assert.equal(getSubjects('grade1').length, 7);
  assert.equal(getSubjects('grade2').length, 7);
  assert.ok(getSubjects('grade1').every((subject) => subject.cards.length >= 8));
  assert.ok(getSubjects('grade2').every((subject) => subject.cards.length >= 8));
});

test('all cards have unique identifiers and complete content', () => {
  const ids = allCards.map((card) => card.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const card of allCards) {
    assert.ok(card.prompt, `${card.id} is missing a prompt`);
    assert.ok(card.answer, `${card.id} is missing an answer`);
    assert.ok(card.detail, `${card.id} is missing an explanation`);
  }
});

test('every multiple-choice card includes its answer', () => {
  for (const card of allCards.filter((item) => item.choices)) {
    assert.ok(card.choices.includes(card.answer), `${card.id} does not include its answer in choices`);
  }
});
