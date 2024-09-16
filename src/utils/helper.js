import { CountUp } from 'countup.js';

export function animateHeroNumbers() {
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

  for (let i = 0; i < countUpDigits.length; i++) {
    const countUp = new CountUp(countUpDigits[i].target, countUpDigits[i].defaults.endVal, { ...countUpDigits[i].defaults, ...countUpCommonDefaults });
    countUp.handleScroll();
    countUp.start();
  }
}

export function safeExecute(fn) {
  try {
    fn();
  } catch (error) {
    console.error(`Error in ${fn.name}:`, error);
  }
}
