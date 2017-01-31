<?php
//Lecture des données
$wines = json_decode(file_get_contents('vinuri.json'),true);
var_dump(count($wines));

if(isset($_POST['btDelete'])) {
	if(!empty($_POST['id'])) {
		$id = $_POST['id'];
		
		foreach($wines as $wine) {
			if($wine['id']==$id) {
				//on récupère la position du tableau où on a trouvé l'id
				$index = array_search($wine, $wines);
				array_splice($wines,$index,1);
			}
		}
		//var_dump($wines);
		file_put_contents('vinuri.json',json_encode($wines, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
	}
} else echo 'no se puede';

?>