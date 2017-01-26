<?php
?>
<!DOCTYPE html>
<html>
<head>
	<title>Cellier</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="style/index.css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<script>
	// Encapsulation jQuery
	$(function(){

	});

	function display() {
		console.log forms
	}
	</script>
</head>
<body>
	<div id="search_form_div">
		<form method="post" action="<?= $_SERVER['PHP_SELF'] ?>" onsubmit="return check(this)"" id="search_form">
			<input type="text" name="search" id="search_input" />
			<button action="submit" class="action">Search</button>
		</form>
	</div>
	<div id="new_wine_link" class="action">
		<a href="#">New wine</a>
	</div>
	<div id="wine_list_div">
		<ul id="wine_list">
			<!-- Liste de <li></li> générée en AJAX -->
			<!-- La suite est une simulation de contenu: -->
			<li class="wine_list_element"></li>
			<li class="wine_list_element"></li>
			<li class="wine_list_element"></li>
			<li class="wine_list_element"></li>
			<li class="wine_list_element"></li>
			<li class="wine_list_element"></li>
			<li class="wine_list_element"></li>
			<li class="wine_list_element"></li>
			<li class="wine_list_element"></li>
			<li class="wine_list_element"></li>
		</ul>
	</div>
	<div id="edit_wine_form_div">
		<form method="post" action="<?= $_SERVER['PHP_SELF'] ?>" onsubmit="#" id="edit_wine_form">
			<p><label for="id"><br /></label><input type="number" name="id" /></p>
			<p><label for="name"><br /></label><input type="text" name="name" /></p>
			<p><label for="grapes"><br /></label><input type="text" name="grapes" /></p>
			<p><label for="country"><br /></label><input type="text" name="country" /></p>
			<p><label for="region"><br /></label><input type="text" name="region" /></p>
			<p><label for="year"><br /></label><input type="number" name="year" /></p>
			<button onclick="display();">Save</button>
			<button>Delete</button>
		</form>
	</div>
</body>
</html>