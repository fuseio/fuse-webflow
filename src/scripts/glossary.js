import { safeExecute, tableOfContent } from '../utils/helper';

function initInfiniteSlide() {
  $(".marquee_track").infiniteslide({
    pauseonhover: false,
    speed: 50,
  });
}

window.Webflow?.push(async () => {
  safeExecute(initInfiniteSlide);
  safeExecute(tableOfContent, document.querySelector(".wp-sidebar.mobile"));
});
