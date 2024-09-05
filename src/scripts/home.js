$(function () {
  function initInfiniteSlide() {
    $(".marquee_track").infiniteslide({
      pauseonhover: false,
      speed: 35,
    });
  }
  initInfiniteSlide();

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
  initTestimonialsSwiper();

  function joinImageAnimation() {
    const totalImages = 12;
    let decimal = 0.25;
    for (let i = 1; i <= totalImages; i++) {
      const currDelay = i * decimal;
      $(`.join-image_${i}`).css("animation-delay", `${currDelay}s`);
    }
  }
  joinImageAnimation();

  function initGA4ButtonEvents() {
    $("button").click(function () {
      if ($(this).data("event-name") !== undefined) {
        ga("send", "event", "button", "click", $(this).data("event-name"));
      }
    });
  }
  initGA4ButtonEvents();

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

    try {
      const data = await fetchData(apiURL);
      for (const post of data) {
        const postTitle = post.title.rendered;
        const postLink = post.link;
        const postThumbnail = post.featured_media;
        const postDate = new Date(post.date).toLocaleDateString();

        let thumbnailURL = "";
        try {
          const mediaData = await fetchData(
            `https://${urlOfWebsite}/wp-json/wp/v2/media/${postThumbnail}`
          );
          thumbnailURL = mediaData.source_url;
        } catch (error) {
          console.error("Error:", error);
        }

        $(".swiper-blog .swiper-wrapper").append(`
            <div class="swiper-slide">
              <a data-w-id="91356417-96af-cb6c-5320-36a4c9234229" href="${postLink}" target="_blank" class="home-blog w-inline-block">
                <img src="${thumbnailURL}" loading="lazy" data-w-id="91356417-96af-cb6c-5320-36a4c923422b" alt="${post.title.rendered}" class="home-blog-image">
                <div class="home-blog-title">
                  <p class="ws-p_16 body_text">${postDate}</p>
                  <p class="ws-p_20 black semibold">${postTitle}</p>
                </div>
              </a>
            </div>
          `);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  getBlogPosts();

  function childObserver(selector) {
    const targetNode = document.querySelector(selector);
    const config = { childList: true };

    const callback = () => {
      $(".lds-ellipsis").css({ display: "none" });
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }
  childObserver(".section-blog .swiper-wrapper");

  function stripHtml(text) {
    return new DOMParser()?.parseFromString(
      text,
      "text/html"
    )?.body?.textContent;
  }

  async function generalBlogSwiper() {
    const urlOfWebsite = "news.fuse.io";
    const totalPosts = 4;
    const apiURL = `https://${urlOfWebsite}/wp-json/wp/v2/posts?per_page=${totalPosts}`;

    new Swiper(".home-general-swiper", {
      slidesPerView: 1,
      rewind: true,
      grabCursor: true,
      observeParents: true,
      observeSlideChildren: true,
      observer: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    try {
      const data = await fetchData(apiURL);
      let currentPostFraction = 1;
      for (const post of data) {
        const postTitle = stripHtml(post.title.rendered);
        const postExcerpt = stripHtml(post.excerpt.rendered);
        const postThumbnail = post.featured_media;

        let thumbnailURL = "";
        try {
          const mediaData = await fetchData(
            `https://${urlOfWebsite}/wp-json/wp/v2/media/${postThumbnail}`
          );
          thumbnailURL = mediaData.source_url;
        } catch (error) {
          console.error("Error:", error);
        }

        $(".home-general-swiper .swiper-wrapper").append(`
            <div class="swiper-slide home-general-swiper-slide">
              <div class="home-general-item-banner">
                <img class="home-general-item-image" src="${thumbnailURL}" loading="lazy" alt="${postTitle}">
                <div class="home-general-pagination-fraction">
                  <p class="ws-p_16 body_text semibold">${currentPostFraction}</p>
                  <p class="ws-p_16 body_text semibold">/</p>
                  <p class="ws-p_16 body_text semibold">${totalPosts}</p>
                </div>
              </div>
              <div class="home-general-item-title">
                <p class="ws-p_24 black home-testimonial-p-bold">${postTitle}</p>
                <p class="ws-p_20">${postExcerpt}</p>
              </div>
            </div>
        `);
        currentPostFraction++;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // generalBlogSwiper();

  function animateHero() {
    const heading = document.querySelector(".home-hero-h1");
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
    tl.to(".home_hero-logo_wrapper img", {
      duration: 0.3,
      opacity: 1,
      x: 0,
      stagger: 0.05,
    })
      .to("#hero-logo-title", { duration: 0.3, opacity: 1 })
      .to(".home-hero-h1", { duration: 0, opacity: 1 })
      .to(".hero-h1-word", {
        duration: 0.5,
        opacity: 1,
        stagger: 0.2,
      })
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
  animateHero();
});
