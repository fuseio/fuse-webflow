import { safeExecute } from '../utils/helper';

function sortProjects() {
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsload",
    (listInstances) => {
      const [listInstance] = listInstances;
      const items = listInstance.items;

      const projects = [];
      const badgeNewProjects = [];
      const badgeHotProjects = [];
      const generalProjects = [];

      items.forEach((item) => {
        const badgeNewElement = item.element.querySelector(
          ".ecosystem-project-badge.new",
        );
        const badgeHotElement = item.element.querySelector(
          ".ecosystem-project-badge.hot",
        );

        const badgeNewDisplay =
          window.getComputedStyle(badgeNewElement).display;

        if (badgeNewDisplay === "block") {
          badgeNewProjects.push(item.element);
        } else if (badgeHotElement) {
          badgeHotProjects.push(item.element);
        } else {
          generalProjects.push(item.element);
        }
      });

      function titleText(element) {
        return element
          .querySelector(".platform-card_title")
          .innerText.toLowerCase();
      }

      function compareTitles(a, b) {
        const aTitle = titleText(a);
        const bTitle = titleText(b);

        if (aTitle < bTitle) {
          return -1;
        }

        if (aTitle > bTitle) {
          return 1;
        }
        
        return 0;
      }

      badgeNewProjects.sort(compareTitles);
      badgeHotProjects.sort(compareTitles);
      generalProjects.sort(compareTitles);

      projects.push(
        ...badgeNewProjects,
        ...badgeHotProjects,
        ...generalProjects,
      );

      listInstance.clearItems();
      listInstance.addItems(projects);
    },
  ]);
}

function animateHeroLogo() {
  const logos = document.querySelectorAll('.ecosystem_hero-logo');
  const delay = 0.25;
  logos.forEach((logo, index) => {
    logo.style.animationDelay = `${index * delay}s`;
  });
}

function initSwiperTags() {
  new Swiper(".swiper-tags", {
    slidesPerView: "auto",
    spaceBetween: 16,
    mousewheel: true,
    navigation: {
      nextEl: ".swiper-tags-arrow.is-next",
      prevEl: ".swiper-tags-arrow.is-prev",
    },
  });
}

function initCarouselBannerSwiper() {
  new Swiper("#home-carousel_banner-swiper", {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    observer: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: "#home_carousel_banner-right",
      prevEl: "#home-carousel_banner-left",
    },
    pagination: {
      el: "#home-carousel_banner-pagination",
      clickable: true,
    },
  });
}

function initFeaturedSwiper() {
  new Swiper("#ecosystem-featured-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    rewind: true,
    grabCursor: true,
    observeParents: true,
    observeSlideChildren: true,
    observer: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: "#ecosystem_slide-right",
      prevEl: "#ecosystem_slide-left",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
}

window.Webflow?.push(async () => {
  safeExecute(sortProjects);
  safeExecute(animateHeroLogo);
  safeExecute(initSwiperTags);
  safeExecute(initCarouselBannerSwiper);
  safeExecute(initFeaturedSwiper);
});
