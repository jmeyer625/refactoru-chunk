var chunk = function(arr, num) {
	var res = [];
	var newLength = Math.floor(arr.length / num);
	var extras = arr.length % num;
	for (var i=0; i<num; i++) {
		if (extras) {
			res.push(arr.splice(0,newLength+1));
			extras -= 1;
		} else {
			res.push(arr.splice(0,newLength));
		}
	}
	return res;
}

var animateGroup = function(arr) {
	var paper = Raphael(200, 200, 800, 600);
	var circleArr = [];
	for (var i=0; i<arr.length; i++) {
		for(var j=0; j<arr[i].length; j++){
			var r = 10
			var circle = paper.circle(10,10,r);
			circle.attr('stroke','#fff');
			circle.x = r+50*i;
			circle.y = r+40*j;
			circleArr.push(circle);
		}
	}
	for (var i=0; i<circleArr.length; i++) {
		animateCircle(circleArr[i]);
	}	
}

var animateCircle = function(circle) {
	circle.attr('fill','#f00');
	circle.animate({cx:circle.x}, 1000, "elastic", function(){
		circle.animate({cy:circle.y}, 1000, "bounce")
	})
}

$(function(){


	$(document).on('click','#numSubmit',function(e){
		e.preventDefault();
		$('svg').remove();
		var arr = [];
		for (var i=0; i<parseInt($('#numPeople').val()); i++) {
			arr.push(i);
		}
		var numGroups = parseInt($('#numGroups').val());
		var chunkedArr = chunk(arr, numGroups);
		animateGroup(chunkedArr);
	})
})