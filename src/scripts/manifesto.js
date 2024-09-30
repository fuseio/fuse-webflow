import { safeExecute, tableOfContent } from '../utils/helper';

function animateHeroImages() {
  const imageMap = {
    'broken': 'https://cdn.prod.website-files.com/63a6d0820bd1f472b4150067/66ea8c81638f6de7259703b6_Illustration.svg',
    'web3': 'https://cdn.prod.website-files.com/63a6d0820bd1f472b4150067/66fa78ca06c7344f4bc35228_Illustration.svg',
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

      const sectionId = target.dataset.to;
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
  bulletContainers.forEach((container) => {
    observer.observe(container, { attributes: true, attributeFilter: ['class'] });
  });
}

function intersectSection() {
  const sections = document.querySelectorAll('.manifesto_detail, .manifesto_hero_header-wrapper');
  const bullets = document.querySelectorAll('.manifesto_hero-bullet');
  const tableLinks = document.querySelectorAll('.manifesto_change_table-link');
  
  function checkVisibility() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const id = section.id;

      if (section.classList.contains('manifesto_hero_header-wrapper')) {
        if (rect.top < 0 || rect.top > 100) return;
        updateElements(id);
        return;
      }

      // 5.5rem = 88px, 10px threshold
      if (Math.abs(rect.top - 88) >= 10) return;

      updateElements(id);
      section.style.opacity = '1';
      
      sections.forEach(otherSection => {
        if (otherSection === section || !otherSection.classList.contains('manifesto_detail')) return;
        otherSection.style.opacity = '0.5';
      });
    });
  }

  function updateElements(id) {
    bullets.forEach(bullet => {
      bullet.classList.toggle('w--current', bullet.dataset.to === id);
    });
    tableLinks.forEach(link => {
      link.classList.toggle('w--current', link.dataset.to === id);
    });
  }

  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
  checkVisibility();
}

function scrollToSection() {
  const bullets = document.querySelectorAll('.manifesto_hero-bullet');
  const tableLinks = document.querySelectorAll('.manifesto_change_table-link');
  const sections = document.querySelectorAll('.manifesto_detail, .manifesto_hero_header-wrapper');

  const scrollHandler = (e, element) => {
    e.preventDefault();
    const id = element.dataset.to;
    const section = Array.from(sections).find(section => section.id === id);
    if (section) {
      const yOffset = -5.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  bullets.forEach(bullet => {
    bullet.addEventListener('click', (e) => scrollHandler(e, bullet));
  });

  tableLinks.forEach(link => {
    link.addEventListener('click', (e) => scrollHandler(e, link));
  });
}

function initWCurrent() {
  const firstBullet = document.querySelector('.manifesto_hero-bullet');
  if (firstBullet) {
    firstBullet.classList.add('w--current');
  }
}

window.Webflow?.push(() => {
  safeExecute(initWCurrent);
  safeExecute(intersectSection);
  safeExecute(animateHeroImages);
  safeExecute(scrollToSection);
  safeExecute(
    tableOfContent,
    document.querySelector(".table_of_content .manifesto_changer-sidebar")
  );
});
