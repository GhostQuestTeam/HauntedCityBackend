// ====================================================================================================
//
// Cloud Code for GS_PLAYER_DISCONNECT, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================

var playerID = Spark.getPlayer().getPlayerId();

Spark.runtimeCollection("playersOnline").remove(
     {"playerID": playerID }
);

Spark.runtimeCollection("POIsOnCapture").remove(
    {"uoid":playerID}
);