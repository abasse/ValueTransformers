// Range includes max

function integer(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomArrayIndex(max) {
    return Math.floor(Math.random() * max);
}
   
function float(optionsMin,optionsMax,optionsFixed) {
    
    var MAX_INT = 9007199254740992;
    var MIN_INT = -MAX_INT;
    
    var num;
    var fixed = Math.pow(10, optionsFixed);
    
    var max = MAX_INT / fixed;
    var min = -max;
    
    num = integer(optionsMin * fixed, optionsMax * fixed);
    var num_fixed = (num / fixed).toFixed(optionsFixed);
    
    return parseFloat(num_fixed);
}

