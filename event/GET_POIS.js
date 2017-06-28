// ====================================================================================================
//
// Cloud Code for GET_POIS, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
var strLatLon = Spark.getData().POS;
var LatLonJSON = JSON.parse(strLatLon)
var lat = LatLonJSON.lat;
var lon = LatLonJSON.lon;
var deltaNearBy = 0.2;
var maxDistance = 25 * 1000;
var lim = 100;

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
    nearPOIs.push(point);
}

Spark.setScriptData("base_point", LatLonJSON);
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
