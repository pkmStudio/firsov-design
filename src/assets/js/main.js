


document.querySelectorAll('textarea').forEach(textarea => {
    console.log(textarea);
    textarea.addEventListener('input', function() {
        this.style.height = this.scrollHeight + 'px'; // Установка новой высоты
    });
});
    

   // Функция для бургер-меню (если ещё не добавлена)
   document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');
    console.log(burger);
    
  
    function toggleMenu() {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      // document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }
  
    burger.addEventListener('click' , toggleMenu);
  
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  });

    document.addEventListener('DOMContentLoaded', function() {
        const header = document.querySelector('.header');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) { // Если прокрутили больше 10px
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    });

 



  document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.consultation__wrapper');
    const leftBtn = document.querySelector('.consultation__arrow-left');
    const rightBtn = document.querySelector('.consultation__arrow-right');

    if (wrapper && leftBtn && rightBtn) {
      const cardWidth = 300; // ширина карточки + gap
      const gap = 10;

      leftBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
      });

      rightBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      });
    }
  });

  const slider = document.querySelector('.compare__slider');
  const before = document.querySelector('.compare__before');
  const wrapper = document.querySelector('.compare__wrapper');

  let isDragging = false;

  function updateSlider(x) {
    const rect = wrapper.getBoundingClientRect();
    let relativeX = x - rect.left;
    let percentage = (relativeX / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));

    before.style.width = `${percentage}%`;
    slider.style.left = `${percentage}%`;
  }

  // Mouse
  slider.addEventListener('mousedown', () => (isDragging = true));
  window.addEventListener('mouseup', () => (isDragging = false));
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // Touch
  slider.addEventListener('touchstart', () => (isDragging = true));
  window.addEventListener('touchend', () => (isDragging = false));
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });



  const cards = document.querySelectorAll('.consultation__card');
  const leftArrow = document.querySelector('.consultation__arrow-left');
  const rightArrow = document.querySelector('.consultation__arrow-right');

  let currentIndex = 0;

  function updateCards() {
    cards.forEach((card, index) => {
      card.classList.remove('consultation__card--white', 'consultation__card--black');
      if (index === currentIndex) {
        card.classList.add('consultation__card--white');
      } else {
        card.classList.add('consultation__card--black');
      }
    });
  }

  leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
    updateCards();
  });

  rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
    updateCards();
  });

  updateCards(); // Initialize cards


  const tabButtons = document.querySelectorAll('.tab-button');
  const projectCards = document.querySelectorAll('.project-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Удаляем активный класс у всех
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedTab = button.dataset.tab;

      projectCards.forEach(card => {
        if (selectedTab === 'all' || card.dataset.tabGroup === selectedTab) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  (function() {
    const BREAKPOINT = 648;
    let moved = false;

    function reorder() {
      const w = window.innerWidth;
      if (w <= BREAKPOINT && !moved) {
        moved = true;

        // Находим все нужные элементы
        const bread       = document.querySelector('.info__bread');
        const title       = document.querySelector('.info__about-title');
        const tabs        = document.querySelector('.info__about-tabs');
        const mainDesc    = document.querySelector('.info__about-main-desc');
        const personTexts = document.querySelectorAll('.info__person-text');
        const bigImageSec = document.querySelector('.project__big-image');
        const accentDescs = document.querySelectorAll('.info__about-accent-desc');
        const gallerySec  = document.querySelector('.project-media');

        // 1. Основной блок текста
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('_container');
        [bread, title, tabs, mainDesc].forEach(el => textWrapper.appendChild(el));
        personTexts.forEach(el => textWrapper.appendChild(el));

        // Вставляем его перед секцией с большим изображением
        bigImageSec.parentNode.insertBefore(textWrapper, bigImageSec);

        // 2. Акцентные абзацы
        const accentWrapper = document.createElement('div');
        accentWrapper.classList.add('_container');
        accentDescs.forEach(p => accentWrapper.appendChild(p));

        // Вставляем их перед галереей
        gallerySec.parentNode.insertBefore(accentWrapper, gallerySec);
      }
    }

    window.addEventListener('load', reorder);
    window.addEventListener('resize', reorder);
  })();


