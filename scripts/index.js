// DECLARATION DES CONSTANTES
const POST_URL = "/api/wines";
const DELETE_URL = "/api/wines/id";
const GET_ALL_URL = "/api/wines";
const GET_ONE_URL = "/api/wines/id";
const SEARCH_BY_TAG = "/api/wines/search/tag";
const PUT_URL = "/api/wines/id";

// ENCAPSULATION JQUERY
$(function() {

});

// VALIDATION DU FORMULAIRE
/**
* @param un formulaire
* @return bool | function
* Vérifie que tous les champs nécessaires sont bien complétés
*/
function check(frm) {
	var checked = $('#description').val().length > 0;
	var checkYear = $('#year').val() > 1925 && $('#year').val() < 2017;
	var $inputs = $('input');
	
	for (var i = 2; i < $inputs.length && checked; i++) {
		checked = $inputs.eq(i).val().length > 0;
		
	}
	
	if(!checked) {
		$('#message').text('Tout les champs doivent être complétés !');
		return false;
	} else if(!checkYear) {
		$('#message').text('Année non valide !');
		return false;
	}
			
	return (saveWine(frm));	
}

// TRAITEMENT DES DONNEES
/**
* @param un formulaire 
* @return bool
* Sauvegarde un nouveau vin ou met à jour un vin existant.
*/
function saveWine(frm) {
	var id = frm.id.value;
	var type = (id)? 'PUT' : 'POST';
	var url = (!id)? POST_URL : PUT_URL.substr(0,11)+id;
	console.log(url);
	$.ajax({
		url: url, 
		type: type, 
		data: $(frm).serialize()
	}).done(function() {

		displayMessage( (id)? 'update' : 'add', true);

		getAllWines();

	})
	.fail(function() {
		
		displayMessage( (id)? 'update' : 'add', false);

	});

	return false;
}
 
/**
* @param un formulaire 
* @return bool
* Efface un vin.
*/   
function deleteWine(id) {
	var url = DELETE_URL.substr(0,11);
	
	$.ajax({
		url: url + id, 
		type: "DELETE", 
	}).done( function() {

		displayMessage("delete", true);

		getAllWines();

	})
	.fail( function() {

		displayMessage("delete", false);
		
	});

	return false;	
}

// RECUPERATION DES DONNEES
/**
* @param void
* @return void
* Récupère la liste complète des vins.
*/
function getAllWines() {
	$.get(GET_ALL_URL, function(data) {
		var tabWines = JSON.parse(data);

		displayWines(tabWines);
	});
}

/**
* @param string
* @return void
* Récupère une liste de vins selon un terme envoyé en paramètre.
*/
function searchByTag(frm) {
	var tag = frm.search.value;
	var url = SEARCH_BY_TAG.substr(0,18);
	
	$.get(url+tag, function(data) {
		var tabWines = JSON.parse(data);

		displayWines(tabWines);
	});		
	return false;
}

/**
* @param int
* @return void
* Récupère un vin correspondant à l'id passé en paramètre.
*/
function getWine(id) {
	var url = GET_ONE_URL.substr(0,11);
	
	makeSelected(id);
	
	$.get( url+id, function(data) {
		var wine = JSON.parse(data);

		displayWine(wine);

		makeSelected(id);
	});
}

// AFFICHAGE DES DONNEES ET GESTION D'AFFICHAGE
/**
* @param array[json]
* @return void
* Affiche une liste de vins reçue en paramètre.
*/
function displayWines(tabWines) {
	$('.active').removeClass('active');
	var $wine_list = $('#wine_list');
	
	$('.wine_list_element').remove();

	for (var i = 0; i < tabWines.length; i++) {
		
		var li = $('<li></li>');

		$(li).attr('class', 'list-group-item');

		$(li).attr('id', 'wine' + tabWines[i].id);

		$(li).attr('onclick', 'getWine(' + tabWines[i].id + ')');

		$(li).text(tabWines[i].name);

		$wine_list.append(li);
	}
}

/**
* @param object
* @return void
* Affiche le vin passé en paramètre.
*/
function displayWine(wine) {
	for (prop in wine) {
		$('#' + prop).val(wine[prop]);
	}

	$('#description').text(wine.description);
	$('#wine_review_img').attr('src','pictures/'+wine.img_url);
}

/**
* @param void
* @return void
* Vide le formulaire.
*/
function clearFrm() {
	$('.active').removeClass('active'); // Déselectionner la liste des vins
	
	$('.form-group .form-control').text('');
		
	$('#wine_review_img').attr('src', 'pictures/image_0.jpg'); // On met une image par défault
}

/**
* @param int
* @return void
* Attribue la classe "active" à l'élément passé en paramètre, 
* et retire la même classe à tout les autres.
*/
function makeSelected(id) {
	$('.active').removeClass('active');
	$('#wine' + id).addClass('active');
	$('#deleteBtn').attr('onclick', 'deleteWine(' + id + ')');
}

/**
* @param string, boolean
* @return void
* Affiche une notification selon l'action effectuée.
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

	if(tabAction.indexOf(action) < 0) {
		return false;
	}
	
	action = tabActionFr[tabAction.indexOf(action)];

	var message = (success)? "Le vin a été " + action + "." : "Le vin n'a pas pu être " + action + ".";	

	$('#message').text(message);
	
	clearFrm();

}