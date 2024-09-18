import { safeExecute, initGallerySwiper, initSwiperBlog, moreSuccessStories } from "../../utils/helper";

window.Webflow?.push(async () => {
  safeExecute(initGallerySwiper);
  safeExecute(initSwiperBlog);
  safeExecute(moreSuccessStories);
});
