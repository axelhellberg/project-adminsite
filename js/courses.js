'use strict'

// constants for DOM elements
const courseTable = document.getElementById('course-table');
const addBtn = document.getElementById('add-course');
const updateBtn = document.getElementById('update-course');
const uniInput = document.getElementById('uni');
const titleInput = document.getElementById('course-title');
const startInput = document.getElementById('course-start');
const endInput = document.getElementById('course-end');

let updateId = null; // temp update id variable

// event listeners for add and update buttons
addBtn.addEventListener('click', addCourse);
updateBtn.addEventListener('click', updateCourse);

window.onload = getCourses; // get courses on window load

function getCourses() {
    // clear form
    uniInput.value = '';
    titleInput.value = '';
    startInput.value = '';
    endInput.value = '';

    // clear table element and create head
    courseTable.innerHTML = `
        <thead>
            <tr>
                <th>University</th>
                <th>Title</th>
                <th>Started</th>
                <th>Ended</th>
                <th></th>
            </tr>
        </thead>
    `;

    fetch('https://axelhellberg.se/projapi/course') // fetch entries
        .then(response => response.json())
        .then(result => {
            result.forEach(course => { // print each entry in table row
                courseTable.innerHTML += `
                    <tbody>
                        <tr>
                            <td data-label="University">${course.uni}</td>
                            <td data-label="Title">${course.title}</td>
                            <td data-label="Started">${course.start_date}</td>
                            <td data-label="Ended">${course.end_date}</td>
                            <td>
                                <button onClick='deleteCourse(${course.id})'>Delete</button>
                                <button onClick='getCourse(${course.id})'>Edit</button>
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

function getCourse(id) { 
    fetch(`https://axelhellberg.se/projapi/course?id=${id}`) // fetch specific entry
        .then(response => response.json())
        .then(result => { // set update variable and put entry values into form
            updateId = result.id;
            uniInput.value = result.uni;
            titleInput.value = result.title;
            startInput.value = result.start_date;
            endInput.value = result.end_date;
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}

function deleteCourse(id) {
    fetch('https://axelhellberg.se/projapi/course', { // send delete request for specific entry
        method: 'DELETE',
        body: id
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success: ', result);
            getCourses(); // reload entries
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}

function addCourse() {
    let course = { // put form values into object
        'uni': uniInput.value, 
        'title': titleInput.value, 
        'start_date': startInput.value, 
        'end_date': endInput.value 
    };

    fetch('https://axelhellberg.se/projapi/course', { // request POST with object in JSON as body
        method: 'POST',
        body: JSON.stringify(course)
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success: ', result);
            getCourses(); // reload entries
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}

function updateCourse() {
    let course = {  // put temp update variable and form values into object
        'id': updateId,
        'uni': uniInput.value, 
        'title': titleInput.value, 
        'start_date': startInput.value, 
        'end_date': endInput.value 
    };

    fetch('https://axelhellberg.se/projapi/course', { // request PUT with object as body
        method: 'PUT',
        body: JSON.stringify(course)
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success: ', result);
            getCourses(); // reload entries
        })
        .catch(error => {
            console.log('Error: ', error);
        }); 
}