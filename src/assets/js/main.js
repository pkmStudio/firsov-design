


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
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
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

 
