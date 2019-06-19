<?php
if (isset($_POST['weight']) && $_POST['city']) {
    
    $ch = curl_init();
	curl_setopt_array($ch, array(
		CURLOPT_URL => "exercise.develop.maximaster.ru/service/delivery/?city=".$_POST['city']."&weight=".$_POST['weight'],
		CURLOPT_VERBOSE => True,
		CURLOPT_RETURNTRANSFER => True,
	));
    $resp = curl_exec($ch);   
    curl_close($ch);  
     
    echo $resp;
}