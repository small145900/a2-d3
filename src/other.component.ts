import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

var d3 = require("d3/build/d3.min.js");


@Component({
  selector: 'other',
  templateUrl: `../templates/other.html`
})
export class OtherComponent implements OnInit { 
	svgpad = 50;
	stagePad = 100;
	stageWidth = 26;
	stageHeight = 26;
	actionPad = 4;
	componentWidth = 15;
	componentHeight = 15;
	componentPad = 4;
	gatherWidth = 40;
	gatherHeight = 50;
	rowActionNum = 4;
	runModeWidth = 10;
	addComponentWidth = 10;
	arcPadBig = 10;
	arcPadSmall = 6;
	addIconPad = 6;

	dataset = [
		{
			"name":"stage0",
			"id":"s0",
			"type":"start-stage",
			"runMode":"serial", //serial串行，parallel并行
			"actions":[
				{
					"components":[
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
					"components":[
						{
							"name":"action0",
							"id":"s0-at0",
							"type":"action",
							"inputData":"",
							"outputData":""
						}
					]
				}
			]
		},
		{
			"name":"stage1",
			"id":"s1",
			"type":"edit-stage",
			"runMode":"parallel",
			"actions":[
				{
					"components":[
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
						},
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
					"components":[
						{
							"name":"action0",
							"id":"s1-at0",
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
				}
			]
		},
		{
			"name":"stage2",
			"id":"s2",
			"type":"edit-stage",
			"runMode":"parallel",
			"actions":[
				{
					"components":[
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
			]
		},
		{
			"name":"stage3",
			"id":"s3",
			"type":"end-stage",
			"runMode":"",
			"actions":[]
		}
	];
	stageLength = this.dataset.length;

	constructor(private router: Router){};

	ngOnInit():void {
		var currentDragIndex;
		var endPointIndex;
		var elementType = '';
		var drag = d3.drag()
			.on("drag", dragmove)
			.on('start',function(d,i){
				currentDragIndex = i;
			})
			.on('end',sort); 
				
		function dragmove(d,i) {
			elementType = d3.select(this).attr('data-type');
			if(elementType !== 'end-stage'){
				d3.select(this)
				  .attr("translateX", d.translateX = d3.event.x )
				  .attr("transform", 'translate('+d.translateX+','+d.translateY+')');
			}	
			
		};

		function sort(d,i){
			if(currentDragIndex&&elementType!=='end-stage'){

				var dragTranslateX = d3.select(this)
			  		.attr("translateX");

			  	var stages = d3.selectAll('.item-stage')
					.each(function(d,i){
						// origin translateX
						var preTranslateX = i*(_this.stageWidth+_this.stagePad)+_this.svgpad;
						var nextTranslateX = (i+1)*(_this.stageWidth+_this.stagePad)+_this.svgpad;

						if(currentDragIndex !== i){
							var stageCenterX = preTranslateX+_this.stageWidth/2;

							if(dragTranslateX>=stageCenterX&&(dragTranslateX)<nextTranslateX){
								dealSortData(currentDragIndex,i);
								return;
							}
						}
						// if(currentDragIndex&&currentX>d.translateX&&currentX<)
						// console.log(d.translateX,(d.translateX+_this.stageWidth+_this.stagePad)+_this.svgpad)
						// console.log(i*(_this.stageWidth+_this.stagePad)+_this.svgpad)
					})
			 // console.log(currentX)
			  	
			}
		};

		function dealSortData(currentDragIndex,endPointIndex){
			console.log(currentDragIndex,endPointIndex)
		}


		var _this = this;
		var svg = d3.select('#workflow')
			.append('svg')
			.attr('width','100%')
			.attr('height','100%')
			.attr('fill','#fff');

		var lines = svg.append('g')
			.attr('id','lines');
			
		var stagelines = lines.append('g')
			.attr('class','stagelines')

		var itemStage = svg.selectAll('.item-stage')
			.data(this.dataset)
			.enter()
			.append('g')
			.attr('class','item-stage')
			.attr('data-stageIndex',function(d,i){
				return i;
			})
			.attr('data-type',function(d){
				return d.type;
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
			.call(drag);

		// add stage pic
		// itemStage.append('svg:image')
		// 	.attr('width',_this.stageWidth)
		// 	.attr('height',_this.stageHeight)
		// 	.attr('class','stage-pic')
		// 	.attr('href',function(d,i){
		// 		if(i===0){
		// 			return 'img/start-latest.svg';
		// 		}else if(i===(_this.dataset.length-1)){
		// 			return 'img/end-latest.svg';
		// 		}
		// 		return 'img/stage-latest.svg'
		// 	})
		// 	.attr('data-name',function(d){
		// 		return d.name
		// 	})
		// 	.attr('data-id',function(d){
		// 		return d.id
		// 	})
		// 	.attr('data-type',function(d){
		// 		return d.type
		// 	})
		// 	.each(function(d,i){
		// 		d.translateX = i*(_this.stageWidth+_this.stagePad)+_this.svgpad;
		// 		d.translateY = _this.stageHeight*2;
		// 	});
		
		// add stage circle
		itemStage.append('circle')
			.attr('cx',_this.stageWidth/2)
			.attr('cy',_this.stageHeight/2)
			.attr('r',_this.stageHeight/2)
			.attr('stroke','#d7d7d7')
			.attr('fill',function(d){
				return d.type === 'end-stage' ? '#fff' : '#d7d7d7';
			})
			.attr('class','stage-pic')
			.attr('data-name',function(d){
				return d.name
			})
			.attr('data-id',function(d){
				return d.id
			})
			.attr('data-type',function(d){
				return d.type
			})
			.each(function(d,i){
				d.translateX = i*(_this.stageWidth+_this.stagePad)+_this.svgpad;
				d.translateY = _this.stageHeight*2;
			});

		// add stage line & actions & components
		d3.selectAll('.item-stage')
			.each(function(d,i){
				
				// add stage line
				if(i !==0 ){
					stagelines.append('path')
						.attr('class','stage-line')
						.attr('d',function(){
							var x = d.translateX;
							var y = d.translateY + _this.stageHeight / 2;
							return 'M'+(x+_this.stageWidth)+' '+y+'L'+(x - _this.stagePad)+' '+y;
						})
						.attr('fill','none')
						.attr('stroke','#d7d7d7')
						.attr('stroke-width','2');
				};

				// add actions
				// action的y轴起点
				var currentActionY = _this.stageHeight+_this.actionPad;
				var itemAction = d3.select(this)
					.selectAll('.item-action')
					.data(d.actions)
					.enter()
					.append('g')
					.attr('class','item-action')
					.attr('data-stageIndex',function(){
						return i;
					})
					.attr('data-actionIndex',function(a,ai){
						return ai;
					})
					.attr('data-runMode',d.runMode)
					.attr('transform',function(a,ai){ // action的y轴起点
						var y = currentActionY;
						var padding = _this.componentPad * 3;
						var componentRows = Math.ceil(a.components.length/_this.rowActionNum);
						currentActionY += componentRows*(_this.componentHeight+_this.componentPad) - _this.componentPad + padding * 2 + _this.actionPad;

						return 'translate(0,'+y+')';
					});

				// add components
				itemAction.each(function(a,ai){
					// component的y轴起点
					var currentComponentY = 0;
					var perAction = d3.select(this); //1个components组===1个action

					// action的item-component
					perAction.selectAll('.item-component')
						.data(a.components)
						.enter()
						.append('rect')
						.attr('class','item-component')
						.attr('width',_this.componentWidth)
						.attr('height',_this.componentHeight)
						.attr('data-stageIndex',function(){
							return i;
						})
						.attr('data-actionIndex',function(){
							return ai;
						})
						.attr('data-componentIndex',function(c,ci){
							return ci;
						})
						.attr('data-name',function(c){
							return c.name;
						})
						.attr('data-id',function(c){
							return c.id;
						})
						.attr('data-type',function(c){
							return c.type;
						})
						.attr('x',function(c,r){
							var remain = r % _this.rowActionNum;
							var componentNum = a.components.length>=_this.rowActionNum ? _this.rowActionNum : a.components.length;
							var moveright = (_this.stageWidth - (_this.componentWidth+_this.componentPad)*_this.rowActionNum)/2;
							c.x = remain * (_this.componentWidth + _this.componentPad) + moveright;
							return c.x;
						})
						.attr('y',function(c,r){
							if(r%_this.rowActionNum===0){
								currentComponentY += 1;
							}

							if(r===0){
								currentComponentY = 0;
							}

							c.y = (currentComponentY * (_this.componentPad + _this.componentHeight) + _this.componentPad*3;
							return c.y;
						})
						.attr('fill',function(a,r){
							return '#d7d7d7';
						});

					// action borders
					perAction.append('path')
						.attr('class','gatherLine')
						.attr('fill','none')
						.attr('stroke','#d7d7d7')
						.attr('stroke-width','1')
						.attr('d',function(){
							var length = a.components.length;
							var x = a.components[0].x;
							var padding = _this.componentPad * 3;
							var x0 = x - padding;
							var y0 = a.components[0].y - padding;
							// var x1 = length>=_this.rowActionNum?(a.components[_this.rowActionNum-1].x+_this.componentWidth+_this.componentPad):(a.components[length-1].x+_this.componentWidth+_this.componentPad);
							// var x1 = _this.rowActionNum * (_this.componentWidth + _this.componentPad) - _this.componentPad * 2;
							var x1 = x + _this.rowActionNum * (_this.componentWidth + _this.componentPad) - _this.componentPad + padding;
							var y1 = a.components[length-1].y + _this.componentHeight + padding;
							// var y1 = y0+_this.gatherHeight;
							var x2 = x0 + (x1 - x0) / 2; //每个stage的中心点
							var y2 = y0 - _this.stageHeight/2 - _this.actionPad; //弧线控制点
							var x3 = x2 + _this.stageWidth/2 + _this.stagePad/2; //弧线在stage-line的中点
							var x4 = x2 - _this.stageWidth/2 - _this.stagePad/2; //弧线在stage-line的中点

							var arcToRigth = 'M'+x3+' '+y2+'L'+(x1 + _this.arcPadBig)+' '+y2+'Q'+x1+' '+y2+' '+x1+' '+(y2 + _this.arcPadBig);
							var arcToLeft = 'Q'+x0+' '+y2+' '+(x0 - _this.arcPadBig)+' '+y2+'L'+x4+' '+y2;
							var borderRight = 'L'+x1+' '+(y1 - _this.arcPadSmall)+'Q'+x1+' '+y1+' '+(x1 - _this.arcPadSmall)+' '+y1;
							var borderBottom = 'L'+(x0 + _this.arcPadSmall)+' '+y1+'Q'+x0+' '+y1+' '+x0+' '+(y1 - _this.arcPadSmall);
							var borderLeftArc = 'L'+x0+' '+(y0 + _this.arcPadSmall - _this.actionPad)+'Q'+x0+' '+(y0 - _this.actionPad)+' '+(x0 + _this.arcPadSmall)+' '+(y0 - _this.actionPad);
							var borderLeft = 'L'+x0+' '+y0+'L'+x0+' '+(y2 + _this.arcPadBig);

							if(i===0&&ai===0){
								console.log(x0,y0)
								return arcToRigth + borderRight + borderBottom + borderLeftArc+'L'+x2+' '+(y0 - _this.actionPad);
							}

							if(ai===0){
								return arcToRigth + borderRight + borderBottom + borderLeft + arcToLeft;
							}else{
								return 'M'+x1+' '+(y0 - _this.arcPadSmall - _this.actionPad) + borderRight + borderBottom +'L'+x0+' '+(y0 - _this.arcPadSmall - _this.actionPad);
							}
							// return 'M'+x0+' '+ y0+'L'+x1+' '+y0+'L'+x1+' '+y1+'L'+x0+' '+y1+'L'+x0+' '+y0;
						});

					// action并行或串行
					var actionLength = d.actions.length;
					if(d.runMode === 'parallel'){
						perAction.append('svg:image')
							.attr('width',_this.runModeWidth)
							.attr('height',_this.runModeWidth)
							.attr('class','run-mode')
							.attr('href',function(d,i){
								return 'img/parallel.jpg'
							})
							.attr('x',function(){
								var x = a.components[0].x;
								var padding = _this.componentPad*3;
								var x0 = x - padding;
								return x0 -_this.runModeWidth/2;
							})
							.attr('y',function(){
								var length = a.components.length;
								var padding = _this.componentPad * 3;
								var y0 = a.components[0].y - padding;
								var y1 = a.components[length-1].y + _this.componentHeight + padding;
								return y0 + (y1 - y0 - _this.runModeWidth) / 2;
							});
					}else if(d.runMode === 'serial'&&ai!==(actionLength-1)){
						perAction.append('svg:image')
							.attr('width',_this.runModeWidth)
							.attr('height',_this.runModeWidth)
							.attr('class','run-mode')
							.attr('href',function(d,i){
								return 'img/serial.jpg'
							})
							.attr('x',function(){
								var length = a.components.length;
								var x = a.components[0].x;
								var padding = _this.componentPad*3;
								var x0 = x - padding;
								var x1 = x + _this.rowActionNum * (_this.componentWidth + _this.componentPad) - _this.componentPad + padding;
								return x0 + (x1 - x0 - _this.runModeWidth) / 2;
							})
							.attr('y',function(){
								var length = a.components.length;
								var padding = _this.componentPad * 3;
								var y1 = a.components[length-1].y + _this.componentHeight + padding;
								return y1 - _this.runModeWidth/ 2;
							})
					}

					// component add icon 
					perAction.append('svg:image')
							.attr('width',_this.addComponentWidth)
							.attr('height',_this.addComponentWidth)
							.attr('class','add-component')
							.attr('href',function(d,i){
								return 'img/addComponent.jpg'
							})
							.attr('data-stageIndex',function(){
								return i;
							})
							.attr('data-actionIndex',function(){
								return ai;
							})
							.attr('x',function(){
								var x = a.components[0].x;
								var padding = _this.componentPad * 3;
								var x1 = x + _this.rowActionNum * (_this.componentWidth + _this.componentPad) - _this.componentPad + padding;
								return x1 - _this.addComponentWidth/2;
							})
							.attr('y',function(){
								var padding = _this.componentPad * 3;
								var y0 = a.components[0].y - padding;
								return y0 - _this.addComponentWidth/2 + _this.addIconPad;
							})

				});
			})
	};

	changeNav(val){
    	this.router.navigate([val]);
	}

}
		










