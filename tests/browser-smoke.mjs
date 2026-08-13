import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const playwright = await import('playwright');
const { chromium } = playwright;

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const outputDir = '/tmp/sprout-browser-qa';
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
});
const results = [];

async function runViewport(name, viewport) {
  const context = await browser.newContext({ viewport, locale: 'zh-CN' });
  const page = await context.newPage();
  const errors = [];
  const failedRequests = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('requestfailed', (request) => failedRequests.push(`${request.method()} ${request.url()}`));

  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${outputDir}/${name}-today.png`, fullPage: true });
  assert.match(await page.locator('h1').textContent(), /今日计划/);
  assert.equal(await page.locator('.subject-tile').count(), 4);
  assert.ok(await page.locator('body').evaluate((element) => element.scrollWidth <= element.clientWidth + 1), `${name}: body overflows horizontally`);

  await page.locator('[data-route="learn"]').first().click();
  assert.equal(await page.locator('.subject-tile').count(), 7);
  await page.locator('[data-open-subject="literacy"]').click();
  assert.equal(await page.locator('.card-preview').count(), 8);
  await page.locator('[data-study-card="literacy-sun"]').click();
  assert.match(await page.locator('.study-prompt').textContent(), /日/);
  await page.locator('#masterCard').click();
  assert.match(await page.locator('#masterCard').textContent(), /已学会/);
  assert.equal(await page.locator('#navFlowers').textContent(), '1');
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('#navFlowers').textContent(), '1');
  await page.locator('[data-route="learn"]').first().click();
  await page.locator('[data-open-subject="literacy"]').click();
  assert.equal(await page.locator('[data-study-card="literacy-sun"]').getAttribute('class'), 'card-preview is-mastered');

  await page.locator('[data-route="progress"]').first().click();
  assert.match(await page.locator('h1').textContent(), /成长册/);
  await page.locator('[data-route="parent"]').first().click();
  assert.match(await page.locator('h1').textContent(), /家长小站/);
  await page.screenshot({ path: `${outputDir}/${name}-parent.png`, fullPage: true });
  assert.ok(await page.locator('body').evaluate((element) => element.scrollWidth <= element.clientWidth + 1), `${name}: parent page overflows horizontally`);

  const serviceWorkerReady = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    await navigator.serviceWorker.ready;
    return Boolean(navigator.serviceWorker.controller || (await navigator.serviceWorker.getRegistration()));
  });
  assert.equal(serviceWorkerReady, true);
  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  assert.match(await page.locator('h1').textContent(), /今日计划/);
  await context.setOffline(false);
  results.push({ name, errors, failedRequests });
  await context.close();
}

await runViewport('desktop-1440', { width: 1440, height: 1000 });
await runViewport('tablet-768', { width: 768, height: 1024 });
await runViewport('mobile-375', { width: 375, height: 812 });
await browser.close();

for (const result of results) {
  assert.deepEqual(result.errors, [], `${result.name}: console errors: ${result.errors.join('; ')}`);
  const unexpectedFailures = result.failedRequests.filter((request) => !request.startsWith('GET http://127.0.0.1:4173'));
  assert.deepEqual(unexpectedFailures, [], `${result.name}: failed requests: ${unexpectedFailures.join('; ')}`);
}

console.log(JSON.stringify({ ok: true, outputDir, viewports: results.map(({ name }) => name) }, null, 2));
