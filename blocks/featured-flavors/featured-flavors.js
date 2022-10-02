const errors = {
    header: '<h4>No Header</h4>',
    body: '<p>No body information</p>'
}
import { createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';

async function createFeaturedFlavor(page) {
    const row = document.createElement('div');
    const resp = await fetch(`${page.path}.plain.html`);
    let plain = await resp.text();
    
    let start = plain.search('<h1');
    let end = plain.search('</h1>');
    
    let header = plain.substring(start, end>-1?end+5:0) || errors.header;
    header = header.replaceAll('<h1', '<h4')||'No Header';

    let body = errors.body;

    row.innerHTML = `
      ${header}
          ${body}
            <a href=${page.path}>Learn More</a>
     
    `;
    return row;
  }

export default async function decorate(block) {
    const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
    const pages = await lookupPages(pathnames);
    block.textContent = '';
    pages.forEach(async (page) => {
      block.append(await createFeaturedFlavor(page));
    });
  }