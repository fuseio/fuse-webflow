import { safeExecute, initSwiperBlog, moreSuccessStories } from "../../utils/helper";

window.Webflow?.push(async () => {
  safeExecute(initSwiperBlog);
  safeExecute(moreSuccessStories);
});
