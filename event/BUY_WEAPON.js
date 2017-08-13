// ====================================================================================================
//
// Cloud Code for BUY_WEAPON, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================


require("PLAYER_STAT_MANAGEMENT");

var stats = getCurrentPlayerStats();
var weaponID = Spark.getData().WeaponID;
stats.tryBuyWeapon(weaponID);
updateCurrentPlayerStats(stats);
