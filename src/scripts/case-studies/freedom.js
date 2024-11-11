import { safeExecute, moreSuccessStories } from "../../utils/helper";

function initSwiperImplementation() {
  return new Swiper("#case-freedom-swiper", {
    slidesPerView: 1,
    rewind: true,
    grabCursor: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
}

function initSwiperBlog() {
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
        slidesPerView: 3.5,
        spaceBetween: 48,
      },
      1800: {
        slidesPerView: 4.2,
        spaceBetween: 48,
      },
    },
  });
}

window.Webflow?.push(async () => {
  safeExecute(initSwiperImplementation);
  safeExecute(initSwiperBlog);
  safeExecute(moreSuccessStories);
});
