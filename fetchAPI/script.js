function fetchAPIData() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then((response) => response.json())
        .then(data =>{
            const list = document.querySelector('#fill_list')

            // .map() é um método de array em JavaScriptb que percorre cada item do array original (data) e executa a função que você fornece para cada item, retornando um novo array com o resultado de cada execução 
            data.map((item) => {
                const li = document.createElement('li');

                //Atribuir o valor de item.id como o ID do elemento li
                li.setAttribute('id', item.id);
                li.innerHTML = item.title;
                list.appendChild(li);
            })
        })
}