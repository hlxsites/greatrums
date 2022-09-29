import { createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';

async function createFeaturedCocktail(page) {
  const row = document.createElement('div');
  const resp = await fetch(`${page.path}.plain.html`);
  let plain = await resp.text();
  plain = plain.replaceAll('<h2', '<h3');
  plain = plain.replaceAll('</h2>', '</h3>');
  plain = plain.replaceAll('<h1', '<h2');
  plain = plain.replaceAll('</h1>', '</h2>');
  row.innerHTML = `
    <div>
        ${plain};
    </div>
    <div class="featured-rum-overlay">
      ${createOptimizedPicture(page.image).outerHTML}
    </div>
  `;
  return row;
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  const pages = await lookupPages(pathnames);
  block.textContent = '';
  pages.forEach(async (page) => {
    block.append(await createFeaturedCocktail(page));
  });
}
