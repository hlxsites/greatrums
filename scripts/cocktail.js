import { buildBlock } from './scripts.js';

export function createRecipe(recipe, headingPush = 0) {
  const recipeCols = [document.createElement('div'), document.createElement('div')];
  let col = 0;
  [...recipe.children].forEach((e) => {
    if (e.tagName === 'H2') {
      col += 1;
    }
    if (col) {
      const recipeCol = recipeCols[(col - 1) ? 0 : 1];
      if (e.tagName.startsWith('H') && headingPush) {
        const heading = document.createElement(`h${headingPush + (+e.tagName.substr(1))}`);
        heading.innerHTML = e.innerHTML;
        recipeCol.append(heading);
      } else {
        recipeCol.append(e);
      }
    }
  });

  return buildBlock('columns', [[recipeCols[0], recipeCols[1]]]);
}

export default async function autoBlock() {
  const main = document.querySelector('main');
  const recipe = main.querySelector('main div:nth-of-type(2)');
  const recipeBlock = createRecipe(recipe);
  recipe.innerHTML = '';
  recipeBlock.classList.add('recipe');
  recipe.append(recipeBlock);

  const featuredRumSection = document.createElement('div');
  const featuredRumPath = '/great-rums/myers-s-original-dark-rum';
  featuredRumSection.append(buildBlock('featured-rum', [[`<a href="${featuredRumPath}">featured rum</a>`]]));
  main.append(featuredRumSection);

  const moreSection = document.createElement('div');
  moreSection.append(buildBlock('fragment', [['<a href="/fragments/cocktail-footer">Footer Fragment</a>']]));
  main.append(moreSection);
}
