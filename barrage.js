(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Loop button
 *
 * This feature creates a loop button in the control bar to toggle its behavior. It will restart media once finished
 * if activated
 */

// Translations (English required)

mejs.i18n.en["mejs.barrageSubmit"] = "Submit";

// Feature configuration
Object.assign(mejs.MepDefaults, {
	/**
  * @type {?String}
  */
	barrageSubmit: null
});

Object.assign(MediaElementPlayer.prototype, {
	buildbarrage: function buildbarrage(player, controls, layers, media) {
		var t = this
		var barrageTitle = mejs.Utils.isString(t.options.barrageSubmit) ? t.options.barrageSubmit : mejs.i18n.t('mejs.barrageSubmit')


		var barrage = document.createElement('div');
		barrage.className = t.options.classPrefix + "button " + t.options.classPrefix + "barrage " + (player.options.barrage ? t.options.classPrefix + "barrage-on" : t.options.classPrefix + "barrage-off");
		barrage.innerHTML =
			"<div class='barrageline'>"+
			"  <div class='barragecolor'>"+
			//"      <input type='text'></input>"+
			"  </div>"+
			"  <div class='barragemove'>"+
			//"      <input type='text'></input>"+
			"  </div>"+
			"  <div class='barrageinput'>"+
			"      <input type='text'></input>"+
			"  </div>"+
			"  <div class='barragesubmit'>"+
			"  </div>"+
			"</div>"

		t.addControlElement(barrage, 'barrage');

		var barragelayer
		barragelayer = document.createElement('div');
		barragelayer.className = t.options.classPrefix + 'layer ' + t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'barrage';
		barragelayer.style="display:block;width:100%;height:100%;"
		barragelayer.innerHTML = '<p anim=animR time=1 >い</p><p anim=animR time=0 >あ</p><p anim=animR time=2 >う</p><p anim=animL time=3 >え</p><p anim=animR time=4 >お</p>';
		layers.insertBefore(barragelayer, layers.firstChild);

		media.addEventListener('play', function () {
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
					if((times[j]==null)||(rice.time-times[j])>1){
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
		});
		media.addEventListener('pause', function () {
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
		});

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