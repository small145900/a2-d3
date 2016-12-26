import { Component,OnInit } from '@angular/core';
var d3 = require("d3/build/d3.min.js");


@Component({
  selector: 'my-app',
  templateUrl: `../templates/demo.html`
})
export class AppComponent implements OnInit { 
	svgpad = 30;
	stagePad = 120;
	stageWidth = 45;
	stageHeight = 52;
	actionWidth = 15;
	actionHeight = 15;
	actionPad = 3;
	gatherWidth = 40;
	gatherHeight = 50;
	rowActionNum = 3;
	dataset = [
		{
			"name":"stage0",
			"id":"s0",
			"type":"start-stage",
			"actions":[
				{
					"name":"action0",
					"id":"s0-at0",
					"type":"action",
					"inputData":"",
					"outputData":""
				}
			]
		},
		{
			"name":"stage1",
			"id":"s1",
			"type":"start-stage",
			"actions":[
				{
					"name":"action0",
					"id":"s1-at0",
					"type":"action",
					"inputData":"",
					"outputData":""
				},
				{
					"name":"action1",
					"id":"s1-at1",
					"type":"action",
					"inputData":"",
					"outputData":""
				},
				{
					"name":"action2",
					"id":"s1-at2",
					"type":"action",
					"inputData":"",
					"outputData":""
				},
				{
					"name":"action3",
					"id":"s1-at3",
					"type":"action",
					"inputData":"",
					"outputData":""
				},
				{
					"name":"action4",
					"id":"s1-at4",
					"type":"action",
					"inputData":"",
					"outputData":""
				}
			]
		},
		{
			"name":"stage2",
			"id":"s2",
			"type":"start-stage",
			"actions":[
				{
					"name":"action0",
					"id":"s2-at0",
					"type":"action",
					"inputData":"",
					"outputData":""
				},
				{
					"name":"action1",
					"id":"s2-at1",
					"type":"action",
					"inputData":"",
					"outputData":""
				}
			]
		}
	];
	stageLength = this.dataset.length;

	constructor(){};

	ngOnInit():void {

		var _this = this;
		var svg = d3.select('#workflow')
			.append('svg')
			.attr('width','100%')
			.attr('height','100%')
			.attr('fill','#fff');

		var stages = svg.append('g')
			.attr('id','stages');

		stages.selectAll('.stage')
			.data(this.dataset)
			.enter()
			.append('svg:image')
			.attr('width',_this.stageWidth)
			.attr('height',_this.stageHeight)
			.attr('class','item-stage')
			.attr('href',function(d,i){
				if(i===0){
					return 'img/start-latest.svg';
				}else if(i===(_this.dataset.length-1)){
					return 'img/end-latest.svg';
				}
				return 'img/stage-latest.svg'
			})
			.attr('data-name',function(d){
				return d.name
			})
			.attr('data-id',function(d){
				return d.id
			})
			.attr('data-type',function(d){
				return d.type
			})
			.attr('translateX',function(d,i){
				return i*(_this.stageWidth+_this.stagePad)+_this.svgpad;
			})
			.attr('translateY',function(d,i){
				return _this.stageHeight*2
			})
			.attr('transform',function(d,i){
				return 'translate('+(i*(_this.stageWidth+_this.stagePad)+_this.svgpad)+','+(_this.stageHeight*2)+')';
			})
			.each(function(d,i){
				d.translateX = i*(_this.stageWidth+_this.stagePad)+_this.svgpad;
				d.translateY = _this.stageHeight*2;
			});

		var lines = svg.append('g')
			.attr('id','lines');
			
		var stagelines = lines.append('g')
			.attr('class','stagelines')

		var actions = svg.append('g')
			.attr('id','actions');

		// line & rect
		d3.selectAll('.item-stage')
			.each(function(d,i){

				if(i!==0){
					stagelines.append('path')
						.attr('class','stage-line')
						.attr('d',function(){
							var x = d.translateX;
							var y = d.translateY + _this.stageHeight / 2;
							return 'M'+(x+2)+' '+y+'L'+(x - _this.stagePad)+' '+y;
						})
						.attr('fill','none')
						.attr('stroke','#1F6D84')
						.attr('stroke-width','2');

					actions.append('g')
						.attr('transform',function(){
							return 'translate('+(d.translateX - _this.stagePad/2 - _this.gatherWidth/2)+','+(d.translateY+_this.stagePad)+')';
						})
						.attr('class','gather')
						.append('svg:image')
						.attr('href','img/gather.jpg')
						.attr('width','40')
						.attr('height',_this.gatherHeight);
				}else{
					actions.append('g')
						.attr('class','start-action')
						.attr('transform',function(){
							return 'translate('+(d.translateX-_this.svgpad)+','+(d.translateY+_this.stagePad)+')';
						})
						.append('svg:image')
						.attr('href','img/start-action.jpg')
						.attr('width','10')
						.attr('height',_this.gatherHeight)
				}

				var currentActionY = 0;
				var itemAction = actions.append('g')
					.attr('transform',function(){
						return 'translate('+d.translateX+','+(d.translateY+_this.stagePad)+')';
					})
					.attr('class','item-action');

				itemAction.selectAll('rect')
					.data(d.actions)
					.enter()
					.append('rect')
					.attr('class','action')
					.attr('width',_this.actionWidth)
					.attr('height',_this.actionHeight)
					.attr('data-name',function(a){
						return a.name;
					})
					.attr('data-id',function(a){
						return a.id;
					})
					.attr('data-type',function(a){
						return a.type;
					})
					.attr('x',function(a,r){
						var remain = r % _this.rowActionNum;
						var actionNum = d.actions.length>=_this.rowActionNum ? _this.rowActionNum : d.actions.length;
						var moveright = (_this.stageWidth - (_this.actionWidth+_this.actionPad)*actionNum)/2;
						a.x = remain * (_this.actionWidth + _this.actionPad) + moveright;

						return a.x;
					})
					.attr('y',function(a,r){
						if(r%_this.rowActionNum===0){
							currentActionY+=_this.rowActionNum;
						}
						a.y = (currentActionY * 6 - _this.rowActionNum*6);
						return a.y+5;
					})
					.attr('fill',function(a,r){
						return '#d7d7d7';
					});

				itemAction.append('path')
					.attr('class','gatherLine')
					.attr('fill','none')
					.attr('stroke','#d7d7d7')
					.attr('stroke-width','1')
					.attr('d',function(){
						var length = d.actions.length;
						var x = d.actions[0].x;
						var x0 = x - _this.actionPad;
						var y0 = d.actions[0].y;
						var x1 = length>=_this.rowActionNum?(d.actions[_this.rowActionNum-1].x+_this.actionWidth+_this.actionPad):(d.actions[length-1].x+_this.actionWidth+_this.actionPad);
						// var y1 = d.actions[length-1].y+_this.actionWidth+_this.actionPad;
						var y1 = y0+_this.gatherHeight;
						return 'M'+x0+' '+ y0+'L'+x1+' '+y0+'L'+x1+' '+y1+'L'+x0+' '+y1+'L'+x0+' '+y0;
					})


				if(i === (_this.stageLength-1)){
					actions.append('g')
						.attr('transform',function(){
							return 'translate('+(d.translateX+_this.stageWidth+_this.svgpad)+','+(d.translateY+_this.stagePad)+')';
						})
						.attr('class','end-action')
						.append('svg:image')
						.attr('href','img/end-action.jpg')
						.attr('width','10')
						.attr('height',_this.gatherHeight);
				}
				// if(d.type="start-stage"){
				// 	actions
				// }
			})

	};

}
		










