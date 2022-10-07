import { createOptimizedPicture, getMetadata } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const background = document.querySelector('picture');
  if (background) background.classList.add('hero-background');
  if (block.querySelector('.icon')) block.classList.add('hero-white');
  if (document.body.classList.contains('rum') || getMetadata('hero-overlay')) {
    const overlay = createOptimizedPicture(getMetadata('cardimage'));
    overlay.classList.add('hero-overlay');
    block.append(overlay);
  }
}
