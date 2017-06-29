// ====================================================================================================
//
// Cloud Code for POI_START_CAP, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================

var poiId = Spark.getData().POI_ID;
var dbPOIs = Spark.runtimeCollection("dbPOIs");
var dbPOIsOnCapture = Spark.runtimeCollection("POIsOnCapture");
var playerId = Spark.getPlayer().getPlayerId();
var secondsForGame = 3000;


var cursorToCheckOwner = dbPOIs.findOne({
    "_id" :
    {
        "$oid" : poiId
    }
});

var cursorToCheckOnCapture = dbPOIsOnCapture.findOne({
    "poid" : poiId
});

var check1 = false;
var check2 = false;
var check3 = false;

var check1 = cursorToCheckOwner !== null;

if(check1)
    check2 = cursorToCheckOwner.properties.uoid != playerId;
    
var check3 = cursorToCheckOnCapture === null;
var isOK = check1 && check2 && check3;

if(isOK) {
    dbPOIsOnCapture.insert({
        "uoid" : playerId,
        "poid" : poiId
    });
    Spark.setScriptData("started", "OK");
    Spark.getScheduler().inSeconds("POI_FAIL_CAP", secondsForGame, { "uoid" : playerId, "poid" : poiId });
    Spark.getLog().debug("Start capture: poid - " + poiId + " uoid - " + playerId);
}
else {
    Spark.setScriptData("started", "FAIL");
}