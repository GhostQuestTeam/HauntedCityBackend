// ====================================================================================================
//
// Cloud Code for PLAYER_STAT_MANAGEMENT, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================

var PlayerStats = {
    "updateExpToLevel" : function(){
        var lvl = this.level;
        this.expToLevel = 80 * lvl * lvl * lvl + 50 * lvl + 1000;
    },
    "nextLevel":function(){
        this.level++;
        this.upgradePoints += 5;
        this.exp = 0;
        this.updateExpToLevel(); 
    },
    "earnExp": function(exp){
        this.updateExpToLevel(); 
        do
        {
                var tmp = (this.expToLevel - this.exp);
                if (exp >= tmp)
                {
                    exp -= tmp;
                    this.nextLevel();
                    if (exp < 0)
                    {
                        break;
                    }
            }
        } while (this.exp >= this.expToLevel);
        this.exp += exp;
    }
}

function getCurrentPlayerStats(){
    var playerData = Spark.runtimeCollection("playerData"); 
    var currentPlayer = playerData.findOne({
    "playerID": Spark.getPlayer().getPlayerId()
    });
    var result = currentPlayer.Stats;
    result.__proto__ = PlayerStats;
    return result;
}

function updateCurrentPlayerStats(stats){
    var statement = {"$set":{}}
    for(var key in stats){
        if(stats.hasOwnProperty(key)){
                    statement["$set"]["Stats." + key] = stats[key];

        }
    }
    
    Spark.runtimeCollection("playerData").update(
        {"playerID": Spark.getPlayer().getPlayerId()}, statement
    );
}

function earnExp(exp){
    var stats = getCurrentPlayerStats();
    stats.earnExp(exp);
    updateCurrentPlayerStats(stats);
}