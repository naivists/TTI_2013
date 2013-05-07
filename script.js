//function listDiff(list1, list2) {
//
//
//    function semiDiff(l1, l2) {
//	var result = [];
//	for (var i = 0; i < l1.length; i++) {
//	    var found = false;
//	    for (var j = 0; j < l2.length; j++) {
//		if (l2[j] === l1[i]) {
//		    found = true;
//		    break;
//		}
//	    }
//	    if (!found)
//		result.push(l1[i]);
//	}
//	return result;
//    }
//    
//    return semiDiff(list1,list2).concat(semiDiff(list2,list1));
//}
//
//var theDiff = listDiff([1,2,"a",3,4],[4,3,6,8]);



//var coords = {
//        x : 0,
//        y : 0,
//        save : function (newX, newY) {
//            this.x = newX;
//            this.y = newY;
//        }
//    };
//    
//    coords.save = function(newX, newY) {
//        this.x = Math.abs(newX);
//        this.y = Math.abs(newY);
//    };