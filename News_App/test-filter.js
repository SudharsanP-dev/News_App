// Runnable self-check for 18+ sensitive content filter
import assert from 'node:assert';
import { isSensitiveArticle } from './src/services/newsAPI.js';

// Test Cases that SHOULD be blocked (18+ / adult / sensitive content)
const sensitiveCases = [
  { title: 'New porn video leaks online causing outrage' },
  { title: 'Top 10 adult film stars in 2025' },
  { title: 'Controversial OnlyFans creator signs streaming deal' },
  { title: 'Celebrity private leaked nudes exposed by hacker' },
  { title: 'Undercover investigation busts illegal escort service and brothel' },
  { title: 'Police arrest suspect in brutal rape case' },
  { title: 'Viral explicit sex video circulated on social media' },
  { title: 'Hentai and erotic animation market surges' },
  { title: 'Terror group releases graphic beheading video' },
  { title: 'Tech news', category: 'adult' },
  { title: 'Daily briefing', category: ['news', 'nsfw'] },
  { title: 'Underground stripclub raided by authorities' }
];

// Test Cases that MUST NOT be blocked (Safe / regular news)
const safeCases = [
  { title: 'NASA lands new rover on Mars exploration mission' },
  { title: 'Middlesex university announces research breakthrough' },
  { title: 'Tech giant reveals AI chips with improved performance' },
  { title: 'Local sports team wins national championship final' },
  { title: 'Stock market hits all-time high amid economic growth' },
  { title: 'Scientists study sex chromosomes in biological research' }
];

console.log('Running 18+ sensitive content filter verification tests...');

for (const testCase of sensitiveCases) {
  const blocked = isSensitiveArticle(testCase);
  assert.strictEqual(blocked, true, `Expected sensitive article to be BLOCKED: "${testCase.title || testCase.category}"`);
}

for (const testCase of safeCases) {
  const blocked = isSensitiveArticle(testCase);
  assert.strictEqual(blocked, false, `Expected safe article to PASS: "${testCase.title}"`);
}

console.log(' All 18+ sensitive content filter tests PASSED successfully!');
