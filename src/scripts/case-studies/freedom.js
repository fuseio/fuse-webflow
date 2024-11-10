import { safeExecute, initSwiperBlog, moreSuccessStories } from "../../utils/helper";

export function initSwiperImplementation() {
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

window.Webflow?.push(async () => {
  safeExecute(initSwiperImplementation);
  safeExecute(initSwiperBlog);
  safeExecute(moreSuccessStories);
});
