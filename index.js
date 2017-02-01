	// Encapsulation jQuery
	$(function(){

	});
// VALIDATION DES FORMULAIRE

	function check(frm) {
		return false;
	}

// TRAITEMENT DES DONNEES

	/**
	* @param un formulaire 
	* Sauvegarde un nouveau vin ou et met à jour un vin existant.
	*/

	function saveWine(frm) {

		var id = frm.id.value > 0;
		
		var type = (id)? 'PUT' : 'POST';

		var str = (id)? "modifié" : "ajouté"; 

		$.ajax({
			url: "ressources/trait.php", 
			type: type, 
			data: $(frm).serialize()
		}).done(function() {

			displayMessage( (id)?'update' : 'add', true)
		})
		.fail( function() {
			
			displayMessage( (id)?'update' : 'add', false)

		});

		return false;
	}
     
	/**
	* @param un formulaire 
	* Efface un vin.
	*/   

	function deleteWine(id) {
		$.ajax({
			url: "ressources/delete.php", 
			type: "DELETE", 
			data: "id="+id
		}).done( function(data) {

			displayMessage("delete", true);

		})
		.fail( function() {

			displayMessage("delete", false);
			
		});

		return false;	
	}

// RECUPERATION DES DONNEES

	/**
	* @param void
	* Récupère la liste complète des vins.
	*/

	function getAllWines() {
		$.get("ressources/wines.php", function(data){
		  	var tabWines = JSON.parse(data);

		  	displayWines(tabWines);
		});
	}

	/**
	* @param string
	* Récupère une liste de vin selon un terme envoyé en paramètre.
	*/

	function serchByTag(tag) {
		$.get("ressources/wines.php", {"tag": tag}, function(data){
		  	var tabWines = JSON.parse(data);

		  	displayWines(tabWines);
		});		
	}

	/**
	* @param int
	* Récupère un vin correpondant àl'id passé en paramètre.
	*/

	function getWine(id) {
		makeSelected(id);

		$.get("ressources/onewine.php", {"id": id}, function(data){
		  	var wine = JSON.parse(data);

		  	displayWine(wine);
		});
	}

// AFFICHAGE DES DONNEES ET GESTION D'AFFICHAGE

	/**
	* @param array[json]
	* Affiche un liste de vin reçu en paramètre.
	*/

	function displayWines(tabWines){
			$('.wine_list_element').remove();

		  	var $wine_list = $('#wine_list');

		  	for (var i = 0; i < tabWines.length; i++) {
		  		
		  		var li = $('<li></li>');

		  		$(li).attr('class', 'wine_list_element');

		  		$(li).attr('id', 'wine' + tabWines[i].id);

		  		$(li).attr('onclick', 'getWine(' + tabWines[i].id + ')');

		  		$(li).text(tabWines[i].name)

		  		$wine_list.append(li);
		  	}
	}

	/**
	* @param object
	* Affiche le vin passé en paramètre.
	*/

	function displayWine(wine){
		for (prop in wine) {
	  		$('#' + prop).val(wine[prop]);
		}

		($('#description')).text(wine.description);
	}

	/**
	* @param void
	* Vide le formulaire.
	*/

	function clearFrm() {
		$('input').val('');
		$('textarea').val('');	
		$('#wine_review_img').attr('src', 'pictures/image_0.jpg');	// Vide le formulaire pour introduire un nouveau vin.
	}

	/**
	* @param int
	* Attribut la classe "selected" à l'éleément passé en paramètre, 
	* et retire la même classe à tout les autres.
	*/

	function makeSelected(id) {
		$('.wine_list_element').removeClass('selected');
		$('#wine' + id).addClass('selected');
	}

	/**
	* @param string, boolean
	* Affiche un notifiction selon l'action effectuée.
	*/ 

	function displayMessage(action, success) {
		
		var tabAction = [
			"add",
			"update",
			"delete"
		];

		var tabActionFr = [
			"ajouté",
			"modifié",
			"effacé"
		];

		if(tabAction.indexOf(action) < 0)
			return false;

		action = tabActionFr[tabAction.indexOf(action)];

		var message = (success) ? "Le vin a été " + action + "." : "Le vin n'a pu être" + action + "!";	

		$('#message').text(message); clearFrm();

	}
