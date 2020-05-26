const images = () =>{

    const   imgPopup = document.createElement('div'),
            workSection = document.querySelector('.works'),
            bigImage = document.createElement('img');
    
    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);
    //позиционирование
    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    //получение большой картинки через appendChild
    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;

        if(target && target.classList.contains('preview')){
            imgPopup.style.display ='flex';
            const path = target.parentNode.getAttribute('href');//нажатие на картинки, это нажатие на ссылки на картинки
            bigImage.setAttribute('src', path);
        }

        if(target && target.matches('div.popup')){
            imgPopup.style.display = 'none';
        }

    });

};

export default images;