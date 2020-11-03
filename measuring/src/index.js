const puppeteer = require("puppeteer");
const yargs = require("yargs");

const App = {
  react: {
    name: 'react',
    url: 'https://gilesv.github.io/todomvc-react',
  },
  reactron: {
    name: 'reactron',
    url: 'https://gilesv.github.io/todomvc-reactron',
  },
  dev: {
    name: 'dev',
    url: 'http://localhost:8080',
  },
};

async function main() {
  let { app, scenario, todos, screen, rounds } = yargs
    .option('app', { choices: [App.react.name, App.reactron.name, App.dev.name], type: 'string' })
    .option('scenario', { alias: 's', choices: ['a', 'b', 'c', 'd', 'e'] })
    .option('todos', { default: 10, type: 'number' })
    .option('screen', { type: 'boolean', default: false })
    .option('rounds', { default: 1, type: 'number' }).argv;

  let browser = await puppeteer.launch({ headless: true });

  switch (scenario) {
    case 'a':
      for (let i = 0; i < rounds; i++) {
        await scenarioA(browser, App[app], todos, i+1, screen);
      }
      break;
    case 'b':
      for (let i = 0; i < rounds; i++) {
        await scenarioB(browser, App[app], todos, i+1, screen);
      }
      break;
    case 'c':
      for (let i = 0; i < rounds; i++) {
        await scenarioC(browser, App[app], todos, i+1, screen);
      }
      break;
    case 'd':
      for (let i = 0; i < rounds; i++) {
        await scenarioD(browser, App[app], todos, i+1, screen);
      }
      break;
    case 'e':
      for (let i = 0; i < rounds; i++) {
        await scenarioE(browser, App[app], todos, i+1, screen);
      }
      break;
  }

  browser.close();
}

const resultsPath = (sc, app, todos, round) => {
  return `results/${sc}/${app.name}-${todos}-todos-${round}.json`;
}

/**
 * 
 * @param {puppeteer.Browser} browser 
 */
async function scenarioA(browser, app, todos, round = 1, screenshots = false) {
  console.log(`\n#${round} Running Sc#A for ${app.name} with ${todos} todos...`);

  let page = await browser.newPage();

  await page.tracing.start({ path: resultsPath('A', app, todos, round), screenshots });
  Pasta sem nome
  await page.goto(`${app.url}?todos=${todos}`);
  await page.waitForSelector('input.new-todo');

  await page.waitForTimeout(1000);
  await page.tracing.stop();

  console.log(`#${round} Done: Sc#A for ${app.name} with ${todos} todos`);
}

async function scenarioB(browser, app, todos, round = 1, screenshots = false) {
  console.log(`\n#${round} Running Sc#B for ${app.name} with ${todos} todos...`);

  let page = await browser.newPage();

  await page.tracing.start({ path: resultsPath('B', app, todos, round), screenshots });
  
  let input = 'input.new-todo';
  await page.goto(`${app.url}`);
  await page.waitForSelector(input);

  for (let i = 0; i < todos; i++) {
    await page.focus(input);
    await page.type(input, `Todo ${i}`);
    await page.keyboard.press('Enter');
  }

  await page.tracing.stop();

  console.log(`#${round}Done: Sc#B for ${app.name} with ${todos} todos`);
}

async function scenarioC(browser, app, todos, round = 1, screenshots = false) {
  console.log(`\n#${round} Running Sc#C for ${app.name} with ${todos} todos...`);

  let page = await browser.newPage();
  await page.goto(`${app.url}?todos=${todos}`);

  await page.tracing.start({ path: resultsPath('C', app, todos, round), screenshots });

  let todoElements = await page.$$("ul.todo-list li");

  for (let todoElement of todoElements) {
    await todoElement.click();
    let input = await todoElement.$("input.edit");
    await input.focus();
    await input.type(' updated');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(250);
  }
  await page.waitForTimeout(250);
  await page.tracing.stop();

  console.log(`#${round} Done: Sc#C for ${app.name} with ${todos} todos`);
}

async function scenarioD(browser, app, todos, round = 1, screenshots = false) {
  console.log(`\n#${round} Running Sc#D for ${app.name} with ${todos} todos...`);

  let page = await browser.newPage();
  await page.goto(`${app.url}?todos=${todos}`);
  await page.waitForSelector('input.new-todo');

  // Toggle
  let todoElements = await page.$$(".todo-list li");
  for (let [i, todoElement] of todoElements.entries()) {
    if (i % 3 === 0) {
      await page.evaluate((i) => {
        let a = document.querySelector(`.todo-list li:nth-child(${i+1}) input.toggle`);
        if (a) a.click();
      }, i);
      await page.waitForTimeout(250);
    }
  }

  // Filter
  await page.tracing.start({ path: resultsPath('D', app, todos, round), screenshots });

  await page.click('.filters li:nth-child(2)'); // Active
  await page.waitForTimeout(250);

  await page.click('.filters li:nth-child(3)'); // Completed
  await page.waitForTimeout(250);

  await page.tracing.stop();

  console.log(`#${round} Done: Sc#D for ${app.name} with ${todos} todos`);
}

async function scenarioE(browser, app, todos, round = 1, screenshots = false) {
  console.log(`\n#${round} Running Sc#E for ${app.name} with ${todos} todos...`);

  let page = await browser.newPage();
  await page.goto(`${app.url}?todos=${todos}`);

  await page.tracing.start({ path: resultsPath('E', app, todos, round), screenshots });

  for (let i = 0; i < todos; i++) {
    await page.evaluate(() => {
      let destroyTodo = document.querySelector(".todo-list li:last-child button.destroy");
      if (destroyTodo) destroyTodo.click();
    });
    await page.waitForTimeout(50);
  }
  await page.tracing.stop();

  console.log(`#${round} Done: Sc#E for ${app.name} with ${todos} todos`);
}

main();
