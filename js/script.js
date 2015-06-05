
ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
    myMap = new ymaps.Map("mymap", {
        center: [59.93, 30.32],
        zoom: 15
    });

    myPlacemark = new ymaps.Placemark([59.93, 30.32], {

    }, {

            iconLayout: 'default#image',
            iconImageHref: 'img/map-marker.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42]
    });

    myMap.geoObjects.add(myPlacemark);
}


