// ====================================================================================================
//
// Cloud Code for FAKE_EVENT_FOR_EXECUTION, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
require("UTILS");

function setBattleStatsForPOIs() {
    var dbPOIs = Spark.runtimeCollection("dbPOIs");
    var cursor = dbPOIs.find();

    while(cursor.hasNext()) {
        var data = cursor.next();
        var copy = JSON.parse(JSON.stringify(data));
        
        var income_level = UTILS_getRandomInt(1, 5);
        var guards_level = UTILS_getRandomInt(1, 5);
        var shields_level = UTILS_getRandomInt(1, 5);
        var current_money = UTILS_getRandomInt(1, 1000);
        var current_shields = UTILS_getRandomInt(1, shields_level);
        
        copy.properties.income_level = income_level;
        copy.properties.guards_level = guards_level;
        copy.properties.shields_level = shields_level;
        copy.properties.current_money = current_money;
        copy.properties.current_shields = current_shields;
        
        dbPOIs.applyChanges(data, copy);
    }
    Spark.setScriptData("res", "OK");
}

function increaseMoneyOnPoints() {
    var dbPOIs = Spark.runtimeCollection("dbPOIs");
    var cursor = dbPOIs.find();

    while(cursor.hasNext()) {
        var data = cursor.next();
        var copy = JSON.parse(JSON.stringify(data));
        
        var income_level = data.properties.income_level;
        var current_money = data.properties.current_money;
        
        var new_money = current_money + income_level * 300;
        if(new_money > income_level * 900 )
        {
            new_money = income_level * 900;
        }
        
        copy.properties.current_money = new_money;
        
        dbPOIs.applyChanges(data, copy);
    }
    Spark.setScriptData("res", "OK");
}

increaseMoneyOnPoints();

