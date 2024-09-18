import { safeExecute, initGallerySwiper } from "../../utils/helper";

window.Webflow?.push(async () => {
  safeExecute(initGallerySwiper);
});
