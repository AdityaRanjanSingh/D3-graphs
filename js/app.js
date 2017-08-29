
angular.module('myApp',[])
.controller('mainController',['$scope',function($scope){
/*	var scaleX =  d3.scaleLinear()
		.domain([1, 5])
		.range([0, 200]);*/



	function renderIris(data){
		var outerWidth = 500;
		var outerHeight = 250;
		var margin={
			left:130,
			right:0,
			top:30,
			bottom:60
		}
		var innerWidth = outerWidth - margin.left - margin.right;
		var innerHeight = outerHeight - margin.top - margin.bottom;
		var rMin = 1;
		var rMax = 10;
		var xColumn = "sepal_length";
		var yColumn = "petal_length";
		var rColumn = "sepal_width";
		var oColumn = "petal_width";
		var colorColumn = "species";
		var xAxisLabelOffset = 55;
		var xAxisLabelText = "Sepal Length";

		var svg = d3.select("body")
		.append("svg")
		.attr("height",outerHeight)
		.attr("width",outerWidth);

		var xScale = d3.scaleLinear().range([0,innerWidth]);
		var yScale = d3.scaleLinear().range([innerHeight,0]);
		var rScale = d3.scaleLinear().range([rMin,rMax]);
		var colorScale =  d3.scaleOrdinal(d3.schemeCategory10);
		var oScale = d3.scaleLinear().range([0,1]);

		xScale.domain(d3.extent(data,function(d){return d[xColumn];}));
		yScale.domain(d3.extent(data,function(d){return d[yColumn];}));
		rScale.domain(d3.extent(data,function(d){return d[rColumn];}));
		oScale.domain(d3.extent(data,function(d){return d[oColumn]}));

		var xAxis = d3.axisBottom(xScale);
		var yAxis = d3.axisLeft(yScale);

		var g = svg.append("g")
		.attr("width",innerWidth)
		.attr("height",innerHeight)
		.attr("transform","translate(60,30)");

		var xAxisG = g.append("g")
		.attr("class","x axis")
		.attr("transform","translate(0,"+innerHeight+")");

		var xAxisLabel = g.append("text")
		.style("text-anchor","middle")
		.attr("transform","translate("+(innerWidth/2)+","+190+")")
		.text(xAxisLabelText);
		var yAxisLabel = g.append("text")
		.style("text-anchor","middle")
		.style("transform","rotate(-90deg)")
		.text("Petal Length")
		.attr("x",-innerHeight/2)
		.attr("y",-30);



		var yAxisG = g.append("g")
		.attr("class","y axis");

		xAxisG.call(xAxis);
		yAxisG.call(yAxis);




		var circles = g.selectAll("circle").data(data);
		circles.enter().append("circle")
		.attr("r",function(d){return rScale(d[rColumn]);})
		.attr("cx",function(d){return xScale(d[xColumn]);})
		.attr("fill",function(d){return colorScale(d[colorColumn]);})
		.attr("opacity",function(d){return oScale(d[oColumn])})
		.attr("tooltip",function(d){return d.species;})
		.attr("cy",function(d){return yScale(d[yColumn]);}).exit().remove()

		
	};

	function renderGDP(data){
		var xColumn = "population";
		var yColumn = "gdp";
		var rColumn = "population";
		var margin={
			left:50,
			top:0,
			right:0,
			bottom:50
		}
		var outerHeight= 250;
		var outerWidth = 500;
		var innerHeight = outerHeight - margin.top -margin.bottom;
		var innerWidth = outerWidth -margin.left - margin.right;
		var rMin =  0;
		var rMax = 5;



		var xScale = d3.scaleLog()
		.range([0,innerWidth])
		.domain(d3.extent(data,function(d){return d[xColumn];}));

		var xAxis = d3.axisBottom(xScale);


		var yScale = d3.scaleLog()
		.range([innerHeight,0])
		.domain(d3.extent(data,function(d){return d[yColumn];}));

		var yAxis = d3.axisLeft(yScale);

		var rScale = d3.scaleSqrt()
		.domain(d3.extent(data,function(d){return d[rColumn];}))
		.range([rMin,rMax])

		var svg = d3.select("body")
		.append("svg")
		.attr("width",outerWidth)
		.attr("height",outerHeight);
		var g = svg.append("g")
		.attr("width",innerWidth)
		.attr("height",innerHeight)
		.attr("transform","translate(60,30)");


		var xAxisG = g.append("g")
		.attr("transform","translate(0,"+innerHeight+")")
		.call(xAxis);

		var yAxisG = g.append("g")
		.call(yAxis);

		

		var circles = g.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx",function(d){return xScale(d[xColumn]);})
		.attr("cy",function(d){return yScale(d[yColumn]);})
		.attr("r",function(d){return rScale(d[rColumn]);})
		.exit()
		.remove();


	}
	function renderPeople(data){
		var xColumn = "longitude";
		var yColumn = "latitude";
		var rColumn ="population"
		var outerWidth = 750;
		var outerHeight = 350;
		var rMin = 0;
		var rMax = 10;
		var margin={
			left:30,
			right:30,
			top:30,
			bottom:30
		}
		var innerHeigth = outerHeight - margin.top - margin.bottom;
		var innerWidth = outerWidth - margin.left - margin.right;

		var xScale = d3.scaleLinear()
		.range([0,innerWidth])
		.domain(d3.extent(data,function(d){return d[xColumn];}));

		var yScale = d3.scaleLinear()
		.range([innerHeigth,0])
		.domain(d3.extent(data,function(d){return d[yColumn];}));

		var rScale = d3.scaleSqrt()
		.range([rMin,rMax])
		.domain(d3.extent(data,function(d){return d[rColumn];}));

		var svg = d3.select("body")
		.append("svg")
		.attr("width",outerWidth)
		.attr("height",outerHeight)
		.attr("style","background:black")

		var g = svg.append("g")
		.attr("transform","translate(30,30)")

		g.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx",function(d){return xScale(d[xColumn]);})
		.attr("cy",function(d){return yScale(d[yColumn]);})
		.attr("r",function(d){return rScale(d[rColumn]);})
		.attr("opacity","0.3")
		.attr("fill","white")
		.exit()
		.remove();



	}

	function typeIris(d){
		d.sepal_length = +d.sepal_length;
		d.sepal_width = +d.sepal_width;
		d.petal_length = +d.petal_length;
		d.petal_width = +d.petal_width;
		return d;
	};

	function typeGDP(d){
		d.population = +d.population;
		d.gdp = +d.gdp;
		return d;
	}
	function typePeople(d){
		d.latitude = +d.latitude;
		d.longitude = +d.longitude;
		d.population = +d.population;
		return d;
	}
	
	d3.csv("data/iris.csv",typeIris,renderIris);
	d3.csv("data/populationvsgdp.csv",typeGDP,renderGDP);
	d3.csv("data/peopleandcountry.csv",typePeople,renderPeople);
	


	
}])
			