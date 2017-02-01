	// Encapsulation jQuery
	$(function(){

	});
// VALIDIION FORMAULAIRE

	function check(frm) {
		return false;
	}

//TRAITEMENT DES DONNEES

	function saveWine(frm) {

		var id = (frm.id.value == '') ? false : true;
		
		var type = (!id)? 'POST' : 'PUT';

		var str = (id)? "modifié" : "ajouté"; 

		$.ajax({
			url: "ressources/trait.php", 
			type: type, 
			data: $(frm).serialize()
		}).done(function() {
			// On affiche un message de réussite à l'utilisateur
			$('#message').text('Vin ' + str + ' avec succès.');

			// Réafficher la liste des vins après la modification de la base de données 
			getAllWines();
			
			// Vider les champs du formulaire
			clearFrm();
		})
		.fail( function() {
			
			$('#message').text('Le vin n\'a pu être ' + str + '!');
			
		});

		return false;
	}
       

	function deleteWine(id) {
		$.ajax({
			url: "ressources/delete.php", 
			type: "DELETE", 
			data: "id="+id
		}).done( function(data) {
			// On affiche un message de réussite à l'utilisateur
			$('#message').text('Vin supprimé avec succès.');
			

			// Réafficher la liste des vins après la modification de la base de données 
			getAllWines();
			
			// Vider les champs du formulaire
			clearFrm();
		})
		.fail( function() {
			$('#message').text('Le vin n\'a pu être suprimé');
		});

		return false;	
	}

// RECUPERATION DES DONNEES

	function serchByTag(tag) {
		$.get("ressources/wines.php", {"tag": tag}, function(data){
		  	var tabWines = JSON.parse(data);

		  	displayWines(tabWines);
		});		
	}

	function getAllWines() {
		$.get("ressources/wines.php", function(data){
		  	var tabWines = JSON.parse(data);

		  	displayWines(tabWines);
		});
	}

	function getWine(id) {
		makeSelected(id);

		$.get("ressources/onewine.php", {"id": id}, function(data){
		  	var wine = JSON.parse(data);

		  	displayWine(wine);
		});
	}

// AFFICHAGE DES DONNEES ET GESTION D'AFFICHAGE

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

	function displayWine(wine){
		for (prop in wine) {
	  		$('#' + prop).val(wine[prop]);
		}

		($('#description')).text(wine.description);
	}

	function clearFrm() {
		$('input').val('');
		$('textarea').val('');	
		$('#wine_review_img').attr('src', 'pictures/image_0.jpg');	// Vide le formulaire pour introduire un nouveau vin.
	}

	function makeSelected(id) {
		$('.wine_list_element').removeClass('selected');
		$('#wine' + id).addClass('selected');
	}


//Exagération.... Ne pas faire
	function displayMessage(id, sucess) {

	}