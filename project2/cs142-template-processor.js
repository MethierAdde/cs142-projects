'use strict';

function Cs142TemplateProcessor(template){
    this.template = template;
}
//这个写法确实厉害，虽说不知道为啥用奇怪的不合题意的写法也能过（）
Cs142TemplateProcessor.prototype.fillIn = function(dictionary){
    var re = /{{[0-9a-zA-Z]*}}/g;

    var filledIn = this.template.replace(re, (match) =>{
        var key = match.slice(2,match.length-2);
        var word = dictionary[key];
        if(word === undefined)
            return "";
        else 
            return word;
    });

    return filledIn;
}
