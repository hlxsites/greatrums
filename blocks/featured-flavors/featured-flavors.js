import { lookupPages, decorateIcons } from '../../scripts/scripts.js';

function createFeaturedFlavorCard(page, prefix) {
  const card = document.createElement('div');
  const iconName = page.path.split('/').pop();

  card.className = `${prefix}-card`;

  card.innerHTML = `
    
    <h4>${page.title}</h4>
    <p>${page.description}</p>
    <a href=${page.path}>Learn More</a>
    <span class="icon icon-${iconName}"></span>`;
  return card;
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => {
    a.remove();
    return new URL(a.href).pathname;
  });
  const pages = await lookupPages(pathnames);
  block.innerHTML = '';
  pages.forEach((page) => {
    block.append(createFeaturedFlavorCard(page, 'featured-flavor'));
  });
  decorateIcons(block);
}
