$(document).ready(()=>{    
    const gatCities = ()=>{                     
        fetch('http://exercise.develop.maximaster.ru/service/city/')
            .then(function(response) {
                return response.json();
            }).then(function(jsonVal) {
               console.log(jsonVal);
               $.each(jsonVal, function(key, value) {   
                $('.city')
                    .append($("<option></option>")
                               .attr("value",key)
                               .text(value)); 
               });  
               $('.city').val("6");            
            }).catch(function(ex) {
                console.log('parsing failed', ex);
            });
    }
    gatCities();
    

    $('.submit_button').on('click',(city, weight)=>{                     
        fetch('exercise.develop.maximaster.ru/service/delivery/?city=' + city + '&weight='+weight)
            .then(function(response) {
                return response.json();
            }).then(function(jsonVal) {
               console.log(jsonVal);
               $.each(jsonVal, function(key, value) {   
                $('.city')
                    .append($("<option></option>")
                               .attr("value",key)
                               .text(value)); 
               });                 
            }).catch(function(ex) {
                console.log('parsing failed', ex);
            });
    });    
})