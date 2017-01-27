	// Encapsulation jQuery
	$(function(){
		// Des trucs à faire avec jQuery pour le responsive et tout ça...
	});
	function saveWine(frm) {
		// Valide le formulaire et sauve le vin avec AJAX.
	}
	function deleteWine(frm) {
		// Valide le formulaire et efface le vin avec AJAX.
	}
	function check(frm) {
		//Valide le formulaire de recherche et lance la recherhce avec une requête ajax.
		
	}
	function getAllWines() {
		$.get("ressources/wines.php", function(data){
		  	var tabWines = JSON.parse(data);

		  	var $wine_list = $('#wine_list');

		  	for (var i = 0; i < tabWines.length; i++) {
		  		
		  		var li = $('<li></li>');

		  		$(li).attr('class', 'wine_list_element');

		  		$(li).attr('onclick', 'getWine(' + tabWines[i].id + ')');

		  		$(li).text(tabWines[i].name)

		  		$wine_list.append(li);
		  	}
		});
	
	}
	function getWine(id) {
		// Effectue une requêtes AJAX afin de récupérer un vin de la liste et l'afficher.
	}
	function clearFrm() {
		// Vide le formulaire pour introduire un nouveau vin.
	}