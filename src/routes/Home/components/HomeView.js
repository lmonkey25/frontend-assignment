import React from 'react'
import Point from '../assets/oval.png'
import classes from './HomeView.scss'

var HomeView = React.createClass({
	getInitialState: function(){
		return {
			flag1: false,
			flag2: false,
			flag3: false,
			flag4: false,
			selectedBall: false
		};
	},

	componentDidMount: function(){
		this.num = 0;		
		this.pane = null;
		this.xArray = [];
		this.yArray = [];
		this.pXArray = [];
		this.pYArray = [];

		this.restart();

	},

	restart: function(){
		this.num = 0;
		var width = 440;
		var height = 440;
		this.setState({
			flag4: false,
			flag3: false,
			flag2: false,
			flag1: false,
			selectedBall: false
		});
		this.generate();
		
		d3.select("svg").remove();
		this.pane = d3.select("#pane")
					  .append("svg:svg")
					  .attr("width", width)
					  .attr("height", height);
					  
		for(var i=40; i <= width - 40; i=i+40){
			this.pane.append("svg:line")
					 .attr("x1", 40)
					 .attr("y1", i)
					 .attr("x2", width-40)
					 .attr("y2", i)
					 .style("stroke", "rgb(6,120,155)")
					 .style("stroke-width",2);
		}

		for(var i=40; i <= height-40; i=i+40){
			this.pane.append("svg:line")
					 .attr("x1", i)
					 .attr("y1", 40)
					 .attr("x2", i)
					 .attr("y2", height-40)
					 .style("stroke", "rgb(6, 120, 155)")
					 .style("stroke-width", 2);
		}

	},

	generate: function(){
		var t = 0;
		var x = null;
		var y = null;
		while(t < 4){
			x = Math.floor(Math.random() * 10);
			y = Math.floor(Math.random() * 10);
			if(this.checkPrePoint(x, y, t) == true){
				this.pXArray[t] = x;
				this.pYArray[t] = y;
				t++;
			}
		}
		console.log("generating finished");
		console.log(this.pXArray);
		console.log(this.pYArray);
	},

	checkPoint: function(x, y){
		for(var i = 0; i < this.num; i++){
			if(x == this.xArray[i] && y == this.yArray[i]){
				return false;
			}
		}
		return true;
	},

	checkPrePoint: function(x, y, num){
		for(var i = 0; i < num; i++){
			if(x == this.pXArray[i] && y == this.pYArray[i]){
				return false;
			}
		}
		return true;
	},

	paneClick: function(e){
		if(this.num <4 && this.state.selectedBall == true){
			var x = e.pageX - document.getElementById("pane").offsetLeft;
			var y = e.pageY - document.getElementById("pane").offsetTop;
			var xIndex = Math.floor(x / 40);
			var yIndex = Math.floor(y / 40);
			x = (xIndex + 1) * 40 - 16;
			y = (yIndex + 1) * 40 - 16;

			if(this.checkPoint(xIndex, yIndex) == true){
				this.xArray[this.num] = xIndex;
				this.yArray[this.num] = yIndex;

				this.pane.append("svg:image")
				.attr("x", x)
				.attr("y", y)
				.attr("width", 32)
				.attr("height", 32)
				.attr("xlink:href", "oval.png");
				this.setState({
					selectedBall: false
				});
				this.num++;		
			}	
		}
	},

	pointClick: function(index){
		if(this.state.selectedBall == false){
			switch(index){
				case 0:
					this.setState({
						flag1: true,
						selectedBall: true
					});
					break;
				case 1:
					this.setState({
						flag2: true,
						selectedBall: true
					});
					break;
				case 2:
					this.setState({
						flag3: true,
						selectedBall: true
					});
					break;
				case 3:
					this.setState({
						flag4: true,
						selectedBall: true
					});
					break;
			}
		}	
	},

	checkAll: function(){
		if(this.num < 4){
			alert("please drag point more");
		}else{
			for(var i = 0; i < 4; i++){
				if(this.xArray[i] != this.pXArray[i] || this.yArray[i] != this.pYArray[i]){
					alert("Incorrect");
					return false;
				}
			}
			alert("Correct");
			return true;
		}
		return null;
	},

	render: function(){
		return (
			<div>
				<div className={classes.leftsidebar}>
					<img src={Point} className={classes.point + " " + (this.state.flag1==true? classes.selectedPoint:null)} onClick={()=>{this.pointClick(0)}}/>
					<img src={Point} className={classes.point + " " + (this.state.flag2==true? classes.selectedPoint:null)} onClick={()=>{this.pointClick(1)}}/>
					<img src={Point} className={classes.point + " " + (this.state.flag3==true? classes.selectedPoint:null)} onClick={()=>{this.pointClick(2)}}/>
					<img src={Point} className={classes.point + " " + (this.state.flag4==true? classes.selectedPoint:null)} onClick={()=>{this.pointClick(3)}}/>
				</div>
				<div className={classes.mainContent}>
					<div id="pane" className={classes.pane + " " + (this.state.selectedBall==true? classes.selectedPane: null)} onClick={this.paneClick}>
					</div>
					<button onClick={this.restart}>restart</button>
					<button onClick={this.checkAll}>check</button>
				</div>
				<div className={classes.clear}>
				</div>
			</div>
		);
	}
});

export default HomeView
