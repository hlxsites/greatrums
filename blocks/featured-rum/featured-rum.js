import { fetchPlaceholders, createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';

function createFeaturedRum(page, ph) {
  const row = document.createElement('div');
  const pageTitle = document.querySelector('h1').textContent;
  const pagePicture = document.querySelector('main picture');
  row.innerHTML = `
    <div class="featured-rum-overlay">
      ${pagePicture.outerHTML}
      ${createOptimizedPicture(page.cardimage).outerHTML}
    </div>
    <div>
      <span class="featured-rum-eyebrow">${ph.featured} ${pageTitle} ${ph.rum}</span>
      <h3>${page.title}</h3>
      <p>${page.description}</p>
      <a href="${page.path}" class="button">${ph.moredetails}</a>
    </div>
  `;
  return row;
}

export default async function decorate(block) {
  const ph = await fetchPlaceholders();
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  const pages = await lookupPages(pathnames);
  block.textContent = '';
  pages.forEach((page) => {
    block.append(createFeaturedRum(page, ph));
  });
}
