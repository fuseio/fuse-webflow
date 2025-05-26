import { safeExecute } from '../utils/helper';

function initGsap() {
  gsap.registerPlugin(SplitText, ScrollTrigger);

  ScrollTrigger.defaults({
    start: 'top 50%',
    end: 'bottom 20%',
    scrub: 1,
    toggleActions: 'play none none reverse'
  });
}

function animateRevealParagraph() {
  const manifestoTexts = document.querySelectorAll('.manifesto_p');
  if (!manifestoTexts?.length) return;

  manifestoTexts.forEach(manifestoText => {
    const splitText = new SplitText(manifestoText, { type: 'words' });
    const words = splitText.words;

    gsap.set(words, { opacity: 0.1 });
    gsap.set(manifestoText, { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: manifestoText
      }
    });

    words.forEach((word) => {
      tl.to(word, { opacity: 1, duration: 0.5 }, '<0.1');
    });
  });
}

function animateRevealPartner() {
  const partnerImage = document.querySelector('.manifesto_essential-partners');
  const fuseImage = document.querySelector('.manifesto_essential-image.is-fuse');
  if (!partnerImage || !fuseImage) return;

  gsap.set(partnerImage, { scale: 0 });
  gsap.set(fuseImage, { scale: 1 });

  gsap.to(partnerImage, {
    scale: 2,
    scrollTrigger: {
      trigger: partnerImage
    }
  });

  gsap.to(fuseImage, {
    scale: 0.8,
    scrollTrigger: {
      trigger: fuseImage
    }
  });
}

window.Webflow?.push(() => {
  safeExecute(initGsap);
  safeExecute(animateRevealParagraph);
  safeExecute(animateRevealPartner);
});
