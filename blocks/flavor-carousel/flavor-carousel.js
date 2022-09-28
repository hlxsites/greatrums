import { lookupPages, decorateIcons } from '../../scripts/scripts.js';

export function createFlavorCard(flavor, prefix) {
  const card = document.createElement('div');
  const iconName = flavor.path.split('/').pop();
  card.className = `${prefix}-card`;
  card.innerHTML = `
    <a href="${flavor.path}">
      <span class="icon icon-${iconName}"></span>
      <h4>${flavor.title}</h4>
    </a>
  `;
  return (card);
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => {
    a.remove();
    return new URL(a.href).pathname;
  });
  const pages = await lookupPages(pathnames);
  // block.textContent = '';
  pages.forEach((page) => {
    block.append(createFlavorCard(page, 'flavor-carousel'));
  });
  decorateIcons(block);
}
