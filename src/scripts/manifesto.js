import { safeExecute } from '../utils/helper';

function fullPageScroll() {
  gsap.registerPlugin(Observer, ScrollToPlugin);

  const sections = document.querySelectorAll('.main-wrapper .container section');
  const bullets = document.querySelectorAll('.manifesto_hero-bullet');
  const arrow = document.querySelector('.manifesto_pagination-arrow');
  const fuse = document.querySelector('.manifesto_essential-image.is-fuse');
  const fuseHeader = document.querySelector('.manifesto_essential-header-fuse');
  const partners = document.querySelector('.manifesto_essential-partners');

  let currentIndex = 0;
  let animating = false;
  let delay = 0;
  const infoIndex = sections.length - 1;

  function gotoSection(index) {
    if (index < 0 || index >= sections.length || animating || !sections[index] || Date.now() - delay < 400) return;

    animating = true;
    const isNetwork = index === sections.length - 2;
    const isB2b2c = index === sections.length - 3;

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
      onComplete: () => {
        animating = false
        delay = Date.now()
      }
    });

    const scrollTo = window.scrollY + sections[index].getBoundingClientRect().top;
    tl.to(window, { scrollTo: { y: scrollTo } });
    
    if (isNetwork) {
      gsap.to(arrow, { opacity: 1, y: 0 });
      gsap.to(fuse, { scale: 0.9 });
      gsap.to(fuseHeader, { y: '-13rem' });
      gsap.to(partners, { scale: 1, x: '-50%', y: '-50%' });
    } else if (isB2b2c) {
      gsap.to(arrow, { opacity: 0, y: -10 });
      gsap.to(fuse, { scale: 1 });
      gsap.to(fuseHeader, { y: '0rem' });
      gsap.to(partners, { scale: 0, x: '-50%', y: '-50%' });
    }

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

  bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => gotoSection(index));
  });
  arrow.addEventListener('click', () => gotoSection(infoIndex));
}

window.Webflow?.push(() => {
  safeExecute(fullPageScroll);
});
