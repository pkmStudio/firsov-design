document.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('videoWidget');
    const popup = document.getElementById('videoPopup');
    const popupContent = popup.querySelector('.video-popup__content');
    const closeBtn = popup.querySelector('.video-popup__close');

    // Создаем один video элемент и переиспользуем
    const video = document.createElement('video');
    video.src = "https://firsov.design/wp-content/themes/firsov-main/assets/video/video-teaser.mp4";
    video.type = "video/mp4";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('preload', 'metadata');

    // Добавляем в виджет
    widget.appendChild(video);

    // Автовоспроизведение при попадании в зону видимости (через 3 секунды)
    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                video.play().catch(e => console.log('Autoplay blocked:', e));
                widget.classList.add('visible');
                observer.disconnect();
            }
        }, {
            rootMargin: '200px',
            threshold: 0.01
        });

        observer.observe(widget);
    }, 3000);

    // Перемещаем видео в попап
    widget.addEventListener('click', () => {
        video.muted = false;
        video.controls = true;
        video.currentTime = 0;

        popupContent.insertBefore(video, closeBtn);
        popup.classList.add('active');
        video.play().catch(e => console.log('Popup play error:', e));
    });

    // Закрытие попапа
    const closePopup = () => {
        popup.classList.remove('active');
        video.pause();
        video.controls = false;
        video.muted = true;

        widget.appendChild(video);
    };

    closeBtn.addEventListener('click', closePopup);

    popup.addEventListener('click', (e) => {
        if (!e.target.closest('.video-popup__content')) closePopup();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) closePopup();
    });
});







document.addEventListener('DOMContentLoaded', function() {
    // Настройки Intersection Observer
    const observerOptions = {
        threshold: 0.3, // Срабатывает когда 10% элемента видно
        rootMargin: '0px 0px -50px 0px' // Небольшой отступ снизу
    };

    // Функция-обработчик
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Можно отключить наблюдение после срабатывания
                observer.unobserve(entry.target);
            }
        });
    };

    // Создаем наблюдатель
    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    // Находим все заголовки и добавляем наблюдение
    const headings = document.querySelectorAll('._h2:not(.animated)');
    headings.forEach(heading => {
        observer.observe(heading);

        // Добавляем случайную задержку для эффекта "каскада" (опционально)
        heading.style.transitionDelay = `${Math.random() * 0.3}s`;
    });

    // Инициализация анимации для уже видимых элементов
    const checkVisible = () => {
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                heading.classList.add('animated');
            }
        });
    };

    // Проверяем при загрузке
    checkVisible();

    // И при ресайзе (на случай динамического контента)
    window.addEventListener('resize', checkVisible);
});

if (!window.__APP_INITIALIZED__) {
    window.__APP_INITIALIZED__ = true;

    // здесь инициализация
    console.log("App initialized");

    // например:
    // const modal = new Modal();
}



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

  if (slider) {
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
  }




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

  if(leftArrow || rightArrow) {
  leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
    updateCards();
  });

  rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
    updateCards();
  });

  updateCards(); // Initialize cards
  }



  const tabButtons = document.querySelectorAll('.tab-button');
  const projectCards = document.querySelectorAll('.project-card');

  if(tabButtons) {
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
  }
  

(function() {
  const BREAKPOINT = 648;
  let moved = false;

  function reorder() {
    const w = window.innerWidth;
    if (w <= BREAKPOINT && !moved) {
      moved = true;

      // Находим элементы
      const bread       = document.querySelector('.info__bread');
      const title       = document.querySelector('.info__about-title');
      const tabs        = document.querySelector('.info__about-tabs');
      const mainDesc    = document.querySelector('.info__about-main-desc');
      const personTexts = document.querySelectorAll('.info__person-text');
      const bigImageSec = document.querySelector('.project__big-image');
      const accentDescs = document.querySelectorAll('.info__about-accent-desc');
      const gallerySec  = document.querySelector('.project-media');

      // Проверяем обязательные элементы перед перестановкой
      if (bread && title && tabs && mainDesc && bigImageSec && gallerySec) {
        // 1. Основной блок текста
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('_container');

        [bread, title, tabs, mainDesc].forEach(el => {
          if (el) textWrapper.appendChild(el);
        });

        personTexts.forEach(el => {
          if (el) textWrapper.appendChild(el);
        });

        bigImageSec.parentNode.insertBefore(textWrapper, bigImageSec);
      }

      // 2. Акцентные абзацы
      if (accentDescs.length > 0 && gallerySec) {
        const accentWrapper = document.createElement('div');
        accentWrapper.classList.add('_container');

        accentDescs.forEach(p => {
          if (p) accentWrapper.appendChild(p);
        });

        gallerySec.parentNode.insertBefore(accentWrapper, gallerySec);
      }
    }
  }

  window.addEventListener('load', reorder);
  window.addEventListener('resize', reorder);
})();

/**
 * Класс для управления модальным окном.
 * @class
 */
class Modal {
    /**
     * Создает экземпляр модального окна.
     * @param {string} modalSelector - Селектор модального окна.
     * @param {string} popupSelector - Селектор попапа внутри модального окна.

     * @param {string} closeButtonSelector - Селектор кнопки закрытия модального окна.
     * @param {string} submitButtonSelector - Селектор кнопки отправки формы.

     * @param {string} openButtonSelector - Селектор кнопки открытия модального окна.
     */
    constructor(modalSelector, popupSelector, closeButtonSelector, submitButtonSelector, openButtonSelector) {
        // Инициализация элементов
        this.modal = document.querySelector(modalSelector);
        this.popup = document.querySelector(popupSelector);

        this.scrollPosition = 0; // Для хранения позиции скролла

        if (!this.modal || !this.popup ) {
            console.error('Один или несколько элементов не найдены на странице.');
            return;
        }

        // Селекторы для кнопок
        this.closeButtonSelector = closeButtonSelector;
        this.submitButtonSelector = submitButtonSelector;
        this.openButtonSelector = openButtonSelector;

        // Привязка контекста для обработчиков событий
        this.handleModalEvents = this.handleModalEvents.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);

        // Инициализация событий
        this.init();
    }

    /**
     * Инициализирует обработчики событий.
     * @private
     */
    init() {
        document.addEventListener('click', this.handleModalEvents);
        document.addEventListener('keydown', this.handleModalEvents);
    }

    /**
     * Открывает модальное окно и блокирует прокрутку страницы.
     */
    openModal() {
        if (this.modal && !this.modal.classList.contains('active')) {
            this.modal.classList.add('active');
            // Блокируем прокрутку страницы
            this.scrollPosition = window.pageYOffset;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${this.scrollPosition}px`;
        }
    }

    /**
     * Закрывает модальное окно и восстанавливает прокрутку страницы.
     */
    closeModal() {
        if (this.modal && this.modal.classList.contains('active')) {
            this.modal.classList.remove('active');
            // Восстанавливаем прокрутку страницы
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scrollTo(0, this.scrollPosition);
        }
    }

    /**
     * Обрабатывает успешную отправку формы CF7.
     */
    handleFormSubmission() {
        // if (this.response) {
        //     this.response.classList.add('active');
        // }
    }

    /**
     * Обрабатывает невалидную отправку формы CF7.
     */
    // handleFormInvalid() {
    //     if (this.response) {
    //         this.response.classList.remove('active');
    //     }
    // }

    /**
     * Обрабатывает события кликов и нажатий клавиш.
     * @param {Event} e - Событие.
     * @private
     */
    handleModalEvents(e) {
        // Обработка кликов
        if (e.type === 'click') {
            const withinBoundaries = e.composedPath().includes(this.popup);

            // Открытие модального окна
            if (e.target.closest(this.openButtonSelector)) {
                this.openModal();
            }

            // Закрытие модального окна
            if ((e.target.closest(this.closeButtonSelector) ||
                (!withinBoundaries && !e.target.closest(this.openButtonSelector))) && this.modal.classList.contains('active')) {
                this.closeModal();
            }

            // Обработка кнопки "Заполнить снова"
            // if (e.target.closest(this.resetButtonSelector)) {
            //     this.response.classList.remove('active');
            // }
        }

        // Обработка нажатия клавиши Escape
        if (e.type === 'keydown' && e.key === 'Escape') {
            this.closeModal();
        }
    }
}

// Инициализация модального окна после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const contactModal = new Modal(
        '.popup-wrap',
        '.popup',
        '.popup__close',
        '.popup__button--submit',
        '.open__modal'
    );
});


// // Accordion

// //uses classList, setAttribute, and querySelectorAll
// //if you want this to work in IE8/9 youll need to polyfill these
// (function(){
//   var d = document,
//   accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
//   setAria,
//    setAriaAttr,
//   setAccordionAria,
//   switchAccordion,
//    skipClickDelay,
//   touchSupported = ('ontouchstart' in window),
//   pointerSupported = ('pointerdown' in window);
  
//   skipClickDelay = function(e){
//     e.preventDefault();
//     e.target.click();
//   }

//     setAriaAttr = function(el, ariaType, newProperty){
//     el.setAttribute(ariaType, newProperty);
//   };
//   setAccordionAria = function(el1, el2, expanded){
//     switch(expanded) {
//       case "true":
//         setAriaAttr(el1, 'aria-expanded', 'true');
//         setAriaAttr(el2, 'aria-hidden', 'false');
//         break;
//       case "false":
//         setAriaAttr(el1, 'aria-expanded', 'false');
//         setAriaAttr(el2, 'aria-hidden', 'true');
//         break;
//       default:
//         break;
//     }
//   };
// //function
// switchAccordion = function(e) {
  
//   e.preventDefault();

//   var thisQuestion = e.currentTarget;
//   var thisAnswer = thisQuestion.nextElementSibling;

//   if (!thisAnswer) return;

//   if (thisAnswer.classList.contains('is-collapsed')) {
//     setAccordionAria(thisQuestion, thisAnswer, 'true');
//   } else {
//     setAccordionAria(thisQuestion, thisAnswer, 'false');
//   }

//   thisQuestion.classList.toggle('is-collapsed');
//   thisQuestion.classList.toggle('is-expanded');
//   thisAnswer.classList.toggle('is-collapsed');
//   thisAnswer.classList.toggle('is-expanded');
//   thisAnswer.classList.toggle('animateIn');
// };
//   for (var i=0,len=accordionToggles.length; i<len; i++) {
//     if(touchSupported) {
//       accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
//     }
//     if(pointerSupported){
//       accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
//     }
//     accordionToggles[i].addEventListener('click', switchAccordion, false);
//   }
// })();
  document.addEventListener('DOMContentLoaded', function () {
                const triggers = document.querySelectorAll('.js-accordionTrigger');

                triggers.forEach(trigger => {
                    trigger.addEventListener('click', function (e) {
                        e.preventDefault();

                        const targetId = this.getAttribute('href').slice(1);
                        const target = document.getElementById(targetId);
                        if (!target) return;

                        const isExpanded = this.getAttribute('aria-expanded') === 'true';

                        // Закрыть все
                        triggers.forEach(t => {
                            const id = t.getAttribute('href').slice(1);
                            const el = document.getElementById(id);
                            if (!el) return;

                            t.setAttribute('aria-expanded', 'false');
                            t.classList.remove('is-expanded');
                            t.classList.add('is-collapsed');

                            el.setAttribute('aria-hidden', 'true');
                            el.classList.remove('is-expanded', 'animateIn');
                            el.classList.add('is-collapsed');
                        });

                        // Открыть текущий, если был закрыт
                        if (!isExpanded) {
                            this.setAttribute('aria-expanded', 'true');
                            this.classList.remove('is-collapsed');
                            this.classList.add('is-expanded');

                            target.setAttribute('aria-hidden', 'false');
                            target.classList.remove('is-collapsed');
                            target.classList.add('is-expanded', 'animateIn');
                        }
                    });
                });
            });
  document.addEventListener('DOMContentLoaded', function() {
        const overlay = document.querySelector('.map-overlay');
        if (overlay) {
            overlay.addEventListener('click', function() {
                this.classList.add('hidden');
            });
        }
    });