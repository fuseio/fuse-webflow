import { safeExecute, isProduction } from '../utils/helper';

function hideLayer3InHomePage() {
  if (!isProduction) return;

  const isHomePage = window.location.pathname === "/";
  if (!isHomePage) return;

  document.querySelector(".section_layer3").style.display = "none";
}

window.Webflow?.push(() => {
  safeExecute(hideLayer3InHomePage);
});
