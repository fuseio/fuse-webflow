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
  const heading = document.querySelector(".home_hero-h1");
  const headingWords = heading.textContent.split(" ");
  heading.innerHTML = headingWords
    .map((headingWord) => `<span class="hero-h1-word">${headingWord}</span>`)
    .join(" ");

  const description = document.querySelector("#hero-description");
  const descriptionWords = description.textContent.split(" ");
  description.innerHTML = descriptionWords
    .map(
      (descriptionWord) =>
        `<span class="hero-description-word">${descriptionWord}</span>`
    )
    .join(" ");

  const tl = gsap.timeline();
  tl.to(".home_hero_logo-slide img", {
    duration: 0.3,
    opacity: 1,
    x: 0,
    stagger: 0.05,
  })
    .to("#hero-logo-title", { duration: 0.3, opacity: 1 }, "<")
    .to(".home_hero-h1", { duration: 0, opacity: 1 }, "<0.1")
    .to(".hero-h1-word", {
      duration: 0.5,
      opacity: 1,
      stagger: 0.2,
    }, "<")
    .to("#hero-description", { duration: 0, opacity: 1 })
    .to(".hero-description-word", {
      duration: 0.3,
      opacity: 1,
      y: 0,
      stagger: 0.05,
    })
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
  const section = document.querySelector(".section_zkevm");
  const spacing = document.querySelector(".section-spacing.is-zkevm");
  const imageWrapper = document.querySelector(".zkevm_images");
  const images = document.querySelectorAll(".zkevm_image");
  const details = document.querySelectorAll(".zkevm_detail");
  const summaries = document.querySelectorAll(
    ".zkevm_detail h3"
  );
  const contents = document.querySelectorAll(
    ".zkevm_detail p"
  );
  const progressbars = document.querySelectorAll(
    ".zkevm_detail .zkevm_progressbar"
  );
  const detailsLength = details.length;
  const sectionHeight = section.clientHeight;
  const step = sectionHeight / detailsLength;
  const spacingTop = spacing.computedStyleMap().get("top").value;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  const imageTl = gsap.timeline();

  details.forEach((detail, index) => {
    ScrollTrigger.create({
      trigger: detail,
      start: `top+=${index * step} center`,
      end: `top+=${(index + 1) * step} center`,
      onEnter: () => {
        for (let i = 0; i < index; i++) {
          gsap.to(contents[i], { opacity: 0, height: "0px", duration: 0.5 });
        }
        gsap.to(contents[index], { opacity: 1, height: "auto", duration: 0.5 });
        gsap.to(progressbars[index], { width: "100%", duration: 0.5 });
        imageTl
          .to(imageWrapper, { y: "-=400", duration: 0.3 })
          .to(images[index], { y: "-=600", duration: 0.2 }, ">");
      },
      onLeaveBack: () => {
        gsap.to(contents[index], { opacity: 1, height: "auto", duration: 0.5 });
        gsap.to(progressbars[index], { width: "0%", duration: 0.5 });
        imageTl
          .to(images[index], { y: "+=600", duration: 0.2 })
          .to(imageWrapper, { y: "+=400", duration: 0.3 }, ">");
        for (let i = index + 1; i < detailsLength; i++) {
          gsap.to(contents[i], { opacity: 0, height: "0px", duration: 0.5 });
        }
      }
    });
  });

  details.forEach((_, index) => {
    summaries[index].addEventListener("click", () => {
      const y = section.offsetTop + spacingTop + index * step;
      gsap.to(window, {
        scrollTo: { y, autoKill: false },
        duration: 1
      });
    });
  });
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
});
