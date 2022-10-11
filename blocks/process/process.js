function modifyCardDescription(div) {
  div.innerHTML = `<span class='icon icon-process'></span><span class='card-contents'>${div.innerHTML}</span>`;
  return ' card-description';
}

export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = 'process-row';

    [...row.children].forEach((div) => {
      div.className = 'process-card';

      const cardDescription = div.getElementsByTagName('h5').length > 0 && modifyCardDescription(div);
      const cardPicture = div.getElementsByTagName('picture').length > 0 && ' card-image';
      div.className += cardDescription || cardPicture;
    });
  });
}
