import { safeExecute, initTippy, animateJoinImage } from "../utils/helper";

function navMenu() {
  // get elements
  let menuLink = $(".menu_dp-link");
  let content = $(".menu_dropdown_content");
  let menuBG = $(".menu_bg");
  let dropdownWrap = $(".menu_content");
  let menuArrow = $(".menu_arrow-wrap");
  let communityWrapper = $("#dropdown_menu-community");
  let community = $("#dropdown_menu-link-community");
  let socials = $("#dropdown_menu-socials");
  let dropdownMenuLinkIconClass = ".dropdown_menu-link_icon";
  const caseStudyWrapper = $("#dropdown_menu-case_study");
  const caseStudy = $("#dropdown_menu-link-case_study");
  const caseStudies = $("#dropdown_menu-case_studies");

  const menuBGOffset = 3;
  const menuBGOffsetLeft = 30;
  const isLandingPage =
    window.location.pathname === "/" ||
    window.location.pathname.includes("/home");

  gsap.defaults({
    duration: 0.4,
  });

  function revealDropdown(currentLink, currentContent) {
    dropdownWrap.css("display", "flex");
    const xOffset = 70;
    const x = $(currentLink).data("is-nav-dropdown-center")
      ? currentLink.offset().left - currentContent.outerWidth() / 2 + xOffset
      : currentLink.offset().left + menuBGOffset;
    gsap.set(menuArrow, {
      width: currentLink.outerWidth(),
      x: currentLink.offset().left,
    });
    gsap.set(menuBG, {
      width: currentContent.outerWidth(),
      height: currentContent.outerHeight(),
      x,
    });
    gsap.set(content, {
      opacity: 0,
    });
    gsap.set(currentContent, {
      opacity: 1,
      x: "0em",
    });
  }

  function switchDropdown(currentLink, previousContent, currentContent) {
    const xOffset = 70;
    const x = $(currentLink).data("is-nav-dropdown-center")
      ? currentLink.offset().left - currentContent.outerWidth() / 2 + xOffset
      : currentLink.offset().left + menuBGOffset;
    gsap.to(menuArrow, {
      width: currentLink.outerWidth(),
      x: currentLink.offset().left,
    });
    gsap.to(menuBG, {
      width: currentContent.outerWidth(),
      height: currentContent.outerHeight(),
      x,
    });
    // invert moveDistance if needed
    let moveDistance = 10;
    if (currentContent.index() < previousContent.index()) {
      moveDistance = moveDistance * -1;
    }
    gsap.fromTo(
      previousContent,
      { opacity: 1, x: "0em" },
      {
        opacity: 0,
        x: moveDistance * -1 + "em",
        duration: 0.3,
      },
    );
    gsap.fromTo(
      currentContent,
      { opacity: 0, x: moveDistance + "em" },
      {
        opacity: 1,
        x: "0em",
        duration: 0.3,
      },
    );
  }

  // Open dropdown animation
  let showDropdown = gsap.timeline({
    paused: true,
    onReverseComplete: () => {
      dropdownWrap.css("display", "none");
      menuLink.removeClass("active");
    },
  });
  showDropdown
    .from(dropdownWrap, { opacity: 0, rotateX: -10, duration: 0.2 })
    .to(menuArrow, { opacity: 1, duration: 0.2 }, "<");

  // Link Hover In
  menuLink.on("mouseenter", function () {
    // get elements
    let previousLink = menuLink.filter(".active").removeClass("active");
    let currentLink = $(this).addClass("active");
    let previousContent = content.filter(".active").removeClass("active");
    let currentContent = content.eq($(this).index()).addClass("active");
    // play animations
    showDropdown.play();
    if (previousLink.length === 0) {
      revealDropdown(currentLink, currentContent);
    } else if (previousLink.index() !== currentLink.index()) {
      switchDropdown(currentLink, previousContent, currentContent);
    }
  });

  // Menu Hover Out
  $(".menu_dp-wrap").on("mouseleave", function () {
    showDropdown.reverse();
  });

  function resizeMenuContainingSubmenu(mouse = "enter") {
    const currentLink = menuLink.filter(".active");
    const currentContent = content.eq(currentLink.index());

    const horizontal = currentLink.offset().left;
    const left =
      $(currentLink).data("is-nav-submenu-center") && mouse === "enter"
        ? (horizontal / 2) - menuBGOffsetLeft
        : horizontal + menuBGOffset;
    gsap.set(menuBG, {
      width: currentContent.outerWidth(),
      height: currentContent.outerHeight(),
      x: left,
    });
  }

  function subnav(
    menuClass,
    menuWrapperClass,
    submenuClass,
    menuTitle,
    submenuTitle,
    isMenuBGTransition = false,
  ) {
    // store mouse enter and leave
    const storage = {
      [menuTitle]: false,
      [submenuTitle]: false,
    };

    // Hover In
    menuClass.on("mouseenter", function () {
      storage[menuTitle] = true;
      const currentLink = menuLink.filter(".active");
      const isCenter = $(currentLink).data("is-nav-submenu-center")

      if (isMenuBGTransition) {
        menuBG.addClass("has-transition");
      }
      menuWrapperClass.addClass("has-child");
      if(isCenter) {
        menuClass.addClass("has-collpase-left");
      } else {
        menuClass.addClass("has-collpase");
      }
      if (isLandingPage) {
        menuClass.css("background-color", "#f3f3f3");
      } else {
        menuClass.css("background-color", "#ffffff");
      }
      menuClass
        .find(dropdownMenuLinkIconClass)
        .css({ opacity: "1", transform: "none" });
      submenuClass.addClass("has-visibility");

      resizeMenuContainingSubmenu();
    });

    submenuClass.on("mouseenter", function () {
      storage[submenuTitle] = true;
    });

    // Hover Out
    function hoverLeft() {
      setTimeout(function () {
        if (!storage[menuTitle] && !storage[submenuTitle]) {
          const currentLink = menuLink.filter(".active");
          const isCenter = $(currentLink).data("is-nav-submenu-center")
          
          if (isMenuBGTransition) {
            menuBG.removeClass("has-transition");
          }
          menuWrapperClass.removeClass("has-child");
          if(isCenter) {
            menuClass.removeClass("has-collpase-left");
          } else {
            menuClass.removeClass("has-collpase");
          }
          if (isLandingPage) {
            menuClass.css("background-color", "#ffffff");
          } else {
            menuClass.css("background-color", "#f3f3f3");
          }
          menuClass
            .find(dropdownMenuLinkIconClass)
            .css({ opacity: "0", transform: "translate(-.375rem)" });
          submenuClass.removeClass("has-visibility");

          resizeMenuContainingSubmenu("leave");
        }
      }, 100);
    }

    menuClass.on("mouseleave", function () {
      storage[menuTitle] = false;
      hoverLeft();
    });

    submenuClass.on("mouseleave", function () {
      storage[submenuTitle] = false;
      hoverLeft();
    });
  }
  subnav(community, communityWrapper, socials, "community", "socials");
  subnav(caseStudy, caseStudyWrapper, caseStudies, "caseStudy", "caseStudies");
}

function submitHubspotForm({ form, email, success, error }) {
  // Event listener for form submission
  $(form).submit(function (event) {
    event.preventDefault();
    console.log(form, email);

    // Prepare the form data
    var formData = {
      submittedAt: Date.now(),
      fields: [{ name: "email", value: $(email).val() }],
    };

    // Make the API request
    $.ajax({
      url: "https://api.hsforms.com/submissions/v3/integration/submit/25596428/7806dbb4-bf5d-4fd3-8589-4e125c0e3e79",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function () {
        $(form).css("display", "none");
        $(success).css("display", "block");
      },
      error: function () {
        $(form).css("display", "none");
        $(error).css("display", "block");
      },
    });
  });
}

function resizeHubspotOperatorForm() {
  const modalDialogue = ".modal-dialogue.modal-dialogue-home";
  $(modalDialogue).ready(function () {
    const modalDialogueSelector = document.querySelector(modalDialogue);

    const resizewatcher = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width) {
          setTimeout(() => {
            const modalDialogueTop =
              modalDialogueSelector.getBoundingClientRect().top;
            if (modalDialogueTop < 0) {
              const modalDialogueTopPositive = modalDialogueTop * -1;
              modalDialogueSelector.style.top = `calc(${modalDialogueTopPositive}px + 5rem)`;
            }
          }, 200);
        }
      }
    });
    if (modalDialogueSelector) {
      resizewatcher.observe(modalDialogueSelector);
    }
  });
}

function navbar() {
  const topnav = ".topnav";
  if (!document.querySelector(topnav)) {
    return;
  }

  let menuContentOpacityValue = 0;

  // Hide on Scroll
  let prevScrollpos = window.pageYOffset;

  window.addEventListener("scroll", function () {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos >= currentScrollPos) {
      document.querySelector(topnav).style.top = "0";
    } else if (menuContentOpacityValue !== 1) {
      document.querySelector(topnav).style.top = `-${$(topnav).outerHeight(
        true,
      )}px`;
    }
    prevScrollpos = currentScrollPos;

    // Navbar background color
    if (currentScrollPos > 5) {
      $(".navbar-bg").css({
        "background-color": "rgba(255, 255, 255, 0.7)",
        "backdrop-filter": "blur(10px)",
      });
    } else {
      $(".navbar-bg").css({
        "background-color": "transparent",
        "backdrop-filter": "blur(0)",
      });
    }
  });

  // Prevent from hiding on scroll when Navbar Menu Content is Open
  const navbarComponent = document.querySelector(".navbar_component");

  const config = { attributes: true, childList: true, subtree: true };

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.target.className === "menu_content") {
        const menuContentStyle = mutation.target.attributes[1].value;
        const opacityPattern = /opacity:\s*([\d.]+)/;
        const match = menuContentStyle.match(opacityPattern);

        if (match && match[1]) {
          menuContentOpacityValue = parseFloat(match[1]);
        }
      }
    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(navbarComponent, config);
}

function initCaseStudiesSwiper() {
  new Swiper("#home-case_studies", {
    slidesPerView: 1.2,
    spaceBetween: 40,
    rewind: true,
    grabCursor: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
}

function newsletterPopup() {
  let scrollPosition = 0;
  let ticking = false;
  const triggerPercentage = 75;
  const day1 = 86400000;

  function onScroll(scroll_pos) {
    const h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight";
    const percent =
      ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    const popupLastShown = window.localStorage.getItem(
      "newsletter-popup-shown-date",
    );
    const timeSinceLastShown = new Date().getTime() - popupLastShown;

    if (
      percent > triggerPercentage &&
      (!popupLastShown || timeSinceLastShown > day1)
    ) {
      window.localStorage.setItem(
        "newsletter-popup-shown-date",
        new Date().getTime(),
      );
      document.getElementById("newsletter-popup").style.display = "flex";
    }
  }

  window.addEventListener("scroll", function () {
    scrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll(scrollPosition);
        ticking = false;
      });
      ticking = true;
    }
  });
}
function mobileNavbar() {
  // Only run for mobile breakpoints
  const navbarComponent = document.querySelector(".navbar_component");
  if (!navbarComponent) return;

  // Inject custom CSS for the redesigned mobile navbar (gokite.ai-style)
  if (!document.getElementById("fuse-mobile-navbar-styles")) {
    const style = document.createElement("style");
    style.id = "fuse-mobile-navbar-styles";
    style.textContent = `
@media screen and (max-width: 991px) {
  /* Replace the default 3-line toggle with our SVG hamburger/cross morph */
  .navbar_menu-toggle .menu_toggle-icon { display: none !important; }
  .navbar_menu-toggle .fuse-mobile-menu-icon {
    display: block;
    width: 2rem;
    height: 2rem;
    color: #000;
    transition: transform 0.5s ease;
  }
  .navbar_menu-toggle .fuse-mobile-menu-icon .line {
    fill: none;
    stroke: currentColor;
    stroke-width: 5.5px;
    stroke-linecap: round;
    transition: stroke-dasharray 0.4s, stroke-dashoffset 0.4s;
  }
  .navbar_menu-toggle .fuse-mobile-menu-icon .line:nth-child(1) { stroke-dasharray: 40 160; }
  .navbar_menu-toggle .fuse-mobile-menu-icon .line:nth-child(2) { stroke-dasharray: 40 142; transform-origin: 50% 50%; transition: transform 0.4s; }
  .navbar_menu-toggle .fuse-mobile-menu-icon .line:nth-child(3) { stroke-dasharray: 40 85; transform-origin: 50% 50%; transition: transform 0.4s, stroke-dashoffset 0.4s; }
  .navbar_menu-toggle.is-open .fuse-mobile-menu-icon { transform: rotate(45deg); }
  .navbar_menu-toggle.is-open .fuse-mobile-menu-icon .line:nth-child(1) { stroke-dashoffset: -64px; }
  .navbar_menu-toggle.is-open .fuse-mobile-menu-icon .line:nth-child(2) { transform: rotate(90deg); }
  .navbar_menu-toggle.is-open .fuse-mobile-menu-icon .line:nth-child(3) { stroke-dashoffset: -64px; }

  /* Full-screen white overlay for the mobile menu */
  .navbar_component .w-nav-overlay { background-color: transparent; }
  .navbar_component.is-mobile-open .w-nav-overlay {
    position: fixed !important;
    inset: 0 !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    background-color: #ffffff !important;
    z-index: 999 !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    display: block !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .navbar_component.is-mobile-open .w-nav-overlay .navbar_menu {
    background-color: #ffffff !important;
    width: 100% !important;
    min-height: 100vh;
    min-height: 100dvh;
    padding: 10rem 1.5rem 2rem !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    transform: none !important;
    box-sizing: border-box;
  }

  /* Reset default backgrounds & borders for menu items */
  .navbar_component.is-mobile-open .navbar_menu-dropdown,
  .navbar_component.is-mobile-open .menu_dp-link,
  .navbar_component.is-mobile-open .dropdown_menu,
  .navbar_component.is-mobile-open .menu_dp-wrap {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .navbar_component.is-mobile-open .menu_dp-wrap {
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 1.25rem !important;
  }

  .navbar_component.is-mobile-open .navbar_menu-dropdown {
    width: 100% !important;
    max-width: 22rem;
    text-align: center;
  }

  .navbar_component.is-mobile-open .menu_dp-link {
    width: 100% !important;
    padding: 0.5rem 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.5rem !important;
    font-weight: 700 !important;
    font-size: 1.125rem !important;
    color: #000 !important;
    cursor: pointer;
  }

  /* Animated caret */
  .navbar_component.is-mobile-open .menu_dp-link .dropdown_toggle-icon-alt {
    width: 1rem !important;
    height: 1rem !important;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    color: #000;
  }
  .navbar_component.is-mobile-open .menu_dp-link .dropdown_toggle-icon-alt svg {
    width: 100%;
    height: 100%;
  }
  .navbar_component.is-mobile-open .menu_dp-link.is-mobile-open .dropdown_toggle-icon-alt {
    transform: rotate(180deg);
  }

  /* Submenu (dropdown_menu) styles */
  .navbar_component.is-mobile-open .dropdown_menu {
    width: 100% !important;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 0.35s ease, opacity 0.3s ease, margin 0.3s ease;
    display: block !important;
    position: static !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .navbar_component.is-mobile-open .menu_dp-link.is-mobile-open + .dropdown_menu,
  .navbar_component.is-mobile-open .navbar_menu-dropdown.is-mobile-open .dropdown_menu {
    max-height: 2000px;
    opacity: 1;
    margin-top: 0.5rem !important;
    padding: 0.25rem 0 0.75rem !important;
  }

  .navbar_component.is-mobile-open .dropdown_menu-link {
    padding: 0.5rem 0.75rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    text-align: left !important;
    gap: 0.5rem;
  }

  /* Reduce icon image size for submenu items */
  .navbar_component.is-mobile-open .dropdown_menu-icon-alt {
    width: 1.5rem !important;
    height: 1.5rem !important;
    margin: 0 0.25rem 0 0 !important;
    flex: 0 0 auto;
  }
  .navbar_component.is-mobile-open .dropdown_menu-link_icon {
    width: 0.75rem !important;
    height: 0.75rem !important;
  }
  .navbar_component.is-mobile-open .dropdown_menu-title {
    font-size: 0.95rem !important;
  }
  .navbar_component.is-mobile-open .dropdown_menu-description {
    font-size: 0.8rem !important;
  }

  /* Hide the desktop arrow / hover background on mobile */
  .navbar_component.is-mobile-open .menu_arrow,
  .navbar_component.is-mobile-open .menu_bg,
  .navbar_component.is-mobile-open .menu_content,
  .navbar_component.is-mobile-open .dropdown_menu-spacer,
  .navbar_component.is-mobile-open .dropdown_menu-divider { display: none !important; }

  /* Mobile Fuse Console button at the bottom of the menu */
  .fuse-mobile-console-btn {
    display: none;
  }
  .navbar_component.is-mobile-open .fuse-mobile-console-btn {
    display: flex !important;
    align-items: center;
    justify-content: center;
    margin: 2.5rem auto 1rem;
    width: 80%;
    max-width: 22rem;
    height: 48px;
    border-radius: 999px;
    background-color: #1a1a1a;
    color: #ffffff !important;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid #1a1a1a;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  .navbar_component.is-mobile-open .fuse-mobile-console-btn:hover {
    background-color: #ffffff;
    color: #000 !important;
  }

  /* Hide the desktop Fuse Console button when the mobile menu is open (avoids duplicates) */
  .navbar_component.is-mobile-open .navbar_buttons .button.button-solid.navbar-button,
  .navbar_component.is-mobile-open .navbar_buttons .button-4.button-solid.navbar-button {
    display: none !important;
  }

  /* Lock body scroll when overlay is open */
  body.fuse-mobile-menu-open { overflow: hidden !important; }
}
`;
    document.head.appendChild(style);
  }

  // Replace the existing 3-line toggle icon with an animated SVG
  const toggleBtn = navbarComponent.querySelector(".navbar_menu-toggle");
  if (toggleBtn && !toggleBtn.querySelector(".fuse-mobile-menu-icon")) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "fuse-mobile-menu-icon");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "32");
    svg.setAttribute("height", "32");
    const paths = [
      "m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20",
      "m 30,50 h 40",
      "m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20",
    ];
    paths.forEach((d) => {
      const p = document.createElementNS(svgNS, "path");
      p.setAttribute("class", "line");
      p.setAttribute("d", d);
      svg.appendChild(p);
    });
    toggleBtn.appendChild(svg);
  }

  // Find the existing Fuse Console (desktop) button so we can clone its href/text
  const desktopConsoleBtn = navbarComponent.querySelector(
    ".navbar_buttons .button.button-solid.navbar-button, .navbar_buttons .button-4.button-solid.navbar-button"
  );

  // Append a Fuse Console button at the bottom of the mobile menu
  const mobileMenu = navbarComponent.querySelector(".navbar_menu");
  if (mobileMenu && !mobileMenu.querySelector(".fuse-mobile-console-btn")) {
    const link = document.createElement("a");
    link.className = "fuse-mobile-console-btn";
    link.href = desktopConsoleBtn ? desktopConsoleBtn.getAttribute("href") || "https://console.fuse.io" : "https://console.fuse.io";
    link.textContent = desktopConsoleBtn ? (desktopConsoleBtn.textContent || "").trim() || "Fuse Console" : "Fuse Console";
    link.target = desktopConsoleBtn?.getAttribute("target") || "_self";
    mobileMenu.appendChild(link);
  }

  // Animated submenu open/close on tap (mobile only)
  const dropdowns = navbarComponent.querySelectorAll(".navbar_menu-dropdown");
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector(".menu_dp-link");
    if (!link || link.dataset.fuseMobileBound === "1") return;
    link.dataset.fuseMobileBound = "1";
    link.addEventListener("click", (e) => {
      if (window.innerWidth > 991) return;
      if (!navbarComponent.classList.contains("is-mobile-open")) return;
      e.preventDefault();
      e.stopPropagation();
      const isOpen = link.classList.contains("is-mobile-open");
      // Collapse all
      dropdowns.forEach((d) => {
        const l = d.querySelector(".menu_dp-link");
        l?.classList.remove("is-mobile-open");
        d.classList.remove("is-mobile-open");
      });
      if (!isOpen) {
        link.classList.add("is-mobile-open");
        dropdown.classList.add("is-mobile-open");
      }
    });
  });

  // Track menu open state by observing the toggle's w--open class
  const updateOpenState = () => {
    const isOpen = toggleBtn?.classList.contains("w--open");
    navbarComponent.classList.toggle("is-mobile-open", !!isOpen);
    toggleBtn?.classList.toggle("is-open", !!isOpen);
    document.body.classList.toggle("fuse-mobile-menu-open", !!isOpen);
    if (!isOpen) {
      // Reset submenu state when closing
      dropdowns.forEach((d) => {
        d.classList.remove("is-mobile-open");
        d.querySelector(".menu_dp-link")?.classList.remove("is-mobile-open");
      });
    }
  };

  if (toggleBtn) {
    const obs = new MutationObserver(updateOpenState);
    obs.observe(toggleBtn, { attributes: true, attributeFilter: ["class"] });
  }

  // Reset state if viewport grows beyond mobile breakpoint
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
      navbarComponent.classList.remove("is-mobile-open");
      toggleBtn?.classList.remove("is-open");
      document.body.classList.remove("fuse-mobile-menu-open");
    }
  });
}


window.Webflow?.push(async () => {
  safeExecute(navMenu);
  safeExecute(submitHubspotForm, {
    form: "#wf-form-subscription-form",
    email: "#wf-form-subscription-form input[name='email']",
    success: ".footer_column-form .w-form-done",
    error: ".footer_column-form .w-form-fail",
  });
  safeExecute(submitHubspotForm, {
    form: "#wf-form-Newsletter-Popup-Form",
    email: "#wf-form-Newsletter-Popup-Form input[name='email']",
    success: "#wf-form-Newsletter-Popup-Form .w-form-done",
    error: "#wf-form-Newsletter-Popup-Form .w-form-fail",
  });
  safeExecute(resizeHubspotOperatorForm);
  safeExecute(navbar);
  safeExecute(initTippy);
  safeExecute(initCaseStudiesSwiper);
  safeExecute(newsletterPopup);
  safeExecute(mobileNavbar);
  safeExecute(animateJoinImage);
});
