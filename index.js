// Encapsulation jQuery
	$(function(){
		// Des trucs à faire avec jQuery pour le responsive et tout ça...
	});
	
	// Valide le formulaire et sauve le vin avec AJAX.
	function saveWine(frm) {
		// Récupération et sécurisation des données
		var id = encodeURIComponent($('#id').val());
        var name = encodeURIComponent($('#name').val());
        var grapes = encodeURIComponent($('#grapes').val());
        var country = encodeURIComponent($('#country').val());
        var region = encodeURIComponent($('#region').val());
        var year = encodeURIComponent($('#year').val());
        var notes = encodeURIComponent($('#notes').val());
		var params = "name="+name+"&grapes="+grapes+"&country="+country+"&region="+region+"&year="+year+"&notes="+notes;
		 
		// Je vérifie les champs pour ne pas lancer la requête HTTP
        if(name==='' || grapes==='' || country==='' || region==='' || year==='' || notes===''){ //
			// On indique à l'utilisateur que tous les champs doivent être remplis
			$('#message').text('Veuillez entrer tous les champs !');
        } else {
			if (id!='') {
				// **************   MODIFY   ***************
						/*$.ajax({
							method: "POST",
							url: "http://localhost/caviste/index.php/api/wines/" + id, 
							headers: {"X-HTTP-Method-Override": "PUT"}, 
							dataType: "json",
							data: frm.serialize()
						})*/
						
				$.ajax({
					url: "ressources/trait.php", 
					type: "POST", 
					headers: {"X-HTTP-Method-Override": "PUT"},
					data: "id="+id+"&"+params 
				}).done( function(data) {
					// On affiche un message de réussite à l'utilisateur
					$('#message').text('Vin modifié avec succès.');

					// Suppression des élements de la liste des vins
					$('.wine_list_element').remove();

					// Réafficher la liste des vins après la modification de la base de données 
					getAllWines();
					
					// Vider les champs du formulaire
					clearFrm();
				})
				.fail( function() {
					$('#message').text('Le vin n\'a pu être modifié');
				});
				
			} else {
				// **************   ADD   ***************
						// Envoi de la requête HTTP en mode asynchrone
						/*
						$.ajax({
							method: "POST",
							url: "http://localhost/caviste/index.php/api/wines", 
							dataType: "json",
							data: frm.serialize() // içi on obtient tout les valeurs des champs du formulaire 
						})
						*/
				$.ajax({
					url: "ressources/trait.php", 
					type: "POST", 
					data: params 
				}).done( function(data) {
					// On affiche un message de réussite à l'utilisateur
					$('#message').text('Vin ajouté avec succès.');

					// Suppression des élements de la liste des vins
					$('.wine_list_element').remove();

					// Réafficher la liste des vins après la modification de la base de données 
					getAllWines();
					
					// Vider les champs du formulaire
					clearFrm();
				})
				.fail( function() {
					$('#message').text('Le vin n\'a pu être ajouté');
				});
			}
        }
	}
	
	// Valide le formulaire et efface le vin avec AJAX.
	function deleteWine(id) {
		//$id = $('#edit_wine_form #id').val();
		
		if (id!='') {
			/*
			$.ajax( {
				method: "DELETE",
				url: "http://localhost/caviste/index.php/api/wines/" + id,
				dataType: "json"
			})
			*/
			$.ajax({
				url: "ressources/delete.php", 
				type: "DELETE", 
				dataType: "json"
				data: "id="+id
			}).done( function(data) {
				// On affiche un message de réussite à l'utilisateur
				$('#message').text('Vin supprimé avec succès.');

				// Suppression des élements de la liste des vins
				$('.wine_list_element').remove();

				// Réafficher la liste des vins après la modification de la base de données 
				getAllWines();
				
				// Vider les champs du formulaire
				clearFrm();
			})
			.fail( function() {
				$('#message').text('Le vin n\'a pu être suprimé');
			});
		}
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