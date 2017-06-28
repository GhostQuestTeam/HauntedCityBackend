// ====================================================================================================
//
// Cloud Code for POI_CAP, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
require("UTILS");

var poiId = Spark.getData().POI_ID;
var dbPOIs = Spark.runtimeCollection("dbPOIs");
var dbPlayerPOIdata = Spark.runtimeCollection("playerPOIdata");
var dbPOIsOnCapture = Spark.runtimeCollection("POIsOnCapture");

//we did not lose!!!
Spark.getScheduler().cancel("POI_FAIL_CAP");

//new owner
var playerId = Spark.getPlayer().getPlayerId();

//prev owner
var prevOwnerPlayerId = dbPOIs.findOne({
    "_id" :
    {
        "$oid" : poiId
    }
}).properties.uoid;

//not capture again
if(playerId == prevOwnerPlayerId) {
    Spark.setScriptData("_debug", "FAIL");
    Spark.exit();
}

//check if point was capturing
var cursorToCheckOnCapture = dbPOIsOnCapture.findOne({
    "poid" : poiId
});

if(cursorToCheckOnCapture !== null) {
    var capSession = cursorToCheckOnCapture;
    if(capSession.uoid == playerId) {
        dbPOIsOnCapture.remove({"poid" : poiId});
    }
    else {
        Spark.setScriptData("_debug", "FAIL");
        Spark.exit();
    }
}
else {
    Spark.setScriptData("_debug", "FAIL");
    Spark.exit();
}


//update poi info in the points metadata db
dbPOIs.update(
    {
    "_id":
        {
        "$oid" : poiId
        }
    }, 
    {
        "$set" : 
        {
            "properties.uoid" : playerId
        }
    },
    false, 
    false);
    
//add point to the new owner in the players points metadata db
dbPlayerPOIdata.update({
    "uoid" : playerId
}, 
{
    "$addToSet" : { "POIs" : poiId },
    "$inc" : {"numOfPOIs" : 1}
});

//remove point from prev owner
dbPlayerPOIdata.update({
    "uoid" : prevOwnerPlayerId
}, 
{
    "$pull" : { "POIs" : poiId },
    "$inc" : {"numOfPOIs" : -1}
});


//send message to everybody
var msgData = {};
msgData.poid = poiId;
msgData.newOwner = playerId;
msgData.prevOwner = prevOwnerPlayerId;
UTILS_sendMessageToAllPlayers(msgData, 100);




//for debug
var poi = dbPOIs.findOne({
    "_id" :
    {
        "$oid" : poiId
    }
});

var newOwner = dbPlayerPOIdata.findOne({
    "uoid" : playerId
});

var prevOwner = dbPlayerPOIdata.findOne({
    "uoid" : prevOwner
});

var _debug = {};
_debug.poi = poi;
_debug.newOwner = newOwner;
_debug.prevOwner = prevOwner;

Spark.setScriptData("_debug", _debug);
