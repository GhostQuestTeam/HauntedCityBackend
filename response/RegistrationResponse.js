// ====================================================================================================
//
// Cloud Code for RegistrationResponse, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================

var data = Spark.getData();
var uoid = Spark.getData().userId;
var displayName = Spark.getData().displayName;
var isNew = Spark.getData().newPlayer;

if(isNew) // only save if it is a new player
{
    Spark.runtimeCollection("playerPOIdata").insert({
        "uoid" : uoid,
        "displayName" : displayName,
        "numOfPOIs" : 0,
        "POIs" : []
    })
}