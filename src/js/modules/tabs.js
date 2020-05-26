const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display ='block') => {
    const   header = document.querySelector(headerSelector),
            tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector);
    //функция скрытия не активного контента
            function hideTabContent() {
                content.forEach(item => {
                    item.style.display = 'none';
                });
        
                tab.forEach(item => {
                    item.classList.remove(activeClass);
                });
            }
                //при открытии сайта первый таб будет всегда виден пользователю, дальше по нажатию меняется активность табов
            function showTabContent(i = 0) {
                content[i].style.display = display;
                tab[i].classList.add(activeClass);
            }
    
    hideTabContent();
    showTabContent();
//обработчик событий отвечает за активный и скрытый окнтент
    header.addEventListener('click', (e) => {
        const target = e.target;
        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, "")) || //регулярное выражение
        target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) { //регулярное выражение
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};


export default tabs;