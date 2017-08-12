// ====================================================================================================
//
// Cloud Code for POI_ACTION, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================

require("POI_STAT_MANAGEMENT");

var id = Spark.getData().POI_ID;
var action = Spark.getData().ACTION;

performAction(action, id);