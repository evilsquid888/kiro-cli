import { test, expect } from '@playwright/test';

test.describe('Kiro CLI Tutorial', () => {

  test('page loads with sidebar and content', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#sidebar h2')).toHaveText('Kiro CLI Tutorial');
    const count = await page.locator('#nav-list li').count();
    expect(count).toBeGreaterThanOrEqual(15);
    await expect(page.locator('.section.active')).toHaveCount(1);
  });

  test('first section is visible by default', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#section-intro')).toHaveClass(/active/);
    await expect(page.locator('#section-intro h1')).toContainText('Getting Started');
  });

  test('navigation switches sections', async ({ page }) => {
    await page.goto('/');
    await page.click('#nav-list a[data-id="cmd-tools"]');
    await expect(page.locator('#section-cmd-tools')).toHaveClass(/active/);
    await expect(page.locator('#section-intro')).not.toHaveClass(/active/);
    await expect(page.locator('#nav-list a[data-id="cmd-tools"]')).toHaveClass(/active/);
  });

  test('all sections have content', async ({ page }) => {
    await page.goto('/');
    const navLinks = page.locator('#nav-list a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(15);
    for (let i = 0; i < count; i++) {
      const id = await navLinks.nth(i).getAttribute('data-id');
      await navLinks.nth(i).click();
      const section = page.locator(`#section-${id}`);
      await expect(section).toHaveClass(/active/);
      const h1 = section.locator('h1');
      await expect(h1).toBeVisible();
      const text = await section.textContent();
      expect(text.length).toBeGreaterThan(50);
    }
  });

  test('mark complete toggles and persists in localStorage', async ({ page }) => {
    await page.goto('/');
    // Mark first section complete
    await page.click('#section-intro button.mark-done');
    await expect(page.locator('#section-intro button.mark-done')).toHaveClass(/completed/);
    await expect(page.locator('#section-intro button.mark-done')).toContainText('Completed');
    // Check localStorage
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('kiro-tutorial-progress')));
    expect(stored.intro).toBe(true);
    // Check progress bar updated
    const progressText = await page.locator('#progress-text').textContent();
    expect(progressText).toContain('1/');
    // Reload and verify persistence
    await page.reload();
    await expect(page.locator('#section-intro button.mark-done')).toHaveClass(/completed/);
    const checkIcon = page.locator('#nav-list a[data-id="intro"] .check');
    await expect(checkIcon).toHaveText('✓');
  });

  test('mark complete can be toggled off', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.click('#section-intro button.mark-done');
    await expect(page.locator('#section-intro button.mark-done')).toHaveClass(/completed/);
    // Click the button again — render() rebuilds DOM so re-query
    await page.locator('#section-intro button.mark-done').click();
    await page.waitForTimeout(200);
    // After toggle off, button should say "Mark Complete"
    await expect(page.locator('#section-intro button.mark-done')).toContainText('Mark Complete');
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('kiro-tutorial-progress')));
    expect(stored.intro).toBe(false);
  });

  test('next/previous buttons navigate correctly', async ({ page }) => {
    await page.goto('/');
    // First section should have Next but no Previous
    await expect(page.locator('#section-intro button[data-nav="prev"]')).toHaveCount(0);
    await expect(page.locator('#section-intro button[data-nav="next"]')).toHaveCount(1);
    // Click Next
    await page.click('#section-intro button[data-nav="next"]');
    await expect(page.locator('#section-slash-overview')).toHaveClass(/active/);
    // Now should have both Previous and Next
    await expect(page.locator('#section-slash-overview button[data-nav="prev"]')).toHaveCount(1);
    await expect(page.locator('#section-slash-overview button[data-nav="next"]')).toHaveCount(1);
    // Click Previous
    await page.click('#section-slash-overview button[data-nav="prev"]');
    await expect(page.locator('#section-intro')).toHaveClass(/active/);
  });

  test('hash navigation works', async ({ page }) => {
    await page.goto('/#cmd-code');
    await expect(page.locator('#section-cmd-code')).toHaveClass(/active/);
    await expect(page.locator('#section-cmd-code h1')).toContainText('Code Intelligence');
  });

  test('progress bar reflects completion', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    // Initially 0%
    await expect(page.locator('#progress-text')).toContainText('0%');
    // Complete 3 sections
    const sections = ['intro', 'slash-overview', 'cmd-help'];
    for (const id of sections) {
      await page.click(`#nav-list a[data-id="${id}"]`);
      await page.click(`#section-${id} button.mark-done`);
    }
    const text = await page.locator('#progress-text').textContent();
    expect(text).toContain('3/');
  });

  test('comparison table has Claude Code mappings', async ({ page }) => {
    await page.goto('/#comparison');
    await expect(page.locator('#section-comparison')).toHaveClass(/active/);
    const table = page.locator('#section-comparison table.comparison');
    await expect(table).toBeVisible();
    const rows = table.locator('tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(15);
  });

  test('steering section covers all scopes', async ({ page }) => {
    await page.goto('/#steering');
    const content = await page.locator('#section-steering').textContent();
    expect(content).toContain('Workspace');
    expect(content).toContain('Global');
    expect(content).toContain('Team');
    expect(content).toContain('product.md');
    expect(content).toContain('tech.md');
    expect(content).toContain('structure.md');
    expect(content).toContain('AGENTS.md');
  });

  test('agent config section covers all fields', async ({ page }) => {
    await page.goto('/#agents-config');
    const content = await page.locator('#section-agents-config').textContent();
    const fields = ['name','description','prompt','mcpServers','tools','toolAliases',
      'allowedTools','toolsSettings','resources','hooks','model','keyboardShortcut','welcomeMessage'];
    for (const f of fields) {
      expect(content).toContain(f);
    }
  });

  test('settings section lists key settings', async ({ page }) => {
    await page.goto('/#settings');
    const content = await page.locator('#section-settings').textContent();
    expect(content).toContain('chat.enableThinking');
    expect(content).toContain('chat.enableKnowledge');
    expect(content).toContain('chat.enableCheckpoint');
    expect(content).toContain('chat.defaultModel');
  });

  test('no broken sections (all nav links have matching content)', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('#nav-list a');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const id = await links.nth(i).getAttribute('data-id');
      const section = page.locator(`#section-${id}`);
      await expect(section).toHaveCount(1);
    }
  });
});
