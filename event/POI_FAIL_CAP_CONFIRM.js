// ====================================================================================================
//
// Cloud Code for POI_FAIL_CAP_CONFIRM, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
require("UTILS");
require("PLAYER_STAT_MANAGEMENT");

var poiId = Spark.getData().POI_ID;
var dbPOIs = Spark.runtimeCollection("dbPOIs");
var dbPlayerPOIdata = Spark.runtimeCollection("playerPOIdata");
var dbPOIsOnCapture = Spark.runtimeCollection("POIsOnCapture");
var playerId = Spark.getPlayer().getPlayerId();

//check if point is being captured
var cursorToCheckOnCapture = dbPOIsOnCapture.findOne({
    "poid" : poiId
});

if(cursorToCheckOnCapture !== null) {
    var capSession = cursorToCheckOnCapture;
    if(capSession.uoid == playerId) { //if player really cancels its session
        dbPOIsOnCapture.remove({"poid" : poiId});
        Spark.getScheduler().cancel("POI_FAIL_CAP");
        Spark.setScriptData("result", "OK");
        getCurrentPlayerStats().die();
        Spark.exit();
    }
    else {
        Spark.setScriptData("result", "FAIL");
        Spark.exit();
    }
}
else {
    Spark.setScriptData("result", "FAIL");
    Spark.exit();
}

