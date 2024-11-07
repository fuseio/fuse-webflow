import { safeExecute } from '../utils/helper';

function fullPageScroll() {
  gsap.registerPlugin(Observer, ScrollToPlugin);

  const sections = document.querySelectorAll('.main-wrapper .container section');
  let currentIndex = 0;
  let animating = false;
  let delay = 0

  function gotoSection(index) {
    if (index < 0 || index >= sections.length || animating || !sections[index] || Date.now() - delay < 400) return;

    animating = true;
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
      onComplete: () => {
        animating = false
        delay = Date.now()
      }
    });

    tl.to(window, { scrollTo: { y: sections[index].offsetTop } });

    currentIndex = index;
  }

  Observer.create({
    wheelSpeed: -1,
    tolerance: 10,
    preventDefault: true,
    onDown: () => gotoSection(currentIndex - 1),
    onUp: () => gotoSection(currentIndex + 1),
  });

  gotoSection(0);
}

window.Webflow?.push(() => {
  safeExecute(fullPageScroll);
});
