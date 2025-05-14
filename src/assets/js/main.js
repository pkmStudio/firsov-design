


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


/**
 * Класс для управления модальным окном.
 * @class
 */
class Modal {
    /**
     * Создает экземпляр модального окна.
     * @param {string} modalSelector - Селектор модального окна.
     * @param {string} popupSelector - Селектор попапа внутри модального окна.
     * @param {string} responseSelector - Селектор блока response.
     * @param {string} closeButtonSelector - Селектор кнопки закрытия модального окна.
     * @param {string} submitButtonSelector - Селектор кнопки отправки формы.
     * @param {string} resetButtonSelector - Селектор кнопки сброса формы.
     * @param {string} openButtonSelector - Селектор кнопки открытия модального окна.
     */
    constructor(modalSelector, popupSelector, responseSelector, closeButtonSelector, submitButtonSelector, resetButtonSelector, openButtonSelector) {
        // Инициализация элементов
        this.modal = document.querySelector(modalSelector);
        this.popup = document.querySelector(popupSelector);
        this.response = document.querySelector(responseSelector);
        this.scrollPosition = 0; // Для хранения позиции скролла

        if (!this.modal || !this.popup || !this.response) {
            console.error('Один или несколько элементов не найдены на странице.');
            return;
        }

        // Селекторы для кнопок
        this.closeButtonSelector = closeButtonSelector;
        this.submitButtonSelector = submitButtonSelector;
        this.resetButtonSelector = resetButtonSelector;
        this.openButtonSelector = openButtonSelector;

        // Привязка контекста для обработчиков событий
        this.handleModalEvents = this.handleModalEvents.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.handleFormInvalid = this.handleFormInvalid.bind(this);

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

        // Добавляем обработчики для событий CF7
        document.addEventListener('wpcf7mailsent', this.handleFormSubmission, false);
        document.addEventListener('wpcf7invalid', this.handleFormInvalid, false);
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
        if (this.response && this.response.classList.contains('active')) {
            this.response.classList.remove('active');
        }
    }

    /**
     * Обрабатывает успешную отправку формы CF7.
     */
    handleFormSubmission() {
        if (this.response) {
            this.response.classList.add('active');
        }
    }

    /**
     * Обрабатывает невалидную отправку формы CF7.
     */
    handleFormInvalid() {
        if (this.response) {
            this.response.classList.remove('active');
        }
    }

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
            if (e.target.closest(this.resetButtonSelector)) {
                this.response.classList.remove('active');
            }
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
        '.popup__response',
        '.popup__close',
        '.popup__button--submit',
        '.popup__button--reset',
        '.open__modal'
    );
});