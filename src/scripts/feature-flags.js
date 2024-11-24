import { safeExecute, isProduction } from '../utils/helper';

function detachLinkRel() {
  const existingCanonicalTag = document.querySelector('link[rel="canonical"]');
  const existingHreflangs = document.querySelectorAll('link[rel="alternate"]');

  if (existingCanonicalTag) {
    existingCanonicalTag.parentNode.removeChild(existingCanonicalTag);
  }

  for (let i = 0; i < existingHreflangs.length; i++) {
    const existingHreflang = document.querySelector('link[rel="alternate"]');
    if (existingHreflang) {
      existingHreflang.parentNode.removeChild(existingHreflang);
    }
  }
}

function hideLayer3InHomePage() {
  if (!isProduction) return;

  const isHomePage = window.location.pathname === "/";
  if (!isHomePage) return;

  document.querySelector(".section_layer3").style.visibility = "hidden";
}

window.Webflow?.push(() => {
  safeExecute(detachLinkRel);
  safeExecute(hideLayer3InHomePage);
});
