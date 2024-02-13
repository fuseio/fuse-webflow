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
        .getPropertyValue("--ogp-road-grid-height"),
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

  function initTestimonialsSwiper() {
    new Swiper("#ogp-testimonials", {
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

  function becomeAnOperatorHubSpotForm() {
    hbspt.forms.create({
      region: "eu1",
      portalId: "25596428",
      formId: "6724bd0c-2f81-4db4-8e1e-d94078efbcc4",
      target: ".hbspt-form",
      onFormReady: function () {
        const utilizeSelector =
          'input[name="how_partnering_with_fuse_utilize_your_project_"]';
        const MIN_LENGTH_UTILIZE = 50;
        const largeDevice = window.matchMedia("(min-width: 992px)").matches;

        function errorMessage(element) {
          $(
            '<ul class="no-list hs-error-msgs inputs-list" role="alert"><li><label class="hs-error-msg hs-main-font-element">Minimum 50 characters are required.</label></li></ul>',
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
            : "https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/6550bb8609a9b72b15dfb3a3_Frame%201000005457.svg",
        }).appendTo($(".hbspt-form"));

        $('<p class="hbspt-form-title">Become an Operator</p>').prependTo(
          $(".hs-form"),
        );

        $(".multi-container").each(function () {
          if ($(this).children().length === 2) {
            $(this).children().addClass("hs-form-radio-icon");
          }
        });

        $(".hs-form-field").each(function () {
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

            if (inputLen === 0) {
              return true;
            }

            if (inputLen < MIN_LENGTH_UTILIZE) {
              event.preventDefault();
            }

            if (inputLen >= 1 && inputLen < MIN_LENGTH_UTILIZE && !ul.length) {
              errorMessage($(utilizeSelector));
            }
          },
          false,
        );
      },
      onBeforeFormSubmit: function () {
        window.lintrk("track", { conversion_id: 15089298 });
      },
    });
  }
  becomeAnOperatorHubSpotForm();
});
