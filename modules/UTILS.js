// ====================================================================================================
//
// Cloud Code for UTILS, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
function UTILS_getAllPlayerIDs() {
    var cursor = Spark.runtimeCollection("playerPOIdata").distinct("uoid");
    return cursor;
}

function UTILS_sendMessageToPlayers(data, expireH, playerIDs) {
    var message = Spark.message(null);
    message.setPlayerIds(playerIDs);
    message.setMessageData(data);
    message.setExpireAfterHours(expireH);
    message.send();
}

function UTILS_sendMessageToAllPlayers(data, expireH) {
    var playerIDs = UTILS_getAllPlayerIDs();
    UTILS_sendMessageToPlayers(data, expireH, playerIDs);
}

function UTILS_getBestPlayers(limit) {
    var cursor = Spark.runtimeCollection("playerPOIdata").find().sort({"numOfPOIs" : -1}).limit(limit);
    var players = [];
    while(cursor.hasNext()) {
        players.push(cursor.next());
    }
    return players;
}
