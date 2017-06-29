// ====================================================================================================
//
// Cloud Code for POI_FAIL_CAP, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
require("UTILS");

var dbPOIsOnCapture = Spark.runtimeCollection("POIsOnCapture");
var uoid = Spark.getData().uoid;
var poid = Spark.getData().poid;

dbPOIsOnCapture.remove({"poid" : poid});

var ids = [];
ids.push(uoid);

var msgData = {};
msgData.type = "TYPE_POI_FAIL_CAPTURE";
msgData.poid = poid;
msgData.uoid = uoid;
msgData.captureResult = "TIMEOUT";

UTILS_sendMessageToPlayers(msgData, 100, ids);
//UTILS_sendMessageToAllPlayers(msgData, 100);

Spark.getLog().debug("Stop capture because of timeout: " + JSON.stringify(msgData));
