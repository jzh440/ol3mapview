function test_addPoint() {
    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
            src: 'icon/marker.png'
        }))
    });
    var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point([115.4537241581,25.5924977655]),
    });
    iconFeature.setStyle(iconStyle);
    vector.getSource().addFeature(iconFeature);
    zoomToExtend(iconFeature.getGeometry().getExtent());
}

function test_addPoints(){
    var multiPoint = new ol.geom.MultiPoint([]);
    var wktPoint1 = "POINT(115.4537241581 25.5924977655)";
    var geom1 = format.readGeometry(wktPoint1, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
    });

    var wktPoint2 = "POINT(115.967882 28.665582)";
    var geom2 = format.readGeometry(wktPoint2, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
    });
    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
            src: 'icon/marker.png'
        }))
    });
    var iconFeature1 = new ol.Feature({
        geometry: new ol.geom.Point([115.4537241581, 25.5924977655]),
    });
    var iconFeature2 = new ol.Feature({
        geometry: new ol.geom.Point([115.967882 ,28.665582]),
    });
    iconFeature1.setStyle(iconStyle);
    iconFeature2.setStyle(iconStyle);
    vector.getSource().addFeature(iconFeature1);
    vector.getSource().addFeature(iconFeature2);
    //多个点视野会跑
    /*   multiPoint.appendPoint(geom1);
     multiPoint.appendPoint(geom2);
     var extent = multiPoint.getExtent();
     zoomToExtend(extent);*/
}

$(function () {
    $("#btn-addPoints").click(function(){
        test_addPoints();
    });
});