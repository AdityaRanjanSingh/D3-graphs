
angular.module('myApp',[])
.controller('mainController',['$scope',function($scope){
/*	var scaleX =  d3.scaleLinear()
		.domain([1, 5])
		.range([0, 200]);*/

		var outerWidth = 300;
		var outerHeigth = 250;
		var rMin = 1;
		var rMax = 6;
		var xColumn = "sepal_length";
		var yColumn = "petal_length";
		var rColumn = "sepal_width";
		var colorColumn = "species";


		var svg = d3.select("body")
		.append("svg")
		.attr("height",outerHeigth)
		.attr("width",outerWidth);

		var xScale = d3.scaleLinear().range([0,outerWidth]);

		var yScale = d3.scaleLinear().range([outerHeigth,0]);
		var rScale = d3.scaleLinear().range([rMin,rMax]);
		var colorScale =  d3.scaleOrdinal(d3.schemeCategory10);

	function render(data){

		xScale.domain(d3.extent(data,function(d){return d[xColumn];}));
		yScale.domain(d3.extent(data,function(d){return d[yColumn];}));
		rScale.domain(d3.extent(data,function(d){return d[rColumn];}));


		var circles = svg.selectAll("circle").data(data);

		circles.enter().append("circle")
		.attr("r",function(d){return rScale(d[rColumn]);})
		.attr("cx",function(d){return xScale(d[xColumn]);})
		.attr("fill",function(d){return colorScale(d[colorColumn]);})
		.attr("cy",function(d){return yScale(d[yColumn]);}).exit().remove()

		
	};

	function type(d){
		d.sepal_length = +d.sepal_length;
		d.sepal_width = +d.sepal_width;
		d.petal_length = +d.petal_length;
		d.petal_width = +d.petal_width;
		return d;
	}
	
	d3.csv("data/iris.csv",type,render);
	


	
}])
			