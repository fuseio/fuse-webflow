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

export function safeExecute(fn, ...args) {
  try {
    return args.length > 0 ? fn(...args) : fn();
  } catch (error) {
    console.error(`Error in ${fn.name}:`, error);
  }
}

export function initSwiperBlog() {
  return new Swiper(".swiper-blog", {
    slidesPerView: 1,
    spaceBetween: 40,
    rewind: true,
    grabCursor: true,
    observeSlideChildren: true,
    observer: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: "#swiper-blog-right",
      prevEl: "#swiper-blog-left",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 48,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 3,
        spaceBetween: 48,
      },
    },
  });
}

export function initGallerySwiper() {
  new Swiper("#case_studies-gallery", {
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

export function initTippy() {
  tippy("[data-tippy-content]", {
    placement: "bottom",
    arrow: true,
  });
}

export function moreSuccessStories() {
  const stories = [
    {
      name: "Freedom",
      nameImage:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed8d568a11ffe1399274aa_Image%20139.png",
      description: "Freedom: Real world assets for businesses",
      flag: "Thailand",
      flagImage:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed8ecdd2f4a08599955790_Frame%201000005445.svg",
      banner:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed8c4684b3fb349d6b7d6c_Frame%201000004852.png",
      link: `${window.location.origin}/casestudies/freedom`,
      exists: true,
    },
    {
      name: "Mystic Valley",
      nameImage:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed9ee9e2198cc571ee6293_image%2026.png",
      description: "Revolutionizing event payments with Freedom wallet",
      flag: "Thailand",
      flagImage:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed8ecdd2f4a08599955790_Frame%201000005445.svg",
      banner:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed9ee9a4f1df10ff246e9e_Frame%201000004792.png",
      link: `${window.location.origin}/casestudies/mystic-valley`,
      exists: true,
    },
    {
      name: "Sanduk",
      nameImage:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb282726cb0f88c030efc_Sanduk.svg",
      description:
        "Hold, send, and receive Digital Dollars in Kenya on Fuse Network.",
      flag: "Kenya",
      flagImage:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb283d2e2ac07348a674f_Frame%201000005443.svg",
      banner:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb283d2f4a08599a5577c_Frame%201000005150.png",
      link: `${window.location.origin}/casestudies/sanduk`,
      exists: true,
    },
    {
      name: "Zneakrz",
      nameImage:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb38af518f11425f59dbb_ZNEAKRZ.svg",
      description: "Frictionless web3 commerce with Zneakrz",
      flag: "United States",
      flagImage:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb38ac45647ad7dd06573_Frame%201000005443.svg",
      banner:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb38b370b0f7f3a1bec95_Frame%201000004852.png",
      link: `${window.location.origin}/casestudies/zneakrz`,
      exists: true,
    },
    {
      name: "Chromepay",
      nameImage:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb53358df5f9df9a8a86e_CHROMEPAY.svg",
      description:
        "Chromepay bridging financial services with unbanked communities using their decentralized identity solution",
      flag: "Ethiopia",
      flagImage:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb53358df5f9df9a8a872_Frame%201000005444.svg",
      banner:
        "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb533726cb0f88c043f08_Frame%201000004852.png",
      link: `${window.location.origin}/casestudies/chromepay`,
      exists: true,
    },
  ];
  try {
    for (const post of stories) {
      if (!post.exists) {
        continue;
      }
      $(".swiper-blog .swiper-wrapper").append(`
          <div class="swiper-slide cs-blog-swiper-slide">
            <a href="${post.link}" target="_blank" class="cs-blog">
              <img src="${post.banner}" loading="lazy" alt="" class="cs-blog-image">
              <div class="cs-blog-title">
                <div class="cs-blog-info">
                  <div class="cs-blog-title-image-wrapper">
                    <img src="${post.nameImage}" loading="lazy" alt="${post.name}" class="cs-blog-title-image">
                  </div>
                  <div class="cs-blog-description">
                    <p class="ws-p_18 body_text">${post.description}</p>
                  </div>
                </div>
                <img src="${post.flagImage}" loading="lazy" alt="" class="cs-blog-flag" data-tippy-content="${post.flag}">
              </div>
            </a>
          </div>
        `);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    initTippy();
  }
}

export function tableOfContent(contentElement) {
  const tocElement = document.querySelector(".table_of_content");
  const tableIconElement = document.querySelector(
    ".table_of_content-icon.table",
  );
  const crossIconElement = document.querySelector(
    ".table_of_content-icon.cross",
  );

  tocElement.addEventListener("click", () => {
    tocElement.style.setProperty("height", "400px");
    tableIconElement.style.setProperty("display", "none");
    crossIconElement.style.setProperty("display", "block");
    contentElement.style.setProperty("display", "block");

    crossIconElement.addEventListener("click", (event) => {
      event.stopPropagation();
      tocElement.style.setProperty("height", "50px");
      tableIconElement.style.setProperty("display", "block");
      crossIconElement.style.setProperty("display", "none");
      contentElement.style.setProperty("display", "none");
    });
  });
}

export function animateJoinImage() {
  const leftImages = $(".join-image-wrapper.left");
  const rightImages = $(".join-image-wrapper.right");
  leftImages.css({ left: "-25%" });
  rightImages.css({ right: "-25%" });

  const totalImages = 12;
  let decimal = 0.25;
  for (let i = 1; i <= totalImages; i++) {
    const currDelay = i * decimal;
    $(`.join-image_${i}`).css("animation-delay", `${currDelay}s`);
  }
}

export const isMediumScreen = window.innerWidth > 767;
