// ====================================================================================================
//
// Cloud Code for SAVE_PLAYER, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
    var playerDataList = Spark.runtimeCollection("playerData"); // this will get the collection of player data
    var playerID = Spark.getPlayer().getPlayerId(); // first we get the id of the current player
    
    var playerStats = Spark.getData().PLAYER;
    var currentPlayer = {
        "playerID": playerID,
        "Stats": playerStats,
    }; 
    
    playerDataList.update({
        "playerID": playerID
    }, 
    {
        "$set": currentPlayer
    }, 
    true, 
    false 
    );