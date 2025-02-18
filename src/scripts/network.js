import { CountUp } from 'countup.js';

import { safeExecute, animateJoinImage } from '../utils/helper';

function animateSummaryTab() {
  const pills = document.querySelectorAll(".network_summary-pill");
  const bg = document.querySelector(".network_summary_tab-background");
  const overview = document.querySelector(".network_overviews");
  const how = document.querySelector(".network_hows");

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");

      bg.style.left = pill.dataset.left;

      switch (pill.dataset.tab) {
        case "overview":
          overview.classList.remove("hide");
          how.classList.add("hide");
          break;
        case "how":
          how.classList.remove("hide");
          overview.classList.add("hide");
          break;
      }
    });
  });
}

function animateRoadmap() {
  const progressImage = document.querySelector('.network_roadmap-progress');
  const wrapper = document.querySelector('.network_roadmap_progress-wrapper');
  const offset = 300;

  function updateVisibleAmount() {
    const visibleAmount = Math.max(0, offset - wrapper.getBoundingClientRect().top);
    wrapper.style.height = `${Math.min(visibleAmount, progressImage.offsetHeight)}px`;
  }

  ['scroll', 'resize'].forEach(event => window.addEventListener(event, updateVisibleAmount));
  updateVisibleAmount();
}

function animateL2Features() {
  document.querySelectorAll('.network_l2-feature').forEach(feature => {
    const ellipse = feature.querySelector('.network_l2_feature-ellipse');
    let animationTimeout;

    feature.addEventListener('mouseenter', () => {
      clearTimeout(animationTimeout);
      
      ellipse.style.borderRadius = '12px';
      
      animationTimeout = setTimeout(() => {
        ellipse.style.width = '100%';
      }, 200);
    });

    feature.addEventListener('mouseleave', () => {
      clearTimeout(animationTimeout);
      
      ellipse.style.width = '1.3rem';
      
      animationTimeout = setTimeout(() => {
        ellipse.style.borderRadius = '100%';
      }, 800);
    });
  });
}

export function animateAdoptionNumbers() {
  const countUpDigits = [
    {
      target: document.querySelector("#transactions-speed-digit"),
      defaults: {
        startVal: 0,
        endVal: 3133,
        decimalPlaces: 0,
        duration: 2,
      }
    },
    {
      target: document.querySelector("#total-transactions-digit"),
      defaults: {
        startVal: 0,
        endVal: 135_345_123,
        decimalPlaces: 0,
        duration: 10,
      }
    },
    {
      target: document.querySelector("#validator-nodes-digit"),
      defaults: {
        startVal: 0,
        endVal: 1516,
        decimalPlaces: 0,
        duration: 2,
      },
    },
  ]

  const countUpCommonDefaults = {
    enableScrollSpy: true,
    scrollSpyOnce: true,
  }

  for (let i = 0; i < countUpDigits.length; i++) {
    const countUp = new CountUp(countUpDigits[i].target, countUpDigits[i].defaults.endVal, { ...countUpDigits[i].defaults, ...countUpCommonDefaults });
    countUp.handleScroll();
    countUp.start();
  }
}

window.Webflow?.push(async () => {
  safeExecute(animateSummaryTab);
  safeExecute(animateRoadmap);
  safeExecute(animateAdoptionNumbers);
  safeExecute(animateL2Features);
  safeExecute(animateJoinImage);
});
