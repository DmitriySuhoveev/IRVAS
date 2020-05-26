# IRVAS

Проект представляет собой одностраничный сайт с реализацией модальных окон, таймера, отправки данных на сервер, и других разных взаимодействий на странице.
Сборка проекта проводилась с помощью таск-менеджера GULP и тестирование проекта с помощью MAMP'a.
Техническое задание- https://docs.google.com/document/d/1lRYlblSIz7fPdWEChsItL8jdS3ltTR6K-FxB2rHVHBY/edit

Все Js файлы находятся в папке src/js

MAIN.JS
Главный js файл main.js. Тут мы импортируем все наши модули из папки modules и вызываем разные функции.

MODALS.JS
Файл modals.js в папке modules содержит основную функцию bindModal содержащий 4 аргумента:
1. triggerSelector - отвечает за событие клика на элемент
2. modalSelector - отвечает за модальное окно
3. closeSelector - отвечает за закртыие модального окна нажатием на крестик
4. closeClickOverlay - отвечает за зактие модального окна через клик на подложку
Пример вызова:
bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
Так же в этом файле содержится функция  showModalByTime  которая через 1 минуту после прибывания на сайте, автоматически показывает модально окно пользователю

FORMS.JS
Файл forms.js в папке modules отвечает за отправку формы, которую заполнил пользователь данными на сервер
checkNumImputs - функция проверяет поля на 'Только числа'.
При попытке отправить данные на сервер, пользователь может получить 3 сообщения в зависимости от результата отправки(Загрузка...   Спасибо мы скоро с вами свяжемся!   Что-то пошлно не так...     )
PostData содержит переменную res, это то, что мы получаем при отправке,
она использует метод fetch() который принимает url-адресс и данные method: "POST"  и body: data.
При вызове PostData мы получаем текст и сообщение об успешной отправке success или с помощью catch - failure
После отправки, поля отчищаются и сообщение об отправке удаляются.

TABS.JS
Файл tabs.js в папке modules отвечает за табы  на странице, и их работу.
Функция tabs содержит 5 аргументов:
1.headerSelector - содержит список элементов
2.tabSelector - сам элемент
3.contentSelector - контент элемента
4.activeClass - активность элемента
5.displays - возможность закртытие модального окна через подложку(true или false)
Функция hideTabContent скрывает неактивные формы
Функция 
function showTabContent(i = 0) {
                content[i].style.display = display;
                tab[i].classList.add(activeClass);
            } 
 первоначально показывает первую форму-она активна, после клика пользователем на другую форму, изменяется значение i  и меняется активность формы 
   Обработчик событий который проверяет нажатие на элемент и в зависимости от того куда нажал пользователь, показывает нужный элемент и скрывая другой
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


IMAGES.JS
Файл images.js в папке modules отвечает за работу фотографий на странице. При клике на фото, подложка становистя недоступной, а сама фотография увеличивается.
    
    workSection.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target; //проверка на нажатие

        if(target && target.classList.contains('preview')){
            imgPopup.style.display ='flex';
            const path = target.parentNode.getAttribute('href');//нажатие на картинки, это нажатие на ссылки на картинки
            bigImage.setAttribute('src', path);
        }

        if(target && target.matches('div.popup')){
            imgPopup.style.display = 'none';
        }

    });

changeModalState.js
Файл changeModalState.js отвечает за полученные данные сервером от пользователя(Форма балкона, Ширина, Высота, Тип, Состояние)
тут функция принимает 3 параметра (event-событие клика, elem-элемент, prop- свойства).

function bindActionToElems (event, elem, prop) {

        elem.forEach((item, i) => {
            item.addEventListener(event, () =>{
                switch(item.nodeName){
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if(item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state [prop] = "Холодноe" : state[prop] = "Тёплое";
                            elem.forEach((box, j ) => {
                                box.checked = false;
                                if(i == j) {
                                    box.checked = true;
                                }
                            });
                            
                        }else {
                            state[prop]= item.value;
                        }
                        break;

                        case 'SELECT': 
                            state[prop]= item.value;
                        break;
                }

                console.log(state);
            });
        });
    }

TIMER.JS
Файл TIMER.JS c отвечает за работу таймера на странице. 
Формула: 
const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              seconds = Math.floor((t/1000) % 60),
              minutes = Math.floor((t/1000/60) % 60),
              hours = Math.floor((t/(1000 * 60 * 60)) % 24),
              days = Math.floor((t/(1000 * 60 * 60 * 24)));

checkNumIputs.js
Файл checkNumIputs.js отвечает за проверку некоторыйх полей на ТОЛЬКО ЧИСЛА

const checkNumImputs = (selector) => {
    const numIputs = document.querySelectorAll(selector);

    numIputs.forEach(item => {
        item.addEventListener('input', () => {
         item.value = item.value.replace(/\D/, ''); //регулярное выражение
        });
    });
};



