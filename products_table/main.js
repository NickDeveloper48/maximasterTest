
$(document).ready(()=>{
    $('.error_message').hide();
    $('.input_error').hide();
    let data ={};
  //  $('.testbtn').on('click',()=>{
    fetch('http://exercise.develop.maximaster.ru/service/products/')
    .then(function(response) {
        return response.json()
    }).then(function(json) {       
        data = json;
        for(let i = 1; i < data.length; i++){
            $('.products_table').append('<tr><td>'+ i +'</td><td>'+ data[i].name +'</td><td>'+ data[i].quantity +'</td><td>'+ data[i].price +'</td><td>'+ data[i].quantity*data[i].price +'</td></tr>');
        }
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    });


    $('.refresh_button').on('click',()=>{
        $('.input_error').hide();
        $(".products_table").show();
        $('.error_message').hide();
        let strFrom = $('#price_from').val();
        let strTo = $('#price_to').val();
        let from = 0;
        let to = 0;
        if(!strFrom.length || !strTo.length || strFrom.match(/\D/) || strTo.match(/\D/)){
            $('.input_error').text('Формат введенных данных неверен!');
            $('.input_error').show();
        }
        else{
            from = + strFrom;
            to = + strTo;    
           
            $(".products_table").find("tr:gt(0)").remove();
            let count = 0;
            for(let i = 0; i < data.length; i++){
                let sum = data[i].quantity*data[i].price;
                if(sum >= from && sum <= to){
                    count++;
                    $('.products_table').append('<tr><td>'+ count +'</td><td>'+ data[i].name +'</td><td>'+ data[i].quantity +'</td><td>'+ data[i].price +'</td><td>'+ sum +'</td></tr>');
                }
            }
            if(count === 0){
                $(".products_table").hide();
                $('.error_message').show();
            }
        }
    });

        
});
    //$('#myTable tbody').append('<tr class="child"><td>blahblah</td></tr>');
