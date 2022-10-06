import { createOptimizedPicture } from '../../scripts/scripts.js';

export default function decorate(block) {
  
    [...block.children].forEach((row) => {
        row.className = 'process-row';
    
    [...row.children].forEach((div) => {
        div.className = 'process-card';
        if(div.innerHTML == '')
            div.innerHTML = '&nbsp;';

        
    });

    console.log(row);
  });
  
}