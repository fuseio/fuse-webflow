$(function () {
  function hideRoadVerticalImageOnSmallerScreen() {
    const baseWidth = 1440;
    const root = document.querySelector(":root");

    if (window.innerWidth < baseWidth) {
      root.style.setProperty("--ogp-road-grid-display", "none");
    }
  }
  hideRoadVerticalImageOnSmallerScreen();

  function revealRoadVerticalImage() {
    const imageHeight = 885;
    const currentHeight = Number(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--ogp-road-grid-height")
    );

    window.addEventListener("scroll", () => {
      if (currentHeight > imageHeight || currentHeight < 0) {
        return;
      }

      const style = document.documentElement.style;
      const scrollY = window.scrollY;
      const offsetTop = $(".ogp-road-grid").offset().top;
      const additionalOffset = 300;

      // use negative (-) as we are scrolling away from top
      const result = -(offsetTop - scrollY - imageHeight);

      style.setProperty("--ogp-road-grid-height", result - additionalOffset);
    });
  }
  revealRoadVerticalImage();
});
