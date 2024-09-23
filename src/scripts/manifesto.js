import { safeExecute, tableOfContent } from '../utils/helper';

function animateHeroImages() {
  const imageMap = {
    'manifesto': 'https://cdn.prod.website-files.com/63a6d0820bd1f472b4150067/66e7e4242ca153c065ee7e30_Illustration.svg',
    'broken': 'https://cdn.prod.website-files.com/63a6d0820bd1f472b4150067/66ea8c81638f6de7259703b6_Illustration.svg',
  };

  // Preload images
  Object.values(imageMap).forEach(url => {
    const img = new Image();
    img.src = url;
  });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== 'attributes' || mutation.attributeName !== 'class') return;

      const target = mutation.target;
      if (!target.classList.contains('manifesto_hero-bullet') || !target.classList.contains('w--current')) return;

      const sectionId = target.getAttribute('href').substring(1);
      const newImageUrl = imageMap[sectionId];
      if (!newImageUrl) return;

      const heroImage = document.querySelector('.manifesto_hero-image');
      if (!heroImage) return;

      if (heroImage.src === newImageUrl) return;

      heroImage.style.opacity = '0';
      setTimeout(() => {
        heroImage.src = newImageUrl;
        heroImage.style.opacity = '1';
      }, 300);
    });
  });

  const bulletContainers = document.querySelectorAll('.manifesto_hero-bullet');
  if (bulletContainers) {
    bulletContainers.forEach((container) => {
      observer.observe(container, { attributes: true, subtree: true, attributeFilter: ['class'] });
    });
  }
}

function scrollSubtableSectionIntoView() {
  const links = document.querySelectorAll('.manifesto_change_table-link');
  const subtableBullets = document.querySelectorAll('.manifesto_changer-subtable .manifesto_changer-bullet');
  const subSections = document.querySelectorAll('.manifesto_changer-content li');
  const subtableLinks = document.querySelectorAll('.manifesto_changer-subtable .manifesto_change_table-link');

  links.forEach(link => {
    link.addEventListener('click', () => {
      subtableBullets.forEach(subtableBullet => {
        subtableBullet.style.minWidth = '0';
        subtableBullet.style.height = '0';
      });

      subSections.forEach(subSection => {
        subSection.style.scrollMarginTop = '0px';
        subSection.style.fontWeight = 'normal';
      });
    });
  });

  subtableLinks.forEach(subtableLink => {
    subtableLink.addEventListener('click', () => {
      const sectionId = subtableLink.dataset.link;
      const targetSection = document.getElementById(sectionId);
      
      if (targetSection) {
        subtableLink.querySelector('.manifesto_changer-bullet').style.minWidth = '0.8rem';
        subtableLink.querySelector('.manifesto_changer-bullet').style.height = '0.8rem';

        targetSection.style.scrollMarginTop = '8rem';
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetSection.style.fontWeight = 'bold';
      }

      return false;
    });
  });
}

window.Webflow?.push(async () => {
  safeExecute(animateHeroImages);
  safeExecute(
    tableOfContent,
    document.querySelector(".table_of_content .manifesto_changer-sidebar")
  );
  safeExecute(scrollSubtableSectionIntoView);
});
