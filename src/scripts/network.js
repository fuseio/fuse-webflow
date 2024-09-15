import { CountUp } from 'countup.js';

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
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll);
        onScroll();
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    });
  }, { 
    threshold: 0,
  });

  observer.observe(wrapper);

  function onScroll() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperTop = wrapperRect.top;
    const wrapperHeight = wrapperRect.height;
    const windowHeight = window.innerHeight;

    const scrollProgress = (windowHeight - wrapperTop) / (windowHeight + wrapperHeight);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    
    const imageHeight = progressImage.offsetHeight;
    const revealHeight = imageHeight * clampedProgress;

    wrapper.style.height = `${revealHeight}px`;
  }
}

function animateHeroNumbers() {
  const countUpDigits = [
    {
      target: document.querySelector("#transactions-digit"),
      defaults: {
        startVal: 0,
        endVal: 135,
        decimalPlaces: 0,
        duration: 2,
      }
    },
    {
      target: document.querySelector("#projects-digit"),
      defaults: {
        startVal: 0,
        endVal: 150,
        decimalPlaces: 0,
        duration: 2,
      }
    },
    {
      target: document.querySelector("#uptime-digit"),
      defaults: {
        startVal: 0,
        endVal: 99.99,
        decimalPlaces: 2,
        duration: 2,
      },
    },
    {
      target: document.querySelector("#smartwallets-digit"),
      defaults: {
        startVal: 0,
        endVal: 1.00,
        decimalPlaces: 2,
        duration: 2,
      }
    },
  ]

  const countUpCommonDefaults = {
    enableScrollSpy: true,
    scrollSpyOnce: true,
  }

  for(let i = 0; i < countUpDigits.length; i++) {
    const countUp = new CountUp(countUpDigits[i].target, countUpDigits[i].defaults.endVal, {...countUpDigits[i].defaults, ...countUpCommonDefaults});
    countUp.handleScroll();
    countUp.start();
  }
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

window.Webflow?.push(async () => {
  animateSummaryTab();
  animateRoadmap();
  animateHeroNumbers();
  animateL2Features();
});
