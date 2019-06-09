

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

$(document).ready(function(){

    $(".color-block").width($("#width-input").val());
    $(".color-block").height($("#height-input").val());

$(".input-button").on('click', ()=>{  
    $('.color-block').css('background-color', getRandomColor());
});

$("#width-input").on("input",(e)=>{
    $(".color-block").width($(e.target).val());
});

   $("#height-input").on("input",(e)=>{
    $(".color-block").height($(e.target).val());
});
  
});

