// ====================================================================================================
//
// Cloud Code for GET_LEADERBOARD, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
require("UTILS");

var players = UTILS_getBestPlayers(10);

Spark.setScriptData("players", players);
