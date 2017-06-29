// ====================================================================================================
//
// Cloud Code for UPDATE_POINT, write your code here to customize the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://docs.gamesparks.com/
//
// ====================================================================================================

function prepareUpdateStatement(pointData){
    var statement = {}
    for(var key in pointData){
        if(pointData.hasOwnProperty(key)){
                    statement["properties." + key] = pointData[key];

        }
    }
    
    return {"$set" : statement};
}

var pointDataList = Spark.runtimeCollection("dbPOIs");
var pointID = Spark.getData().POINT_ID;
var pointDATA = Spark.getData().POINT_DATA;

var query= {"_id":{"$oid":pointID}};
var update = prepareUpdateStatement(pointDATA);
pointDataList.update(query, update);
    

