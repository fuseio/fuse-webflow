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

  const menuBGOffset = 3;
  const isLandingPage =
    !window.location.pathname || window.location.pathname === "/";

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
      $(currentLink).data("is-nav-dropdown-center") && mouse === "enter"
        ? horizontal / 2
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

      if (isMenuBGTransition) {
        menuBG.addClass("has-transition");
      }
      menuWrapperClass.addClass("has-child");
      menuClass.addClass("has-collpase");
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
          if (isMenuBGTransition) {
            menuBG.removeClass("has-transition");
          }
          menuWrapperClass.removeClass("has-child");
          menuClass.removeClass("has-collpase");
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
  safeExecute(animateJoinImage);
});
