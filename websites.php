<?php
$page_title = 'Websites';
include('includes/header.php');
?>
        <h3>Websites</h3>
        <table id="site-table"></table>

        <h3>Add/Update</h3>
        <form class="data-form">
            <label for="site-title">Title</label>
            <input type="text" name="title" id="site-title" placeholder="Cool website">
            <label for="url">URL</label>
            <input type="text" name="url" id="url" placeholder="https://...">
            <label for="site-info">Info</label>
            <input type="text" name="info" id="site-info" placeholder="This website is cool">
        </form>
        <button id="add-site">Add</button>
        <button id="update-site">Update</button>
    </div>
    <script src="js/websites.js"></script>
</body>
</html>