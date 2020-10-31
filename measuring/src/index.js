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
};

async function main() {
  let { app, scenario, todos, screen, rounds } = yargs
    .option('app', { choices: [App.react.name, App.reactron.name], type: 'string' })
    .option('scenario', { alias: 's', choices: ['a', 'b', 'c', 'd', 'e'] })
    .option('todos', { default: 10, type: 'number' })
    .option('screen', { type: 'boolean', default: false })
    .option('rounds', { default: 1, type: 'number' }).argv;

  let browser = await puppeteer.launch({
    headless: true,
  });

  switch (scenario) {
    case 'a':
      for (let i = 0; i < rounds; i++) {
        await scenarioA(browser, App[app], todos, i+1, screen);
      }
      break;
    case 'b':
      for (let i = 0; i < rounds; i++) {
        scenarioB(browser, App[app], todos, i+1, screen);
      }
      break;
    case 'c':
      for (let i = 0; i < rounds; i++) {
        scenarioC(browser, App[app], todos, i+1, screen);
      }
      break;
    case 'd':
      for (let i = 0; i < rounds; i++) {
        scenarioD(browser, App[app], todos, i+1, screen);
      }
      break;
    case 'e':
      for (let i = 0; i < rounds; i++) {
        scenarioE(browser, App[app], todos, i+1, screen);
      }
      break;
  }

  browser.close();
}

const resultsPath = (sc, app, todos, round) => {
  return `results/A/${app.name}-${todos}-todos-${round}.json`;
}

/**
 * 
 * @param {puppeteer.Browser} browser 
 */
async function scenarioA(browser, app, todos, round = 1, screenshots = false) {
  console.log(`\n#{round} Running Sc#A for ${app.name} with ${todos} todos...`);

  let page = await browser.newPage();

  await page.tracing.start({ path: resultsPath('A', app, todos, round), screenshots });

  await page.goto(`${app.url}?todos=${todos}`);
  await page.waitForSelector('input.new-todo');

  await page.tracing.stop();

  console.log(`#{round} Done: Sc#A for ${app.name} with ${todos} todos`);
}

async function scenarioB(page, app, todos, round = 1, screenshots = false) {
  console.log(`\nRunning Sc#B for ${app.name} with ${todos} todos...`);

  await page.tracing.start({ path: resultsPath('B', app, todos, round), screenshots });

  let input = 'input.new-todo';

  for (let i = 0; i < todos; i++) {
    await page.focus(input);
    await page.type(input, `Todo ${i}`);
    await page.keyboard.press('Enter');
  }

  await page.tracing.stop();

  console.log(`Done: Sc#B for ${app.name} with ${todos} todos`);
}

async function scenarioC(page, app, todos, round = 1, screenshots = false) {
  console.log(`\nRunning Sc#C for ${app.name} with ${todos} todos...`);

  await page.tracing.start({ path: resultsPath('C', app, todos, round), screenshots });

  let todoElements = await page.$$("ul.todo-list li");

  for (let [i, todoElement] of todoElements.entries()) {
    await todoElement.click();
    let input = await todoElement.$("input.edit");
    await input.focus();
    await input.type(' updated');
    await page.keyboard.press('Enter');

    if (i % 3 === 0) {
      let toggle = await todoElement.$('.view input');
      console.log(toggle);
      await toggle.click();
    }
  }

  await page.tracing.stop();

  console.log(`Done: Sc#C for ${app.name} with ${todos} todos`);
}

main();
