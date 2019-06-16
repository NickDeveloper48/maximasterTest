$(document).ready(function(){
 
    ymaps.ready(init);
    function init(){ 
        var geolocation = ymaps.geolocation,
        myMap = new ymaps.Map('map', {
            center: [0, 0],
            zoom: 5
        }, {
            searchControlProvider: 'yandex#search'
        });

        geolocation.get({
            provider: 'yandex',
            mapStateAutoApply: true
        }).then(function (result) { 
            myMap.geoObjects.add(result.geoObjects);
        });

        myMap.events.add('click', function (e) {
            myMap.geoObjects.removeAll();
            var myPlacemark = new ymaps.Placemark(e.get('coords'));
            myMap.geoObjects.add(myPlacemark);
            var coords = e.get('coords');
            myMap.hint.open(e.get('coords'), '<p>Местоположения доставки: ' + [
                coords[0].toPrecision(6),
                coords[1].toPrecision(6)
                ].join(', ') + '</p>' );
           
        });
    }

    $('.submit_button').on('click', ()=>{
        console.log('Q');
        if($('#input_name').val().length > 0)
    });

})