'use strict'

// constants for DOM elements
const siteTable = document.getElementById('site-table');
const addBtn = document.getElementById('add-site');
const updateBtn = document.getElementById('update-site');
const titleInput = document.getElementById('site-title');
const urlInput = document.getElementById('url');
const infoInput = document.getElementById('site-info');

let updateId = null; // temp update id variable

// event listeners for add and update buttons
addBtn.addEventListener('click', addSite);
updateBtn.addEventListener('click', updateSite);

window.onload = getSites; // get sites on window load

function getSites() {
    // clear form
    titleInput.value = '';
    urlInput.value = '';
    infoInput.value = '';

    // clear table element and create head
    siteTable.innerHTML = `
        <thead>
            <tr>
                <th>Title</th>
                <th>URL</th>
                <th>Info</th>
                <th></th>
            </tr>
        </thead>
    `;

    fetch('https://axelhellberg.se/projapi/website') // fetch entries
        .then(response => response.json())
        .then(result => {
            result.forEach(site => { // print each entry in table row
                siteTable.innerHTML += `
                    <tbody>
                        <tr>
                            <td data-label="Title">${site.title}</td>
                            <td data-label="URL"><a href="${site.url}">Link</a></td>
                            <td data-label="Info">${site.info}</td>
                            <td>
                                <button onClick='deleteSite(${site.id})'>Delete</button>
                                <button onClick='getSite(${site.id})'>Edit</button>
                            </td>
                        </tr>
                    </tbody>
                `;
            })
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function getSite(id) { 
    fetch(`https://axelhellberg.se/projapi/website?id=${id}`) // fetch specific entry
        .then(response => response.json())
        .then(result => { // set update variable and put entry values into form
            updateId = result.id;
            titleInput.value = result.title;
            urlInput.value = result.url;
            infoInput.value = result.info;
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}

function deleteSite(id) {
    fetch('https://axelhellberg.se/projapi/website', { // send delete request for specific entry
        method: 'DELETE',
        body: id
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success: ', result);
            getSites(); // reload entries
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}

function addSite() {
    let site = { // put form values into object
        'title': titleInput.value, 
        'url': urlInput.value, 
        'info': infoInput.value
    };

    fetch('https://axelhellberg.se/projapi/website', { // request POST with object in JSON as body
        method: 'POST',
        body: JSON.stringify(site)
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success: ', result);
            getSites(); // reload entries
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}

function updateSite() {
    let site = {  // put temp update variable and form values into object
        'id': updateId,
        'title': titleInput.value, 
        'url': urlInput.value, 
        'info': infoInput.value
    };

    fetch('https://axelhellberg.se/projapi/website', { // request PUT with object as body
        method: 'PUT',
        body: JSON.stringify(site)
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success: ', result);
            getSites(); // reload entries
        })
        .catch(error => {
            console.log('Error: ', error);
        }); 
}