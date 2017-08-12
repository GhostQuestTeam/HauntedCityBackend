// ====================================================================================================
//
// Cloud Code for POI_STAT_MANAGEMENT, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================

require("PLAYER_STAT_MANAGEMENT");

var POIActions = {
    "takeMoney": function(){
         getCurrentPlayerStats().accrueMoney(this.current_money);
         this.current_money = 0;
         updatePOI(this);
    },
    "restoreShield": function(){
        if(this.current_shields < this.maxShield() && getCurrentPlayerStats().tryBuy(300)){
            this.current_shields += 300;
            if(this.current_shields > this.maxShield()){
                this.current_shields = this.maxShield();
            }
            updatePOI(this);
        }    
    },
    "attackShield": function(){
        if(this.current_shields > 0 && getCurrentPlayerStats().tryBuy(150)){
            this.current_shields -= 300;
            if(this.current_shields < 0){
                this.current_shields = 0;
            }
            updatePOI(this);
        }    
    },
    "upgradeShield": function(){
        if(this.shields_level < 5 && getCurrentPlayerStats().tryBuy(this.shieldUpgradePrice())){
            this.shields_level++;
            updatePOI(this);
        }
    },
    "upgradeIncome": function(){
        if(this.income_level < 5 && getCurrentPlayerStats().tryBuy(this.incomeUpgradePrice())){
            this.income_level++;    
            updatePOI(this);
        }
    }
}

var PointOfInterest = {
    "maxShield":function(){
        return this.shields_level * 300;
    },
    "shieldUpgradePrice":function(){
        return 500 * this.shields_level;
    },
    "incomeUpgradePrice":function(){
        return 500 * this.income_level;
    },
    
    
};
PointOfInterest.__proto__ = POIActions;
function isAllowableAction(action){
    return POIActions.hasOwnProperty(action);
}

function getPOI(id){
    var poi = Spark.runtimeCollection("dbPOIs").findOne(
        {"_id":{$oid:id}}     
    ).properties;
    poi.id = id;
    poi.__proto__ = PointOfInterest;
    return poi;
}

//TODO Extract statement generating to separate function
function updatePOI( poiData){
    var query =   {"_id":{$oid: poiData.id}};
    var statement = {"$set":{}}
    for(var key in poiData){
        if(poiData.hasOwnProperty(key)){
            statement["$set"]["properties." + key] = poiData[key];
        }
    }
    Spark.runtimeCollection("dbPOIs").update(query, statement);
}