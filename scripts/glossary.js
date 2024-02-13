$(function () {
  function initInfiniteSlide() {
    $(".marquee_track").infiniteslide({
      pauseonhover: false,
      speed: 50,
    });
  }
  initInfiniteSlide();

  function tableOfContent() {
    const tocElement = document.querySelector(".table_of_content");
    const tableIconElement = document.querySelector(
      ".table_of_content-icon.table",
    );
    const crossIconElement = document.querySelector(
      ".table_of_content-icon.cross",
    );
    const contentElement = document.querySelector(".wp-sidebar.mobile");

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
  tableOfContent();
});
