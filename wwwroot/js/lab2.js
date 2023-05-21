const uri = 'api/Genres'; // наше посилання за яким ми отримаємо список наших об'єктів
let genres = []; // глобальна змінна для зберігання лекторів

function getGenres() {
    fetch(uri) // звертається до апі, щоб отримати усіх лекторів
        .then(response => response.json())
        .then(data => _displayGenres(data))
        .catch(error => console.error('Unable to get fair locations.', error));
}

function addGenre() {
    // Отримує дані з інпутів за id 
    const addNameTextbox = document.getElementById('add-genreName');

    // створєю зміну лектора
    const genre = {
        genreName: addNameTextbox.value.trim(),
    };
    // метод POST
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genre)
    })
        then(response => response.json())
        .then(() => {
            getGenres();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add fair location.', error));
}

function deleteGenre(id) {
    // видаляє лектора за id і запитує зміни
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getGenres())
        .catch(error => document.getElementById('errorDB').innerHTML = error.toString());
}

function displayEditForm(id) {
    // пошук за id лектора
    const genre = genres.find(genre => genre.id === id);
    // вставляє дані в форми
    // УВАГА УВАГА
    // ТРЕБА ПИСАТИ genre.phone, а не genre.Phone як зазначено в классах, для перевірки, запустіть гет запрос
    // і подивіться як він повертає (зазвичай, перша літера стає маленькою)
    document.getElementById('edit-id').value = genre.id;
    document.getElementById('edit-genrename').value = genre.genreName;
    document.getElementById('editForm').style.display = 'block';

}

function updateGenre() {
    // метод PUT
    const genreId = document.getElementById('edit-id').value; // бере ID
    const genre = {
        id: parseInt(genreId, 10),
        genreName: document.getElementById('edit-genrename').value.trim(), //string.trim() прибирає пробіли з кінців
        // користувач вводить id організацій через кому, воно розпарсує цей string за допомогою string.split
    }
    //передає в контроллер
    fetch(`${uri}/${genreId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genre)
    })
        .then(() => getGenres())
        .catch(error => console.error('Unable to update fair location.', error));
    closeInput();
    return false;
}

function closeInput() {
    // приховує елемент з редагуванням лектора
    document.getElementById('editForm').style.display = 'none';
}


function _displayGenres(data) {
    const tBody = document.getElementById('genres');  // отримує тіло таблиці
    tBody.innerHTML = '';


    const button = document.createElement('button'); // створює шаблон для кнопки

    data.forEach(genre => {  // ітеруємо по лекторам
        // створюємо унікальну кнопку РЕДАГУВАТИ для кожного лектора
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Редагувати';
        // виклик функції на клік, що заповнює редагуючі поля
        editButton.setAttribute('onclick', `displayEditForm(${genre.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Видалити';
        // виклик функції видалення на клік
        deleteButton.setAttribute('onclick', `deleteGenre(${genre.id})`);

        let tr = tBody.insertRow(); // вставляємо стрічку
        // заповнюємо данними
        //
        // УВАГА УВАГА
        // ТРЕБА ПИСАТИ genre.phone, а не genre.Phone як зазначено в классах, для перевірки, запустіть гет запрос
        // і подивіться як він повертає (зазвичай, перша літера стає маленькою)

        let td0 = tr.insertCell(0); //tr.InsertCell(int) вставляє в указану комірку (починаючи з 0) дані
        let textNodeId = document.createTextNode(genre.id);
        td0.appendChild(textNodeId);

        let td1 = tr.insertCell(1); // комірка залежить від вашого <th> в таблиці
        let textNodeFullName = document.createTextNode(genre.genreName);
        td1.appendChild(textNodeFullName);


        let td3 = tr.insertCell(2); //вставляємо кнопку редагування
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3); // вставляємо кнопку видалення
        td4.appendChild(deleteButton);
    });

    genres = data; // вносимо дані в змінну
}