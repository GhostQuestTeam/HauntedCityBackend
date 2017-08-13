// ====================================================================================================
//
// Cloud Code for GET_POIS, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
var LatLon = Spark.getData().POS;
//var LatLonJSON = JSON.parse(strLatLon)
var lat = LatLon.lat;
var lon = LatLon.lon;
var deltaNearBy = 0.2;
var maxDistance = 25 * 100;
var lim = 10;

var dbPOIs = Spark.runtimeCollection("dbPOIs");
dbPOIs.ensureIndex({"geometry.coordinates" : "2dsphere"});
var cursor = dbPOIs.find(
        {
            "geometry.coordinates" :
            {
                "$nearSphere" :
                {
                    "$geometry" :
                    {
                        "type" : "Point",
                        "coordinates" : [lat, lon]
                    },//geometry
                    "$maxDistance" : maxDistance
                }//sphere
            }//geom coords
        }//out obj
    ).limit(lim);

var nearPOIs = [];
while(cursor.hasNext()) {
    var point = cursor.next();
    var pointOwner = Spark.loadPlayer(point.properties.uoid);
    if(pointOwner !== null) {
        var owner_display_name = pointOwner.getDisplayName();
        var owner_user_name = pointOwner.getUserName();
        point.properties.owner_display_name = owner_display_name;
        point.properties.owner_user_name = owner_user_name;
    }
    nearPOIs.push(point);
}

Spark.setScriptData("base_point", LatLon);
Spark.setScriptData("points", nearPOIs);

/*var nearPOIs = [];
while(cursor.hasNext()) {
    var point = cursor.next();
    var point_lat = point.geometry.coordinates[0];
    var point_lon = point.geometry.coordinates[1];
    var a = point_lat - deltaNearBy < lat;
    var b = lat < point_lat + deltaNearBy;
    var c = point_lon - deltaNearBy < lon;
    var d = lon < point_lon + deltaNearBy;
    if(a && b && c && d) {
        nearPOIs.push(point);
    }
}
nearPOIs = nearPOIs.slice(0, 5);*/
