const uri = 'api/Genres'; 
let genres = []; 

function getGenres() {
    fetch(uri) 
        .then(response => response.json())
        .then(data => _displayGenres(data))
        .catch(error => console.error('Unable to get genres.', error));
}

function addGenre() {
    const addNameTextbox = document.getElementById('add-genreName');
    const genreName = addNameTextbox.value.trim();

    if (genreName === '') {
        window.alert('Genre name cannot be empty.');
        return;
    }

    if (!isNaN(genreName)) {
        window.alert('Genre name cannot be just a number.');
        return;
    }

    // Check if the genre name already exists
    if (genres.some(genre => genre.genreName === genreName)) {
        window.alert('Genre name already exists.');
        return;
    }

    const genre = {
        genreName: genreName,
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genre)
    })
        .then(response => response.json())
        .then(data => {
            genres.push(data); // Add the new genre to the genres list
            _displayGenres(genres); // Update the genre list display
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add genre.', error));
}

function deleteGenre(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getGenres())
        .catch(error => document.getElementById('errorDB').innerHTML = error.toString());
}

function displayEditForm(id) {
    const genre = genres.find(genre => genre.id === id);
    document.getElementById('edit-id').value = genre.id;
    document.getElementById('edit-genrename').value = genre.genreName;
    document.getElementById('editForm').style.display = 'block';

}

function updateGenre() {
    const genreId = document.getElementById('edit-id').value;
    const genreName = document.getElementById('edit-genrename').value.trim();

    if (genreName === '') {
        window.alert('Genre name cannot be empty.');
        return;
    }

    if (!isNaN(genreName)) {
        window.alert('Genre name cannot be just a number.');
        return;
    }

    // Check if the genre name already exists
    if (genres.some(genre => genre.genreName === genreName && genre.id !== parseInt(genreId, 10))) {
        window.alert('Genre name already exists.');
        return;
    }

    const genre = {
        id: parseInt(genreId, 10),
        genreName: genreName,
    };

    fetch(`${uri}/${genreId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genre)
    })
        .then(() => getGenres())
        .catch(error => console.error('Unable to update genre.', error));

    closeInput();
    return false;
}


function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}


function _displayGenres(data) {
    const tBody = document.getElementById('genres'); 
    tBody.innerHTML = '';


    const button = document.createElement('button'); 

    data.forEach(genre => {  
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
      
        editButton.setAttribute('onclick', `displayEditForm(${genre.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
      
        deleteButton.setAttribute('onclick', `deleteGenre(${genre.id})`);

        let tr = tBody.insertRow();

        let td0 = tr.insertCell(0); 
        let textNodeId = document.createTextNode(genre.id);
        td0.appendChild(textNodeId);

        let td1 = tr.insertCell(1); 
        let textNodeFullName = document.createTextNode(genre.genreName);
        td1.appendChild(textNodeFullName);


        let td3 = tr.insertCell(2); 
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    genres = data; 
}