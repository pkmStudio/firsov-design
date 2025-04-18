
document.querySelectorAll('textarea').forEach(textarea => {
    console.log(textarea);
    textarea.addEventListener('input', function() {
        this.style.height = this.scrollHeight + 'px'; // Установка новой высоты
    });
});
    
