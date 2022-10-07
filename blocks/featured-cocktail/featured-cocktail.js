import { createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';
import { createRecipe } from '../../scripts/cocktail.js';

async function createFeaturedCocktail(page) {
  const row = document.createElement('div');
  const resp = await fetch(`${page.path}.plain.html`);
  const plain = await resp.text();
  const main = document.createElement('main');
  main.innerHTML = plain;
  const recipe = main.querySelector('div');
  const recipeBlock = createRecipe(recipe, 2);

  row.innerHTML = `
    <div>
        <h3>${page.title}</h3>
        ${recipeBlock.innerHTML}
    </div>
    <div>
      ${createOptimizedPicture(page.image).outerHTML}
    </div>
  `;
  return row;
}

function createFeaturedCocktailCard(page) {
  const row = document.createElement('div');
  row.innerHTML = `
      ${createOptimizedPicture(page.cardimage).outerHTML}
      <h3>${page.title}</h3>
  `;
  row.classList.add('featured-cocktail-card');
  return row;
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  const pages = await lookupPages(pathnames);
  block.textContent = '';
  pages.forEach(async (page) => {
    const elem = block.classList.contains('card') ? createFeaturedCocktailCard(page) : await createFeaturedCocktail(page);
    block.append(elem);
  });
}
