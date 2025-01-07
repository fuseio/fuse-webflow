import { safeExecute, animateHeroNumbers, initSwiperBlog } from '../utils/helper';

function initInfiniteSlide() {
  $(".marquee_track").infiniteslide({
    pauseonhover: false,
    speed: 35,
  });
}

function initTestimonialsSwiper() {
  new Swiper("#home-testimonials", {
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

function initGA4ButtonEvents() {
  $("button").click(function () {
    if ($(this).data("event-name") !== undefined) {
      ga("send", "event", "button", "click", $(this).data("event-name"));
    }
  });
}

// Function to fetch data from a given URL
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

async function getBlogPosts() {
  const urlOfWebsite = "news.fuse.io";
  const apiURL = `https://${urlOfWebsite}/wp-json/wp/v2/posts?per_page=8`;
  const swiper = initSwiperBlog();

  try {
    const data = await fetchData(apiURL);
    const mediaPromises = data.map(post => 
      fetchData(`https://${urlOfWebsite}/wp-json/wp/v2/media/${post.featured_media}`)
        .catch(error => {
          console.error("Error fetching media:", error);
          return null;
        })
    );

    const mediaResults = await Promise.allSettled(mediaPromises);

    data.forEach((post, index) => {
      const postTitle = post.title.rendered;
      const postLink = post.link;
      const postDate = new Date(post.date).toLocaleDateString();

      let thumbnailURL = "";
      if (mediaResults[index].status === 'fulfilled' && mediaResults[index].value) {
        thumbnailURL = mediaResults[index].value.source_url;
      }

      $(".swiper-blog .swiper-wrapper").append(`
          <div class="swiper-slide">
            <a data-w-id="91356417-96af-cb6c-5320-36a4c9234229" href="${postLink}" target="_blank" class="home-blog w-inline-block">
              <img src="${thumbnailURL}" loading="lazy" data-w-id="91356417-96af-cb6c-5320-36a4c923422b" alt="${postTitle}" class="home-blog-image">
              <div class="home-blog-title">
                <p class="ws-p_16 body_text">${postDate}</p>
                <p class="ws-p_20 black semibold">${postTitle}</p>
              </div>
            </a>
          </div>
        `);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    swiper.update();
  }
}

function childObserver(selector = ".section-blog .swiper-wrapper") {
  const targetNode = document.querySelector(selector);
  const config = { childList: true };

  const callback = () => {
    $(".lds-ellipsis").css({ display: "none" });
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

function animateHero() {
  const heading = document.querySelector(".home_hero-h1");
  const headingWords = heading.textContent.split(" ");
  heading.innerHTML = headingWords
    .map((headingWord) => `<span class="hero-h1-word">${headingWord}</span>`)
    .join(" ");

  const description = document.querySelector("#hero-description");
  const descriptionWords = description.textContent.split(" ");
  description.innerHTML = descriptionWords
    .map(
      (descriptionWord) =>
        `<span class="hero-description-word">${descriptionWord}</span>`
    )
    .join(" ");

  const tl = gsap.timeline();
  tl.to(".home_hero_logo-slide img", {
    duration: 0.3,
    opacity: 1,
    x: 0,
    stagger: 0.05,
  })
    .to("#hero-logo-title", { duration: 0.3, opacity: 1 }, "<")
    .to(".home_hero-h1", { duration: 0, opacity: 1 }, "<0.1")
    .to(".hero-h1-word", {
      duration: 0.5,
      opacity: 1,
      stagger: 0.2,
    }, "<")
    .to("#hero-description", { duration: 0, opacity: 1 })
    .to(".hero-description-word", {
      duration: 0.3,
      opacity: 1,
      y: 0,
      stagger: 0.05,
    })
    .to(".home-hero-button-wrap", {
      duration: 0.3,
      opacity: 1,
      y: 0,
      stagger: 0.1,
    })
    .to(".home-hero-announcement", {
      duration: 0.3,
      opacity: 1,
      y: 0,
      stagger: 0.1,
    });
}

function initHighlightSwiper() {
  new Swiper("#home-highlight-swiper", {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: "#home-highlight-right",
      prevEl: "#home-highlight-left",
    },
    pagination: {
      el: "#home-highlight-pagination",
      clickable: true,
    },
  });
}

function becomeAnOperatorHubSpotForm() {
  hbspt.forms.create({
    region: "eu1",
    portalId: "25596428",
    formId: "af52d829-753a-4dfc-9731-88dceec23bdc",
    target: ".hbspt-form",
    onFormReady: function ($form, e) {
      const utilizeSelector =
        'input[name="how_partnering_with_fuse_utilize_your_project_"]';
      const MIN_LENGTH_UTILIZE = 30;
      const largeDevice = window.matchMedia("(min-width: 992px)").matches;

      function errorMessage(element) {
        $(
          '<ul class="no-list hs-error-msgs inputs-list" role="alert"><li><label class="hs-error-msg hs-main-font-element">Minimum 30 characters are required.</label></li></ul>'
        ).insertAfter($(element).parent());
      }

      $(".hbspt-form fieldset").each(function (index) {
        if ($(this).text().includes("utm_")) {
          $(this).css("display", "none");
        }
      });

      $("<img />", {
        src: largeDevice
          ? "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/64da462e2ea93c58bc64fc9d_Frame%201000005457.svg"
          : "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/6550bb8609a9b72b15dfb3a3_Frame%201000005457.svg"
      }).appendTo($(".hbspt-form"));

      $('<p class="hbspt-form-title">Become an Operator</p>').prependTo(
        $(".hs-form")
      );

      $(".multi-container").each(function (index) {
        if ($(this).children().length === 2) {
          $(this).children().addClass("hs-form-radio-icon");
        }
      });

      $(".hs-form-field").each(function (index) {
        if ($(this).children().first().find("span").length === 1) {
          $("<span>(Optional)</span>").appendTo($(this).children().first());
        }
      });

      $(utilizeSelector).focusin(function () {
        const inputLen = $(this).val().length;
        const ul = $(this).parent().parent().find("ul");

        if (inputLen >= 1 && inputLen < MIN_LENGTH_UTILIZE && ul.length) {
          ul.remove();
        }
      });

      $(utilizeSelector).focusout(function () {
        const inputLen = $(this).val().length;
        const ul = $(this).parent().parent().find("ul");

        if (inputLen >= MIN_LENGTH_UTILIZE && ul.length) {
          ul.remove();
        } else if (
          inputLen >= 1 &&
          inputLen < MIN_LENGTH_UTILIZE &&
          !ul.length
        ) {
          errorMessage(this);
        }
      });

      document.querySelector(".hs-button").addEventListener(
        "click",
        function (event) {
          const inputLen = $(utilizeSelector).val().length;
          const ul = $(utilizeSelector).parent().parent().find("ul");

          if (inputLen < MIN_LENGTH_UTILIZE) {
            event.preventDefault();
          }

          if (inputLen >= 1 && inputLen < MIN_LENGTH_UTILIZE && !ul.length) {
            errorMessage($(utilizeSelector));
          }
        },
        false
      );
    }
  });
}

function initCarouselBannerSwiper() {
  new Swiper("#home-carousel_banner-swiper", {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: "#home_carousel_banner-right",
      prevEl: "#home-carousel_banner-left",
    },
    pagination: {
      el: "#home-carousel_banner-pagination",
      clickable: true,
    },
  });
}

function initCaseSwiper() {
  new Swiper("#case-swiper", {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: "#case_slide-right",
      prevEl: "#case_slide-left",
    },
  });
}

window.Webflow?.push(async () => {
  safeExecute(initInfiniteSlide);
  safeExecute(initTestimonialsSwiper);
  safeExecute(initGA4ButtonEvents);
  safeExecute(getBlogPosts);
  safeExecute(childObserver);
  safeExecute(animateHero);
  safeExecute(initHighlightSwiper);
  safeExecute(animateHeroNumbers);
  // safeExecute(becomeAnOperatorHubSpotForm);
  safeExecute(initCarouselBannerSwiper);
  safeExecute(initCaseSwiper);
});
