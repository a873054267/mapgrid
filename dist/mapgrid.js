!function(t,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define([],i):"object"==typeof exports?exports.MapGrid=i():t.MapGrid=i()}(window,(function(){return function(t){var i={};function e(r){if(i[r])return i[r].exports;var s=i[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,e),s.l=!0,s.exports}return e.m=t,e.c=i,e.d=function(t,i,r){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)e.d(r,s,function(i){return t[i]}.bind(null,s));return r},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";const r=e(1),s=e(2);t.exports=class{constructor(t,i,e,r,{gridColumns:s=5,gridRows:a=5,dpi:n=96,showGrid:h=!0,showText:d=!0}={}){if(this.box=i,this.canvasWidth=e,this.canvasHeight=r,t?this.ctx=t:this._initCtx(),this.gridColumns=s,this.gridRows=a,this.showGrid=h,this.showText=d,this.dpi=n,0!==s||0!==a)this.gridLinePadding={top:0,right:0,bottom:0,left:0},this._initLayer(),this._drawGridText(),this._drawGridLine(),this._render();else{const t=this.box[2]-this.box[0],i=this.box[3]-this.box[1];console.log(`区域纬度跨度${i}，经度跨度${t}，没有格网线！`)}}getCanvas(){return this.canvas}setGridRC(t,i){this.gridColumns=i,this.gridRows=t,this.clearAll(),this._drawGridText(),this._drawGridLine(),this._render()}clearAll(){this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight)}release(){this.clearAll(),this.canvas=null,this.gridLineLayer.ctx.clearRect(0,0,this.gridLineLayer.width,this.gridLineLayer.height),this.gridLineLayer.canvas=null,this.gridLineLayer=null,this.gridTextLayer.ctx.clearRect(0,0,this.gridLineLayer.width,this.gridLineLayer.height),this.gridTextLayer.canvas=null,this.gridTextLayer=null}_initCtx(){this.canvas=document.createElement("canvas"),this.canvas.width=this.canvasWidth,this.canvas.height=this.canvasHeight,this.ctx=this.canvas.getContext("2d")}_initLayer(){const t=document.createElement("canvas");t.width=this.canvasWidth,t.height=this.canvasHeight,this.gridLineLayer={canvas:t,width:this.canvasWidth,height:this.canvasHeight,ctx:t.getContext("2d")};const i=document.createElement("canvas");i.width=this.canvasWidth,i.height=this.canvasHeight,this.gridTextLayer={canvas:i,width:this.canvasWidth,height:this.canvasHeight,ctx:i.getContext("2d")}}_render(){this.showText&&this._addGridTextToCanvas(),this.showGrid&&this._addGridLineToCanvas()}removeGridLine(){return r.removeGridLine.call(this)}_addGridLineToCanvas(){return r._addGridLineToCanvas.call(this)}_drawGridLine(){return r.drawGridLine.call(this)}_addGridTextToCanvas(){return s._addGridTextToCanvas.call(this)}_drawGridText(){return s._drawGridText.call(this)}}},function(t,i,e){"use strict";t.exports={removeGridLine(){this.gridLineLayer.ctx.clearRect(0,0,this.gridLineLayer.width,this.gridLineLayer.height),this.showGrid=!1,this.clearAll(),this._render()},_addGridLineToCanvas(){this.ctx.drawImage(this.gridLineLayer.canvas,0,0,this.gridLineLayer.width,this.gridLineLayer.height,0,0,this.canvasWidth,this.canvasHeight)},drawGridLine(){const{top:t,right:i,bottom:e,left:r}=this.gridLinePadding,s=this.gridLineLayer.ctx;s.clearRect(0,0,this.gridLineLayer.width,this.gridLineLayer.height);const a=this.gridColumns,n=this.gridRows;(a>30||n>30)&&console.log("大于30个");const h=Math.ceil(this.canvasWidth/a),d=Math.ceil(this.canvasHeight/n);s.globalAlpha=1,s.strokeStyle="rgba(0, 0, 0, 255)";for(let i=1;i<a;++i)s.beginPath(),s.moveTo(h*i,0+t),s.lineTo(h*i,this.canvasHeight-e),s.stroke();for(let t=1;t<n;++t)s.beginPath(),s.moveTo(0+r,d*t),s.lineTo(this.canvasWidth-i,d*t),s.stroke()}}},function(t,i,e){"use strict";const r=e(3),s=e(4),a=e(5);t.exports={_addGridTextToCanvas(){this.ctx.drawImage(this.gridTextLayer.canvas,0,0,this.gridTextLayer.width,this.gridTextLayer.height,0,0,this.canvasWidth,this.canvasHeight)},_drawGridText(){const t=this.gridTextLayer.ctx;t.clearRect(0,0,this.gridTextLayer.width,this.gridTextLayer.height);const i=this.gridColumns,e=this.gridRows,n=this.box;if((i>30||e>30)&&console.log("大于30个"),0===i&&0===e){const t=n[2]-n[0],i=n[3]-n[1];return void console.log(`区域纬度跨度${i}，经度跨度${t}，没有格网线！`)}const h=[...a.lonLat2Mercator([n[0],n[1]]),...a.lonLat2Mercator([n[2],n[3]])],d=Math.ceil((h[2]-h[0])/i),o=Math.ceil(this.canvasWidth/i),c=Math.ceil((h[3]-h[1])/e),l=Math.ceil(this.canvasHeight/e);t.globalAlpha=1,t.strokeStyle="rgba(0, 0, 0, 255)";for(let e=1;e<i;++e){const i=a.mercator2LonLat([h[0]+e*d,h[1]]),n=r.formatDegree(i[0])+"E",c=s._createText(t,o*e,0,n,{side:"top"});this.gridLinePadding.top=c>this.gridLinePadding.top?c:this.gridLinePadding.top;const l=s._createText(t,o*e,this.canvasHeight,n,{side:"bottom"});this.gridLinePadding.bottom=l>this.gridLinePadding.bottom?l:this.gridLinePadding.bottom}for(let i=1;i<e;++i){const e=a.mercator2LonLat([h[0],h[3]-i*c]),n=r.formatDegree(e[1])+"N",d=s._createText(t,0,l*i,n,{side:"left"});this.gridLinePadding.left=d>this.gridLinePadding.left?d:this.gridLinePadding.left;const o=s._createText(t,this.canvasWidth,l*i,n,{side:"right"});this.gridLinePadding.right=o>this.gridLinePadding.right?o:this.gridLinePadding.right}}}},function(t,i,e){"use strict";i.formatDegree=t=>{const i=parseInt(t),e=parseInt(60*Number(t-i).toFixed(12));return i+"°"+e+"′"+parseInt(3600*Number(t-i).toFixed(12)-60*e)+"″"}},function(t,i,e){"use strict";t.exports={_createText(t,i,e,r,{fontSize:s=12,side:a="top"}={}){t.save(),t.fillStyle="#000",t.font=s+"px Arial";let n=i,h=e,d=0;const o=Math.round(t.measureText(r).width);switch(a){case"top":n=i-o/2,h=e+s,d=s;break;case"bottom":n=i-o/2,h=e,d=s;break;case"left":n=i,h=e+s/3,d=o;break;case"right":n=i-o,h=e+s/3,d=o;break;default:return}return t.fillText(r,n,h),t.restore(),d}}},function(t,i,e){"use strict";t.exports={lonLat2Mercator(t){const i=[],e=20037508.342789*t[0]/180;let r=Math.log(Math.tan((90+t[1])*Math.PI/360))/(Math.PI/180);return r=20037508.342789*r/180,i.push(e),i.push(r),i},mercator2LonLat(t){const i=[],e=t[0]/20037508.342789*180;let r=t[1]/20037508.342789*180;return r=180/Math.PI*(2*Math.atan(Math.exp(r*Math.PI/180))-Math.PI/2),i.push(e),i.push(r),i}}}])}));