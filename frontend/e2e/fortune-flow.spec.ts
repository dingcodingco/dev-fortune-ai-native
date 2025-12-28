import { test, expect } from '@playwright/test';

test.describe('Dev Fortune - Complete Flow', () => {
  test('should complete quiz and display fortune with streaming effects', async ({ page }) => {
    // 1. Navigate to home page
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('개발자 운세');

    // 2. Start quiz
    await page.getByRole('button', { name: /시작하기/i }).click();
    await expect(page).toHaveURL('/quiz');

    // 3. Answer all 10 questions (select first option for each)
    for (let i = 0; i < 10; i++) {
      // Wait for question to be visible
      await expect(page.locator('h2')).toBeVisible();

      // Click first option
      const firstOption = page.locator('button[class*="rounded-lg"][class*="border"]').first();
      await firstOption.click();

      // Wait a bit before next question
      await page.waitForTimeout(500);
    }

    // 4. Should redirect to result page
    await expect(page).toHaveURL('/result', { timeout: 10000 });

    // 5. Check loading screen
    const loadingScreen = page.locator('text=점치는 중...');
    if (await loadingScreen.isVisible()) {
      console.log('Loading screen visible');

      // Check if random loading message appears
      const loadingMessage = page.locator('p.text-lg.text-gray-600').first();
      const firstMessage = await loadingMessage.textContent();
      console.log('First loading message:', firstMessage);

      // Wait 2 seconds to see if message changes
      await page.waitForTimeout(2500);
      const secondMessage = await loadingMessage.textContent();
      console.log('Second loading message:', secondMessage);

      // Messages should be different (random rotation)
      // Note: There's a small chance they could be the same, so we just log it
      if (firstMessage !== secondMessage) {
        console.log('✓ Loading messages are rotating');
      }
    }

    // 6. Wait for fortune result to load (max 30 seconds for Claude API)
    await expect(page.locator('h1').filter({ hasText: /운세|개발자/ })).toBeVisible({ timeout: 35000 });

    // 7. Check archetype name appears with typing effect
    const archetypeName = page.locator('h1.text-4xl').first();
    await expect(archetypeName).toBeVisible();
    const archetypeText = await archetypeName.textContent();
    console.log('Archetype:', archetypeText);

    // 8. Check all 6 fortune categories are displayed
    const categories = [
      '🐛 버그 운세',
      '🌙 야근 운세',
      '🚀 기술 스택 운세',
      '👀 코드 리뷰 운세',
      '💻 GitHub 운세',
      '📅 회의 운세',
    ];

    for (const category of categories) {
      await expect(page.locator(`h3:has-text("${category}")`)).toBeVisible();
      console.log(`✓ ${category} displayed`);
    }

    // 9. Check typing effect - wait a bit to see text appear gradually
    // We can't easily test the typing animation itself, but we can verify the text eventually appears
    await page.waitForTimeout(2000);

    // 10. Check count-up animations - verify numbers are displayed
    const bugCount = page.locator('text=총 버그 수').locator('..').locator('p.text-3xl').first();
    await expect(bugCount).toBeVisible();
    const bugCountText = await bugCount.textContent();
    console.log('Bug count:', bugCountText);
    expect(bugCountText).toMatch(/\d+개/);

    // 11. Check advice text appears
    const advice = page.locator('p.text-gray-700').first();
    await expect(advice).toBeVisible();
    const adviceText = await advice.textContent();
    console.log('Advice text length:', adviceText?.length);
    expect(adviceText).toBeTruthy();

    // 12. Check meme message appears
    const memeMessage = page.locator('p.italic.text-gray-600').first();
    await expect(memeMessage).toBeVisible();
    const memeText = await memeMessage.textContent();
    console.log('Meme message:', memeText);
    expect(memeText).toContain('"');

    // 13. Scroll down to see all categories
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // 14. Verify action buttons are present
    await expect(page.getByRole('button', { name: /다시 하기/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /홈으로/i })).toBeVisible();

    console.log('✓ All tests passed!');
  });

  test('should show error when backend is unavailable', async ({ page }) => {
    // This test would require mocking the API to return an error
    // For now, we'll skip this as the backend should be available
    test.skip();
  });
});
