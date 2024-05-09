$(function () {
  const modalElement = document.querySelector(".modal");

  function stopVideo (element) {
    const iframe = element.querySelector('iframe');
    const video = element.querySelector('video');
    if (iframe) {
      const iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
    if (video) {
      video.pause();
    }
  };
  
  function checkModalToggle(element) {
    const config = { attributes: true, attributeFilter: ["style"] };

    const callback = (mutationList) => {
      for (const _ of mutationList) {
        if(element.style.display === "none") {
          stopVideo(element);
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(element, config);
  };
  checkModalToggle(modalElement);
});
