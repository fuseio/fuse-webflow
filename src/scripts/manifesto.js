import { safeExecute, isMediumScreen } from '../utils/helper';

function animateFundamental() {
  const box = document.querySelector('.manifesto_box.is-center');
  const boxLeft = document.querySelector('.manifesto_box.is-left');
  const boxRight = document.querySelector('.manifesto_box.is-right');
  const container = box.querySelector('.manifesto_box-container');
  const sliders = document.querySelectorAll('.manifesto_box-wrapper.is-slider');
  const fuse = document.querySelector('.manifesto_box-image.is-fuse');
  const token = document.querySelector('.manifesto_box-image.is-tokens');
  const titleContainer = document.querySelector('.manifesto_fundamental-title-container');
  const titleWrapper = document.querySelector('.manifesto_fundamental-title-wrapper');
  const bullets = document.querySelectorAll('.manifesto_hero-bullet');

  const containerWidth = container.getBoundingClientRect().width;
  const containerHeight = container.getBoundingClientRect().height;
  let scrollY = 0;
  let isSideBoxesRevealed = false;
  let currentBox = 1;
  const backgroundGradients = {
    red: 'linear-gradient(#f65d51,#f32f20)',
    green: 'linear-gradient(180deg, #BAFEC0 0%, #0F8519 100%)'
  }

  const firstScrolled = containerHeight;
  const secondScrolled = firstScrolled + containerWidth;
  const thirdScrolled = secondScrolled + containerWidth;
  const fourthScrolled = thirdScrolled + containerHeight;
  const fifthScrolled = fourthScrolled + containerHeight;
  const sixthScrolled = fifthScrolled + window.innerHeight;
  const scrollMap = {
    7: sixthScrolled,
    6: fifthScrolled,
    5: fourthScrolled,
    4: thirdScrolled,
    3: secondScrolled,
    2: firstScrolled,
    1: 0
  };
  const sortedScrollMap = Object.keys(scrollMap).sort((a, b) => scrollMap[b] - scrollMap[a]);

  const titleHeight = titleWrapper.getBoundingClientRect().height;

  function disappearSideBoxes() {
    isSideBoxesRevealed = false;

    boxLeft.style.transform = `rotateY(-15deg) translate(-300%, -50%) scale(0)`;
    boxRight.style.transform = `rotateY(15deg) translate(250%, -50%) scale(0)`;
    boxRight.style.left = `0%`;
  }

  function revealSideBoxes() {
    if (isSideBoxesRevealed) return;
    isSideBoxesRevealed = true;

    boxLeft.style.transform = `rotateY(-15deg) translate(-220%, -50%) scale(1)`;
    boxRight.style.transform = `rotateY(15deg) translate(170%, -50%) scale(1)`;
    boxRight.style.left = `0%`;
  }

  function hideSideBoxes() {
    if (!isSideBoxesRevealed) return;
    isSideBoxesRevealed = false;

    boxLeft.style.transform = `rotateY(0deg) translate(-50%, -50%) scale(1)`;
    boxRight.style.transform = `rotateY(0deg) translate(-50%, -50%) scale(1)`;
    boxRight.style.left = `50%`;
  }

  function revealTokens() {
    fuse.style.transform = `translate(-50%, 0%) scale(0.5)`;
    token.style.transform = `translate(-50%, 1rem) scale(1.2)`;
  }

  function hideTokens() {
    fuse.style.transform = `translate(-50%, 0%) scale(1)`;
    token.style.transform = `translate(-50%, 0%) scale(0)`;
  }

  function firstVerticalScroll() {
    if (isMediumScreen) {
      hideSideBoxes();
    }
    sliders.forEach(slider => {
      slider.style.transform = `translateX(0px)`;
    });
    container.style.top = `-${scrollY}px`;
  }

  function horizontalScroll() {
    if (isMediumScreen) {
      revealSideBoxes();
    }
    box.style.backgroundImage = backgroundGradients.red;
    sliders.forEach(slider => {
      slider.style.transform = `translateX(-${scrollY - firstScrolled}px)`;
    });
  }

  function secondVerticalScroll() {
    if (currentBox >= 6) {
      revealTokens();
    } else {
      hideTokens();
    }
    if (isMediumScreen) {
      disappearSideBoxes();
    }
    box.style.backgroundImage = backgroundGradients.green;
    container.style.top = `-${scrollY - (containerWidth * 2)}px`;
  }

  function animateImages() {
    if (currentBox >= 4) {
      secondVerticalScroll()
    } else if (currentBox >= 2 && currentBox < 4) {
      horizontalScroll()
    } else if (currentBox <= 1) {
      firstVerticalScroll()
    }
  }

  function rotateTitles() {
    titleContainer.style.top = `-${(currentBox - 1) * titleHeight}px`;
  }

  function initBullet() {
    bullets[0].classList.add('w--current');
  }

  function toggleBullets() {
    bullets.forEach((bullet, index) => {
      bullet.classList.toggle('w--current', currentBox === index + 1);
    });
  }

  function bulletClick() {
    bullets.forEach((bullet, index) => {
      bullet.addEventListener('click', () => {
        window.scrollTo({
          top: scrollMap[index + 1],
          behavior: 'smooth'
        });
      });
    });
  }

  function onScroll() {
    scrollY = window.scrollY;

    for (let box of sortedScrollMap) {
      if (scrollY >= scrollMap[box]) {
        currentBox = parseInt(box);
        break;
      }
    }

    animateImages()
    rotateTitles()
    toggleBullets()
  }

  initBullet()
  bulletClick()
  window.addEventListener('scroll', onScroll);
}

window.Webflow?.push(() => {
  safeExecute(animateFundamental);
});
