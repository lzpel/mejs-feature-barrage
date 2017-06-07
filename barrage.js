(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Loop button
 *
 * This feature creates a loop button in the control bar to toggle its behavior. It will restart media once finished
 * if activated
 */

// Feature configuration
Object.assign(mejs.MepDefaults, {
	barrageLayer: "barragelayer",
	barrageForm: "barrageform",
	barrageInterval: 2,
});

Object.assign(MediaElementPlayer.prototype, {
	buildbarrage: function buildbarrage(player, controls, layers, media) {
		var t = this


		var barrage = document.createElement('div');
		barrage.className = t.options.classPrefix + "button " + t.options.classPrefix + "barrage " + (player.options.barrage ? t.options.classPrefix + "barrage-on" : t.options.classPrefix + "barrage-off");
		barrage.innerHTML =
			"<form class='barrageline' id='"+t.options.barrageForm+"'>"+
			"  <div class='barrageinput'>"+
			"      <input type='text'></input>"+
			"  </div>"+
			"  <div class='barragesubmit'>"+
			"    <button class='barragesubmit'></button>"+
			"  </div>"+
			"</form>"

		t.addControlElement(barrage, 'barrage');

		var barragelayer
		barragelayer = document.createElement('div');
		barragelayer.className = t.options.classPrefix + 'layer ' + t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'barrage';
		barragelayer.style="display:block;width:100%;height:100%;"
		barragelayer.id=t.options.barrageLayer
		barragelayer.innerHTML = '';
		layers.insertBefore(barragelayer, layers.firstChild);

		player.playBarrage=function(){
			var times=[null,null,null,null,null,null,null,null,null]
			var rices=[]
			for(var i=0;i<barragelayer.childNodes.length;i++){
				var x=barragelayer.childNodes.item(i)
				rices.push({
					node:x,
					time:parseFloat(x.getAttribute("time"))
				})
			}
			rices.sort(function(a,b){
				return a.time-b.time
			})
			for(var i=0;i<rices.length;i++){
				var rice=rices[i]
				var line
				for(var j=0;j<times.length;j++){
					if((times[j]==null)||(rice.time-times[j])>t.options.barrageInterval){
						line=j
						break
					}
				}
				if(line<0){
					line=Math.floor(Math.random()*times.length)
				}
				times[line]=rice.time
				rice.node.setAttribute("style",
					"animation-name:"+rice.node.getAttribute("anim")+";"+
					"animation-delay:"+(rice.time-media.getCurrentTime())+"s;"+
					"top:"+(line/times.length*80)+"%;"
				)
			}
		}
		player.pauseBarrage=function(){
			for(var i=0;i<barragelayer.childNodes.length;i++){
				var rice=barragelayer.childNodes.item(i);
				var style=rice.currentStyle||document.defaultView.getComputedStyle(rice,'')
				rice.setAttribute("style",
					"top:"+style.top+";"+
					"left:"+style.left+";"+
					"right:"+style.right+";"+
					"transform:"+style.transform+";"
				)
			}
		}
		media.addEventListener('play', player.playBarrage)
		media.addEventListener('pause', player.pauseBarrage);

		// add a click toggle event
		barrage.addEventListener('click', function () {
			player.options.barrage = !player.options.barrage;
			if (player.options.barrage) {
				mejs.Utils.removeClass(barrage, t.options.classPrefix + "barrage-off");
				mejs.Utils.addClass(barrage, t.options.classPrefix + "barrage-on");
			} else {
				mejs.Utils.removeClass(barrage, t.options.classPrefix + "barrage-on");
				mejs.Utils.addClass(barrage, t.options.classPrefix + "barrage-off");
			}
		});
	}
});

},{}]},{},[1]);