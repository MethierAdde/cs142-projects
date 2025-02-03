'use strict'

function cs142MakeMultiFilter(originalArray){
    let currentArray = originalArray;
    function arrayFilter(filterCriteria,callback){
        if(typeof filterCriteria !== "function"){
            return originalArray;
        }
        currentArray = currentArray.filter(filterCriteria);
        if(typeof callback === "function")
        {
            callback = callback.bind(originalArray);
            callback(currentArray);
        }
        originalArray = currentArray;
        return arrayFilter;
    }
    return arrayFilter;
}