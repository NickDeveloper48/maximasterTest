<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css"/> 
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
       
    </head>
    <body>
        <form class="submit_form" onclick="setData(); return false;" method="POST">
            <select class="city" name="city"></select>
            <input class="weight" name="weight" type="text" placeholder="Вес, кг">
            <p class="error_message" hidden></p>
            <input class="submit_button" type="button" value="Расчитать">
        </form>
        <script type="text/javascript">
            $(document).ready(function() {
                $.ajax({
                        type: "POST",
                        url: 'http://exercise.develop.maximaster.ru/service/city/',                        
                        success: function(response)
                        {
                           // var jsonData = JSON.parse(response);
                           $.each(response, function(key, value) {   
                            $('.city')
                                .append($("<option></option>")
                                        .attr("value",key)
                                        .text(value)); 
                                });  
                                $('.city').val("6"); 
                                            
                        }
                   });

                  
            });
            

            function setData(){                    
                    let city = $(".city option[value=" + $(".city").val()  + "]").text();
                    let weight = $('.weight').val();
                    console.log(weight);  
                    $.ajax({
                        type: "POST",
                        url: 'exercise.develop.maximaster.ru/service/delivery/?city=' + city + '&weight=' + weight,                        
                        success: function(response)
                        {
                           // var jsonData = JSON.parse(response);
                           console.log(response);                                            
                        }
                    });
                }
            </script>
    </body>
</html>