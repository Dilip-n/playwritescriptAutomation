const { test, expect } = require("@playwright/test");
const { airQualityCreds } = require("../../config");
const excel = require("exceljs");
test("test", async ({ page }) => {
  await page.goto(airQualityCreds.host + "/");

  await page.goto(airQualityCreds.host + "/login");

  await page.click('input[type="username"]');

  await page.fill('input[type="username"]', airQualityCreds.username);

  await page.click('input[type="password"]');

  await page.fill('input[type="password"]', airQualityCreds.password);

  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://35.206.94.22:7006/dashboard' }*/),
    page.click('button:has-text("Login")'),
  ]);
  let workbook = new excel.Workbook();
  let worksheet;
  const url = await page.url();
  let value = "";
  if (url === `${airQualityCreds.host}/dashboard`) {
    value = "UP";
  } else {
    value = "Down";
  }

  console.log("Value", value);
  await workbook.xlsx.readFile("assets/DAS1.xlsx");
  worksheet = workbook.getWorksheet("DAS");
  let cell = worksheet.getCell("E9");
  cell.value = value;

  if (value === "UP") {
    let cell = worksheet.getCell("F9");
    cell.value = "YES";
  } else {
    let cell = worksheet.getCell("F9");
    cell.value = "No";
  }

  await page.click('button:has-text("Sites")');

  await expect(page).toHaveURL("http://35.206.94.22:7006/sites");

  await page.click("text=Al Rayyan, Qatar");

  await page.waitForLoadState("networkidle");
  const locator1 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]/span[1]"
  );
  const locator_innertext1 = await locator1.innerText();

  console.log(`QEERI1 is ${locator_innertext1}`);

  await page.waitForLoadState("networkidle");
  const locator2 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]/span[1]"
  );
  const locator_innertext2 = await locator2.innerText();
  console.log(`QEERI2 is ${locator_innertext2}`);

  await page.waitForLoadState("networkidle");
  const locator3 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]/span[1]"
  );
  const locator_innertext3 = await locator3.innerText();
  console.log(`QEERI3 is ${locator_innertext3}`);

  let cell1 = worksheet.getCell("G9");
  cell1.value =
    `QEERI1 is ${locator_innertext1} ` +
    `QEERI2 is ${locator_innertext2} ` +
    `QEERI3 is ${locator_innertext3} `;

  const locator4 = page.locator(
    "//html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext4 = await locator4.innerText();
  console.log("last updated time", locator_innertext4);

  let cell5 = worksheet.getCell("H9");
  cell5.value = locator_innertext4;

  workbook.xlsx.writeFile("assets/DAS1.xlsx").then(() => {
    console.log("sendmail");
  });

  await page.click('button:has-text("Welcome QEERI,")');
  await page.waitForLoadState("networkidle");
  await page.click('button[role="menuitem"]:has-text("logout")');
  await expect(page).toHaveURL("http://35.206.94.22:7006/login");

  await page.close;
});
