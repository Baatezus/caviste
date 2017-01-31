<?php
//Lecture des données
$wines = json_decode(file_get_contents('vinuri.json'),true);
var_dump(count($wines));
$lastId = $wines[count($wines)-1]['id']; // id=15 ok

if(!empty($_POST['name']) && !empty($_POST['grapes']) && !empty($_POST['country']) 
	&& !empty($_POST['region']) && !empty($_POST['year']) && !empty($_POST['notes'])) {
		
		//Récupération des valeurs des champs du formulaire
		$name = $_POST['name'];
		$grapes = $_POST['grapes'];
		$country = $_POST['country'];
		$region = $_POST['region'];
		$year = $_POST['year'];
		$notes = $_POST['notes'];	
		
		if(!empty($_POST['id'])) { // si on a un id => modification
			$id = $_POST['id'];
			
			foreach($wines as $wine) {
				if($wine['id']==$id) {
					$wine['name'] = $name;
					$wine['grapes'] = $grapes;
					$wine['country'] = $country;
					$wine['Region'] = $region;
					$wine['year'] = $year;
					$wine['notes'] = $notes;
				}
			}
		} else { // sinon, on ajoute 
			$newWine = [];
			
			$newWine['id'] = $lastId+1;
			$newWine['name'] = $name;
			$newWine['grapes'] = $grapes;
			$newWine['country'] = $country;
			$newWine['Region'] = $region;
			$newWine['year'] = $year;
			$newWine['notes'] = $notes;
			$newWine['img_url'] = '../pictures/image_1.jpg';
			
			array_push($wines, $newWine);
		}
		file_put_contents('vinuri.json',json_encode($wines,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
} else echo 'Erreur de nu stiu ce';

?>