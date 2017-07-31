// ====================================================================================================
//
// Cloud Code for PLAYER_STAT_MANAGEMENT, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================

require("UTILS");

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
    },
    "tryUpgradeStats":function(stats){
        var totalPoints = stats.endurance + stats.survivability + stats.power;
        if(this.upgradePoints < totalPoints) return false;
        
        var newEndurance = this.endurance + stats.endurance;
        var newSurvivability = this.survivability + stats.survivability;
        var newPower = this.power + stats.power;
        
        if((newEndurance > 30) || ( newSurvivability > 30) || (newPower > 30) ){
            return false;
        }
        
        this.upgradePoints -= totalPoints;
        this.endurance = newEndurance;
        this.survivability = newSurvivability;
        this.power = newPower;
        
        return true;
    },
    "tryBuy":function(price){
        if(this.money >= price){
            this.money -= price;
            return true;
        }
        return false;
    },
    
    "tryBuyWeapon": function(weaponID){
        weapon = Spark.metaCollection("Weapons").findOne({"id":weaponID});
        if(!weapon) return false;//not exist weapon with such id 
        if(~this.allowableWeapons.indexOf(weaponID)) return false;//player already has whis weapon
        var buySuccess = this.tryBuy(weapon.cost);
        if(buySuccess){
            stats.allowableWeapons.push(weaponID);
            return true;
        }
        return false;//not enough money;
    },
    
    "chooseWeapons": function(weapons){
        this.currentWeapons = [];
        for(var i =0; i < weapons.length; i++){
            if(~this.allowableWeapons.indexOf(weapons[i])){
                this.currentWeapons.push(weapons[i]);
            }
        }
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
    sendUpdatePlayerMessage();
}

function sendUpdatePlayerMessage(){
    var stats = getCurrentPlayerStats();
    var messageData = {};
    messageData.type  = "PLAYER_STATS_UPDATE";
    messageData.data = stats;
    UTILS_sendMessageToPlayers(messageData , 480, [Spark.getPlayer().getPlayerId()]);
}
