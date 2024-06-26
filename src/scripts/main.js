$(function () {
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
  navMenu();

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
  submitHubspotForm({
    form: "#wf-form-subscription-form",
    email: "#wf-form-subscription-form input[name='email']",
    success: ".footer_column-form .w-form-done",
    error: ".footer_column-form .w-form-fail",
  });
  submitHubspotForm({
    form: "#wf-form-Newsletter-Popup-Form",
    email: "#wf-form-Newsletter-Popup-Form input[name='email']",
    success: "#wf-form-Newsletter-Popup-Form .w-form-done",
    error: "#wf-form-Newsletter-Popup-Form .w-form-fail",
  });

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
  resizeHubspotOperatorForm();

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
  navbar();

  function initTippy() {
    tippy("[data-tippy-content]", {
      placement: "bottom",
      arrow: true,
    });
  }
  initTippy();

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
  initCaseStudiesSwiper();

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
  newsletterPopup();

  function initSwiperBlog() {
    new Swiper(".swiper-blog", {
      slidesPerView: 1,
      spaceBetween: 40,
      rewind: true,
      grabCursor: true,
      observeParents: true,
      observeSlideChildren: true,
      observer: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: "#swiper-blog-right",
        prevEl: "#swiper-blog-left",
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 48,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 48,
        },
      },
    });
  }
  initSwiperBlog();

  function initGallerySwiper() {
    if (!window.location.pathname.includes("casestudies")) {
      return;
    }

    new Swiper("#case_studies-gallery", {
      slidesPerView: 1.2,
      spaceBetween: 40,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });
  }
  initGallerySwiper();

  function moreSuccessStories() {
    if (!window.location.pathname.includes("casestudies")) {
      return;
    }

    const stories = [
      {
        name: "Freedom",
        nameImage:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed8d568a11ffe1399274aa_Image%20139.png",
        description: "Freedom: Real world assets for businesses",
        flag: "Thailand",
        flagImage:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed8ecdd2f4a08599955790_Frame%201000005445.svg",
        banner:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed8c4684b3fb349d6b7d6c_Frame%201000004852.png",
        link: `${window.location.origin}/casestudies/freedom`,
        exists: true,
      },
      {
        name: "Mystic Valley",
        nameImage:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed9ee9e2198cc571ee6293_image%2026.png",
        description: "Revolutionizing event payments with Freedom wallet",
        flag: "Thailand",
        flagImage:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed8ecdd2f4a08599955790_Frame%201000005445.svg",
        banner:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65ed9ee9a4f1df10ff246e9e_Frame%201000004792.png",
        link: `${window.location.origin}/casestudies/mystic-valley`,
        exists: true,
      },
      {
        name: "Sanduk",
        nameImage:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb282726cb0f88c030efc_Sanduk.svg",
        description:
          "Hold, send, and receive Digital Dollars in Kenya on Fuse Network.",
        flag: "Kenya",
        flagImage:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb283d2e2ac07348a674f_Frame%201000005443.svg",
        banner:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb283d2f4a08599a5577c_Frame%201000005150.png",
        link: `${window.location.origin}/casestudies/sanduk`,
        exists: true,
      },
      {
        name: "Zneakrz",
        nameImage:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb38af518f11425f59dbb_ZNEAKRZ.svg",
        description: "Frictionless web3 commerce with Zneakrz",
        flag: "United States",
        flagImage:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb38ac45647ad7dd06573_Frame%201000005443.svg",
        banner:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb38b370b0f7f3a1bec95_Frame%201000004852.png",
        link: `${window.location.origin}/casestudies/zneakrz`,
        exists: true,
      },
      {
        name: "Chromepay",
        nameImage:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb53358df5f9df9a8a86e_CHROMEPAY.svg",
        description:
          "Chromepay bridging financial services with unbanked communities using their decentralized identity solution",
        flag: "Ethiopia",
        flagImage:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb53358df5f9df9a8a872_Frame%201000005444.svg",
        banner:
          "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/65edb533726cb0f88c043f08_Frame%201000004852.png",
        link: `${window.location.origin}/casestudies/chromepay`,
        exists: true,
      },
    ];
    try {
      for (const post of stories) {
        if (!post.exists) {
          continue;
        }
        $(".swiper-blog .swiper-wrapper").append(`
            <div class="swiper-slide cs-blog-swiper-slide">
              <a href="${post.link}" target="_blank" class="cs-blog">
                <img src="${post.banner}" loading="lazy" alt="" class="cs-blog-image">
                <div class="cs-blog-title">
                	<div class="cs-blog-info">
                    <div class="cs-blog-title-image-wrapper">
                      <img src="${post.nameImage}" loading="lazy" alt="${post.name}" class="cs-blog-title-image">
                    </div>
                    <div class="cs-blog-description">
                      <p class="ws-p_18 body_text">${post.description}</p>
                    </div>
                  </div>
                  <img src="${post.flagImage}" loading="lazy" alt="" class="cs-blog-flag" data-tippy-content="${post.flag}">
                </div>
              </a>
            </div>
          `);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      initTippy();
    }
  }
  moreSuccessStories();
});
