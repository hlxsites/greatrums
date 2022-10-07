import { buildBlock } from './scripts.js';

function createRecipe(recipe) {
  const recipeCols = [document.createElement('div'), document.createElement('div')];
  let col = 0;
  [...recipe.children].forEach((e) => {
    if (e.tagName === 'H2') {
      col += 1;
    }
    if (col) {
      const recipeCol = recipeCols[(col - 1) ? 0 : 1];
      recipeCol.append(e);
    }
  });

  return buildBlock('columns', [[recipeCols[0], recipeCols[1]]]);
}

export default function autoBlock() {
  const main = document.querySelector('main');
  const recipe = main.querySelector('main div:nth-of-type(2)');
  const recipeBlock = createRecipe(recipe);
  recipe.innerHTML = '';
  recipe.append(recipeBlock);

  const featuredRumSection = document.createElement('div');
  const featuredRumPath = '/great-rums/myers-s-original-dark-rum';
  featuredRumSection.append(buildBlock('featured-rum', [[`<a href="${featuredRumPath}">featured rum</a>`]]));
  main.append(featuredRumSection);
}
