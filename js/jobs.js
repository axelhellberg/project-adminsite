'use strict'

// constants for DOM elements
const jobTable = document.getElementById('job-table');
const addBtn = document.getElementById('add-job');
const updateBtn = document.getElementById('update-job');
const workplaceInput = document.getElementById('workplace');
const titleInput = document.getElementById('job-title');
const startInput = document.getElementById('job-start');
const endInput = document.getElementById('job-end');

let updateId = null; // temp update id variable

// event listeners for add and update buttons
addBtn.addEventListener('click', addJob);
updateBtn.addEventListener('click', updateJob);

window.onload = getJobs; // get jobs on window load

function getJobs() {
    // clear form
    workplaceInput.value = '';
    titleInput.value = '';
    startInput.value = '';
    endInput.value = '';

    // clear table element and create head
    jobTable.innerHTML = `
        <thead>
            <tr>
                <th>Workplace</th>
                <th>Title</th>
                <th>Started</th>
                <th>Ended</th>
                <th></th>
            </tr>
        </thead>
    `;

    fetch('https://axelhellberg.se/projapi/job') // fetch entries
        .then(response => response.json())
        .then(result => {
            result.forEach(job => { // print each entry in table row
                jobTable.innerHTML += `
                    <tbody>
                        <tr>
                            <td data-label="Workplace">${job.workplace}</td>
                            <td data-label="Title">${job.title}</td>
                            <td data-label="Started">${job.start_date}</td>
                            <td data-label="Ended">${job.end_date}</td>
                            <td>
                                <button onClick='deleteJob(${job.id})'>Delete</button>
                                <button onClick='getJob(${job.id})'>Edit</button>
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

function getJob(id) { 
    fetch(`https://axelhellberg.se/projapi/job?id=${id}`) // fetch specific entry
        .then(response => response.json())
        .then(result => { // set update variable and put entry values into form
            updateId = result.id;
            workplaceInput.value = result.workplace;
            titleInput.value = result.title;
            startInput.value = result.start_date;
            endInput.value = result.end_date;
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}

function deleteJob(id) {
    fetch('https://axelhellberg.se/projapi/job', { // send delete request for specific entry
        method: 'DELETE',
        body: id
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success: ', result);
            getJobs(); // reload entries
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}

function addJob() {
    let job = { // put form values into object
        'workplace': workplaceInput.value, 
        'title': titleInput.value, 
        'start_date': startInput.value, 
        'end_date': endInput.value 
    };

    fetch('https://axelhellberg.se/projapi/job', { // request POST with object in JSON as body
        method: 'POST',
        body: JSON.stringify(job)
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success: ', result);
            getJobs(); // reload entries
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}

function updateJob() {
    let job = {  // put temp update variable and form values into object
        'id': updateId,
        'workplace': workplaceInput.value, 
        'title': titleInput.value, 
        'start_date': startInput.value, 
        'end_date': endInput.value 
    };

    fetch('https://axelhellberg.se/projapi/job', { // request PUT with object as body
        method: 'PUT',
        body: JSON.stringify(job)
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success: ', result);
            getJobs(); // reload entries
        })
        .catch(error => {
            console.log('Error: ', error);
        }); 
}