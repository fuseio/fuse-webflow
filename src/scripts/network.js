window.Webflow?.push(async () => {
  function animateSummaryTab() {
  	const pills = document.querySelectorAll(".network_summary-pill");
    const bg = document.querySelector(".network_summary_tab-background");
    const overview = document.querySelector(".network_overviews");
    const how = document.querySelector(".network_hows");

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("is-active"));
        pill.classList.add("is-active");

        bg.style.left = pill.dataset.left;

        switch (pill.dataset.tab) {
          case "overview":
            overview.classList.remove("hide");
            how.classList.add("hide");
            break;
          case "how":
            how.classList.remove("hide");
            overview.classList.add("hide");
            break;
        }
      });
    });

  }
  animateSummaryTab();
});
