<?php
$page_title = 'Jobs';
include('includes/header.php');
?>
        <h3>Jobs</h3>
        <table id="job-table"></table>

        <h3>Add/Update</h3>
        <form class="data-form">
            <label for="workplace">Workplace</label>
            <input type="text" name="workplace" id="workplace" placeholder="SpaceX">
            <label for="job-title">Job title</label>
            <input type="text" name="title" id="job-title" placeholder="Janitor">
            <label for="job-start">Start date</label>
            <input type="text" name="start-date" id="job-start" placeholder="20XX-XX-XX">
            <label for="job-end">End date</label>
            <input type="text" name="end-date" id="job-end" placeholder="20XX-XX-XX">
        </form>
        <button id="add-job">Add</button>
        <button id="update-job">Update</button>
    </div>
    <script src="js/jobs.js"></script>
</body>
</html>