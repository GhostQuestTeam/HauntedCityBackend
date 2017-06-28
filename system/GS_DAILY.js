// ====================================================================================================
//
// Cloud Code for GS_DAILY, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================
function increaseMoneyOnPoints() {
    var dbPOIs = Spark.runtimeCollection("dbPOIs");
    var cursor = dbPOIs.find();

    while(cursor.hasNext()) {
        var data = cursor.next();
        var copy = JSON.parse(JSON.stringify(data));
        
        var income_level = data.properties.income_level;
        var current_money = data.properties.current_money;
        
        var new_money = current_money + income_level * 300;
        
        copy.properties.current_money = new_money;
        
        dbPOIs.applyChanges(data, copy);
    }
    Spark.setScriptData("res", "OK");
}

increaseMoneyOnPoints();
