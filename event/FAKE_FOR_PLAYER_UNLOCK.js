// ====================================================================================================
//
// Cloud Code for FAKE_FOR_PLAYER_UNLOCK, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
var playerID = Spark.getData().PID
var player = Spark.loadPlayer(playerID)

//unlock the account
player.unlock()