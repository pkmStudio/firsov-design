async function loadComponents() {
    for (const el of document.querySelectorAll("[data-include]")) {
        const file = el.getAttribute("data-include");
        const response = await fetch(file);
        console.log(response);
        const html = await response.text();

        // Создаем контейнер для временного парсинга
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;

        // Заменяем `el` его содержимым
        el.replaceWith(...tempElement.childNodes);
    }
}

// Загружаем компоненты после загрузки страницы
window.onload = loadComponents;
