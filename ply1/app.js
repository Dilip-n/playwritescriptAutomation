const { test, expect } = require("@playwright/test");

login = async (host, username, password) => {
  // Go to boschAppCreds.host/user/login
  await page.goto(host);

  // Click [placeholder="username"]
  await page.click('[placeholder="username"]');

  // Fill [placeholder="username"]
  await page.fill('[placeholder="username"]', username);

  // Click [placeholder="password"]
  await page.click('[placeholder="password"]');

  // Fill [placeholder="password"]
  await page.fill('[placeholder="password"]', password);

  // Click button:has-text("Login")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'boschAppCreds.host/dashboard' }*/),
    page.click('button:has-text("Login")'),
  ]);

  return; // The function returns the product of p1 and p2
};

module.exports = login;
