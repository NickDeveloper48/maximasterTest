<?php
$file = strrchr($_SERVER["SCRIPT_NAME"], "/");
$file = substr($file, 1); 
$cache_file = 'cache/'.$file.'.dat'; 

$time = getdate();
$seconds_from_day_start = $time['seconds'] + 60*$time['minutes'] + 3600*$time['hours']; 

$arr = array();

$from_cache = 0;
if (file_exists($cache_file)) {   
  if ((time() - filemtime($cache_file)) < $seconds_from_day_start) { 
    $from_cache = 1;
  }   
}
if(!$from_cache){
    $ch = curl_init();
	curl_setopt_array($ch, array(
		CURLOPT_URL => "http://exercise.develop.maximaster.ru/service/city/",
		CURLOPT_VERBOSE => True,
		CURLOPT_RETURNTRANSFER => True,
	));
    $resp = curl_exec($ch);   
    curl_close($ch);    
    
    $handle = fopen($cache_file,"w"); 
    fwrite($handle, $resp); 
    fclose($handle); 
    ob_end_flush(); 

    $arr = json_decode($resp);
    
}
else{
    $cache_data = file_get_contents($cache_file);    
    $arr = json_decode($cache_data);    
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css"/> 
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>       
    </head>
    <body>
        <form class="submit_form"  method="POST">
            <?php
                echo '<select class="city" name="city">';
                for ($i = 0; $i < count($arr); $i++) {
                    if($arr[$i] == 'Москва'){
                        echo '<option selected>'.$arr[$i].'</option>';
                    }
                    echo '<option>'.$arr[$i].'</option>';
                }
                echo '</select>'
            ?>            
            <input class="weight" name="weight" type="text" placeholder="Вес, кг">
            <p class="message" hidden></p>
            <input class="submit_button" type="submit" value="Расчитать" >
        </form>
        <script type="text/javascript">
            $(document).ready(function() {
                $('.submit_form').submit(function(e) {
                    e.preventDefault();
                    $.ajax({
                        type: "POST",
                        url: 'rnd.php',
                        data: $(this).serialize(),
                        success: function(response)
                        {
                            var jsonData = JSON.parse(response); 
                            if (jsonData.status == "OK")
                            {
                                $('.message').text(jsonData.message);
                                $('.message').css('color','#00AA00');
                            }
                            else
                            {
                                $('.message').text(jsonData.message);
                                $('.message').css('color','#FF0000');
                            }
                            $('.message').show();
                        }
                    });
                });
            });
            </script>
    </body>
</html>

