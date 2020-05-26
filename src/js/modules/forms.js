import checkNumImputs from './checkNumImputs';
const forms = (state) =>{

   const form = document.querySelectorAll('form'),
   inputs = document.querySelectorAll('input');


checkNumImputs('input[name = "user_phone"]');

   const message = {
    loading: 'Загрузка...',
    success: 'Спасибо мы скоро с вами свяжемся!',
    failure: 'Что-то пошлно не так...'
   };
//функция отправки данных
   const postData = async (url, data) =>{
    document.querySelector('.status').innerHTML = message.loading;
    let res = await fetch(url, {
        method: "POST",
        body: data
    });
    return await res.text();
   };
//отчистка поля
   const clearInputs = () => {
       inputs.forEach(item => {
           item.value = '';
       });
   };


   form.forEach(item => {
    item.addEventListener('submit', (e) => {
        e.preventDefault(); 
        //создание элемента под контентом 
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        item.appendChild(statusMessage);

        const formData = new FormData(item);
        if (item.getAttribute('data-calc') === "end") {
            for (let key in state) {
                formData.append(key, state[key]);
            }
        }
        //отправка на сервер
        postData('assets/server.php', formData)
        .then(res => {
            console.log(res);
            statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
            clearInputs();
            setTimeout(() => {
                statusMessage.remove();
            }, 5000);
        });
    });
   });
};







export default forms;