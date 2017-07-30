// ====================================================================================================
//
// Cloud Code for GET_LEADERBOARD, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
function getBestPlayers(limit) {
    var cursor = Spark.runtimeCollection("playerPOIdata").find().sort({"numOfPOIs" : -1}).limit(limit);
    var players = [];
    while(cursor.hasNext()) {
        players.push(cursor.next());
    }
    return players;
}

function getCurrentPlayerRankInfo(playerId) {
    var playerData = Spark.runtimeCollection("playerPOIdata").findOne({"uoid" : playerId});
    if(playerData) {
        var curNumOfPOIs = playerData.numOfPOIs;
        var place = Spark.runtimeCollection("playerPOIdata").find({ "numOfPOIs" : {"$gt" : curNumOfPOIs} }).count();
        playerData.place = place + 1;
    }
    return playerData;
}

var playerId = Spark.getPlayer().getPlayerId();
var players = getBestPlayers(7);
var playerRankInfo =  getCurrentPlayerRankInfo(playerId);

Spark.setScriptData("rank", playerRankInfo);
Spark.setScriptData("players", players);
