<?php
$page_title = 'Courses';
include('includes/header.php');
?>
        <h3>Courses</h3>
        <table id="course-table"></table>

        <h3>Add/Update</h3>
        <form class="data-form">
            <label for="uni">University</label>
            <input type="text" name="uni" id="uni" placeholder="Harvard">
            <label for="course-title">Course title</label>
            <input type="text" name="title" id="course-title" placeholder="Astrophysics">
            <label for="course-start">Start date</label>
            <input type="text" name="start-date" id="course-start" placeholder="20XX-XX-XX">
            <label for="course-end">End date</label>
            <input type="text" name="end-date" id="course-end" placeholder="20XX-XX-XX">
        </form>
        <button id="add-course">Add</button>
        <button id="update-course">Update</button>
    </div>
    <script src="js/courses.js"></script>
</body>
</html>