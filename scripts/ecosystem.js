$(function () {
  function sortProjects() {
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
      "cmsload",
      (listInstances) => {
        const [listInstance] = listInstances;
        const items = listInstance.items;

        const projects = [];
        const badgeNewProjects = [];
        const badgeHotProjects = [];
        const generalProjects = [];

        items.forEach((item) => {
          const badgeNewElement = item.element.querySelector(
            ".ecosystem-project-badge.new",
          );
          const badgeHotElement = item.element.querySelector(
            ".ecosystem-project-badge.hot",
          );

          const badgeNewDisplay =
            window.getComputedStyle(badgeNewElement).display;

          if (badgeNewDisplay === "block") {
            badgeNewProjects.push(item.element);
          } else if (badgeHotElement) {
            badgeHotProjects.push(item.element);
          } else {
            generalProjects.push(item.element);
          }
        });

        function titleText(element) {
          return element
            .querySelector(".platform-card_title")
            .innerText.toLowerCase();
        }

        function compareTitles(a, b) {
          const aTitle = titleText(a);
          const bTitle = titleText(b);

          if (aTitle < bTitle) {
            return -1;
          }

          if (aTitle > bTitle) {
            return 1;
          }
          
          return 0;
        }

        badgeNewProjects.sort(compareTitles);
        badgeHotProjects.sort(compareTitles);
        generalProjects.sort(compareTitles);

        projects.push(
          ...badgeNewProjects,
          ...badgeHotProjects,
          ...generalProjects,
        );

        listInstance.clearItems();
        listInstance.addItems(projects);
      },
    ]);
  }
  sortProjects();
});
