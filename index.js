// Encapsulation jQuery
	$(function(){
		// Des trucs à faire avec jQuery pour le responsive et tout ça...
	});
	
	function saveWine(frm) {
		// Valide le formulaire et sauve le vin avec AJAX.
	}
	
	// Valide le formulaire et efface le vin avec AJAX.
	function deleteWine(frm) {
		
	}
	
	// Valide le formulaire de recherche et lance la recherche avec une requête ajax.
	function check(frm) {
		
		
	}
	
	// Affiche les vins qui correspondent à la recherche.
	function searchWine() {
		// Récupération de la valeur entrée dans la barre de recherche
		var wineName = $('#search_input').val(); 
		
		if(wineName!='') {
			// On récupère tous les vins afin de comparer avec la valeur de recherche
			$.get("ressources/wines.php", function(data) {
				var tabWines = JSON.parse(data);
				var $wine_list = $('#wine_list');
				var nb = 0;
				
				// On vide l'affichage des vins
				$('.wine_list_element').remove();
				
				for (var i=0;i<tabWines.length;i++) {
					wine = tabWines[i].name.toLowerCase();
					
					// si on trouve un nom de vin parmi les vins de la liste, on construit la nouvelle liste à afficher
					if(wine.search(wineName.toLowerCase())!=-1) {
						nb++;
						var li = $('<li></li>');
						
						$(li).attr('class', 'wine_list_element');
						$(li).text(tabWines[i].name);
						$(li).attr('onclick', 'getWine(' + tabWines[i].id + ')');
				
						$wine_list.append(li);
					} 
				}
				
				if(nb!=0) {
					$('#message').text(nb+' éléments correspondent à votre recherche');
				} else {
						$('#message').text('Aucun résultat trouvé');
						getAllWines();
					}
				
				$('#message').css('color','green');
			});
		} else {
			$('#message').text('Veuillez entrer un nom de vin svp !');
			$('#message').css('color','orange');
		}
		
		$('#search_input').val('');
	}
	
	// Affiche tous les vins.
	function getAllWines() {
		$.get("ressources/wines.php", function(data) {
		  	var tabWines = JSON.parse(data);
			var $wine_list = $('#wine_list');

		  	for (var i=0;i<tabWines.length;i++) {
		  		var li = $('<li></li>');
				
				$(li).attr('class', 'wine_list_element');
		  		$(li).text(tabWines[i].name);
				$(li).attr('onclick', 'getWine(' + tabWines[i].id + ')');
		
		  		$wine_list.append(li);
		  	}
		});
	}
	
	function getWine(id) {
		// Effectue une requêtes AJAX afin de récupérer un vin de la liste et l'afficher.
		$.get("ressources/wines.php", function(data) {
		  	var tabWines = JSON.parse(data);
			
			for (var i = 0; i < tabWines.length; i++) {
				if(tabWines[i].id == id) {
					// Insertion des données dans le formulaire
					$('#id').val(tabWines[i].id);
					$('#name').val(tabWines[i].name);
					$('#grapes').val(tabWines[i].grapes);
					$('#country').val(tabWines[i].country);
					$('#region').val(tabWines[i].Region);
					$('#year').val(tabWines[i].year);
					$('#notes').val(tabWines[i].notes);
					$('#wine_review_img').attr('src','pictures/'+tabWines[i].img_url);
				}
		  	}
		});
	}
	
	function clearFrm() {
		// Vide le formulaire pour introduire un nouveau vin
		$('input').val('');
		$('textarea').val('');	
		$('#wine_review_img').attr('src', 'pictures/image_0.jpg');
	}