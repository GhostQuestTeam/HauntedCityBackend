// ====================================================================================================
//
// Cloud Code for UPGRADE_PLAYER_STATS, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================

require("PLAYER_STAT_MANAGEMENT");

var stats = getCurrentPlayerStats();
var statsDelta = Spark.getData().STATS;
stats.tryUpgradeStats(statsDelta);
updateCurrentPlayerStats(stats);
sendUpdatePlayerMessage();