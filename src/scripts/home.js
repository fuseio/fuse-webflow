import { safeExecute, animateHeroNumbers, initSwiperBlog } from '../utils/helper';

function initInfiniteSlide() {
  $(".marquee_track").infiniteslide({
    pauseonhover: false,
    speed: 35,
  });
}

function initTestimonialsSwiper() {
  new Swiper("#home-testimonials", {
    slidesPerView: 1.2,
    spaceBetween: 40,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
}

function initGA4ButtonEvents() {
  $("button").click(function () {
    if ($(this).data("event-name") !== undefined) {
      ga("send", "event", "button", "click", $(this).data("event-name"));
    }
  });
}

// Function to fetch data from a given URL
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

async function getBlogPosts() {
  const urlOfWebsite = "news.fuse.io";
  const apiURL = `https://${urlOfWebsite}/wp-json/wp/v2/posts?per_page=8`;
  const swiper = initSwiperBlog();

  try {
    const data = await fetchData(apiURL);
    const mediaPromises = data.map(post => 
      fetchData(`https://${urlOfWebsite}/wp-json/wp/v2/media/${post.featured_media}`)
        .catch(error => {
          console.error("Error fetching media:", error);
          return null;
        })
    );

    const mediaResults = await Promise.allSettled(mediaPromises);

    data.forEach((post, index) => {
      const postTitle = post.title.rendered;
      const postLink = post.link;
      const postDate = new Date(post.date).toLocaleDateString();

      let thumbnailURL = "";
      if (mediaResults[index].status === 'fulfilled' && mediaResults[index].value) {
        thumbnailURL = mediaResults[index].value.source_url;
      }

      $(".swiper-blog .swiper-wrapper").append(`
          <div class="swiper-slide">
            <a data-w-id="91356417-96af-cb6c-5320-36a4c9234229" href="${postLink}" target="_blank" class="home-blog w-inline-block">
              <img src="${thumbnailURL}" loading="lazy" data-w-id="91356417-96af-cb6c-5320-36a4c923422b" alt="${postTitle}" class="home-blog-image">
              <div class="home-blog-title">
                <p class="ws-p_16 body_text">${postDate}</p>
                <p class="ws-p_20 black semibold">${postTitle}</p>
              </div>
            </a>
          </div>
        `);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    swiper.update();
  }
}

function childObserver(selector = ".section-blog .swiper-wrapper") {
  const targetNode = document.querySelector(selector);
  const config = { childList: true };

  const callback = () => {
    $(".lds-ellipsis").css({ display: "none" });
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

function animateHero() {
  const tl = gsap.timeline();
  tl.to(".home_hero_logo-slide img", {
    duration: 0.3,
    opacity: 1,
    x: 0,
    stagger: 0.05,
    delay: 0.5,
  })
    .to("#hero-logo-title", { duration: 0.3, opacity: 1 }, "<")
    .to(".home-hero-button-wrap", {
      duration: 0.3,
      opacity: 1,
      y: 0,
      stagger: 0.1,
    })
    .to(".home-hero-announcement", {
      duration: 0.3,
      opacity: 1,
      y: 0,
      stagger: 0.1,
    });
}

function initHighlightSwiper() {
  new Swiper("#home-highlight-swiper", {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: "#home-highlight-right",
      prevEl: "#home-highlight-left",
    },
    pagination: {
      el: "#home-highlight-pagination",
      clickable: true,
    },
  });
}

function initCarouselBannerSwiper() {
  new Swiper("#home-carousel_banner-swiper", {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
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

function initCaseSwiper() {
  new Swiper("#case-swiper", {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: "#case_slide-right",
      prevEl: "#case_slide-left",
    },
  });
}

function animateZkevm() {
  const imageWrapper = document.querySelector(".zkevm_images");
  const images = document.querySelectorAll(".zkevm_image");
  const details = document.querySelectorAll(".zkevm_detail");
  const summaries = document.querySelectorAll(".zkevm_detail h3");
  const contents = document.querySelectorAll(".zkevm_detail p");

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  gsap.set(contents[0], { display: 'block' });

  const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.inOut" } });
  tl.addLabel("step0");

  for (let i = 0; i < details.length - 1; i++) {
    tl.to(contents[i], { display: 'none' });
    tl.to(contents[i + 1], { display: 'block' });
    tl.to(imageWrapper, { y: `-${((i + 1) * 400) - (i * 50)}`, duration: 0.1 });
    tl.to(images[i], { y: `-${(i + 1) * 800}`, duration: 0.5 }, ">+0.5");
    tl.addLabel("step" + (i + 1));
  }

  summaries.forEach((summary, index) => {
    summary.addEventListener("click", () => {
      tl.tweenTo("step" + index, { duration: 1 });
    });
  });
}

function initSwiper(section) {
  return new Swiper(`#${section}-swiper`, {
    centeredSlides: true,
    slidesPerView: 1,
    grabCursor: true,
  });
}

function initTab(section) {
  const swiper = initSwiper(section);

  document.querySelectorAll(`.section_${section} .tab_trigger`).forEach((tab, index) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll(`.section_${section} .tab_trigger`).forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateTabBackground(section, index);
      swiper.slideTo(index);
    });
  });

  swiper.on('slideChange', () => {
    const activeIndex = swiper.activeIndex;
    document.querySelectorAll(`.section_${section} .tab_trigger`).forEach(t => t.classList.remove('active'));
    document.querySelectorAll(`.section_${section} .tab_trigger`)[activeIndex].classList.add('active');
    updateTabBackground(section, activeIndex);
  });

  document.querySelector(`.section_${section} .tab_trigger`).click();
}

function updateTabBackground(section, index) {
  const tab = document.querySelectorAll(`.section_${section} .tab_trigger`)[index];
  const background = document.querySelector(`.section_${section} .tab_background`);
  const backgroundLeft = parseFloat(getComputedStyle(background).left);
  const tabRect = tab.getBoundingClientRect();
  const containerRect = tab.parentElement.getBoundingClientRect();
  const containerBorder = parseFloat(getComputedStyle(tab.parentElement).borderLeftWidth);

  background.style.width = `${tabRect.width}px`;
  background.style.transform = `translateX(${tabRect.left - containerRect.left - backgroundLeft - containerBorder}px)`;
}

function initRotatingText() {
  const ANIMATION_DURATION = 600;
  const ANIMATION_DELAY = 2000;

  function updateWord() {
    const wrapper = document.querySelector('.hero_rotating-wrapper');
    const words = wrapper.querySelectorAll('.hero_rotating-word');

    words.forEach((word, index) => {
      const offset = (index - 1) * 100;
      word.style.top = `${offset}%`;
    });

    function moveFirstWord() {
      const firstWord = wrapper.firstElementChild;
      const clone = firstWord.cloneNode(true);

      const offset = (words.length - 1) * 100;
      clone.style.top = `${offset}%`;

      wrapper.removeChild(firstWord);
      wrapper.appendChild(clone);
    }

    setTimeout(moveFirstWord, ANIMATION_DURATION);
  }

  updateWord();
  setInterval(updateWord, ANIMATION_DELAY);
}

window.Webflow?.push(async () => {
  safeExecute(initInfiniteSlide);
  safeExecute(initTestimonialsSwiper);
  safeExecute(initGA4ButtonEvents);
  safeExecute(getBlogPosts);
  safeExecute(childObserver);
  safeExecute(animateHero);
  safeExecute(initHighlightSwiper);
  safeExecute(animateHeroNumbers);
  safeExecute(initCarouselBannerSwiper);
  safeExecute(initCaseSwiper);
  safeExecute(animateZkevm);
  safeExecute(initTab, "study");
  safeExecute(initTab, "highlight");
  safeExecute(initRotatingText);
});
