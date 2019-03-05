(function(){
	function getRandomInt(min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function getRandomFloat(min, max) {
		return Math.random() * (max - min) + min;
	}
	function nodeToArrayAndShuffle(els){
		return els = Array.prototype.slice.call(els, 0).sort(function(){return 0.5-Math.random()});
	}
	function isHidden(el) {
		var style = window.getComputedStyle(el);
		return (style.display === 'none')
	}
	TweenMax.set(".gridlines_anim .wb0219_anim_row_inner", {x: "-50%"});
	var rows = document.querySelectorAll(".gridlines_anim .wb0219_anim_row_inner");
	var rowsL = rows.length;

	for(var i=0; i < rowsL; i++){
		var row = rows[i],
			dir = row.getAttribute("data-direction"),
			speed = parseFloat( row.getAttribute("data-speed") );

		if( dir !== "+" && dir !== "-" ){
			continue;
		}

		TweenMax.to(rows[i], 50/speed, {
		  ease: Linear.easeNone,
		  x: dir+"=10%", //move each box 500px to right
		  modifiers: {
		    x: function(x) {
		      return x % 10; //force x value to be between 0 and 500 using modulus
		    }
		  },
		  repeat: -1
		});
	}

	var textTl = new TimelineMax({});
	var cursorTl = [];
	var textsLineArr = [
		[
			"This is not a test",
			"This is the evolution"
		],
		[
			"The web is dead",
			"Long live the web"
		],
		[
			"This is where we start ",
			"to change everything"
		],
		[
			"Something big is coming",
			"Ready for the evolution?"
		],
		[
			"Everything is going to change",
			"Welcome to the Evolution"
		],
		[
			"Welcome to the Evolution",
			"Leave your fiat by the door"
		],
		[
			"Everything is changing",
			"Change it with us"
		],
		[
			"The revolution is beginning",
			"Will you be there?"
		],
		[
			"This is where everything changes",
			"Welcome to the Evolution"
		]
	];
	var textsLineArrL = textsLineArr.length;
	var lsKey = 'wcs030319text';
	var $textsLineContainer = document.querySelectorAll(".print_texts");

	if (localStorage.getItem(lsKey) === null) {
		var text = [];
		var rndInt = getRandomInt(0,textsLineArrL-1);
		text[0] = textsLineArr[ rndInt ];
		localStorage.setItem(lsKey, JSON.stringify(text));

		for( var i=0; i < textsLineArr[rndInt].length ; i++){
			var insHtml = '<div class="textline textline'+i+'"><div class="iw">'+textsLineArr[rndInt][i]+'</div><div class="helper">q</div><div class="textLineCursor">|</div></div>';
			$textsLineContainer[0].insertAdjacentHTML('beforeend', insHtml);
		}
	}else{
		var storedText = JSON.parse(localStorage.getItem( lsKey ));
		for( var i=0; i < storedText[0].length ; i++){
			var insHtml = '<div class="textline textline'+i+'"><div class="iw">'+storedText[0][i]+'</div><div class="helper">q</div><div class="textLineCursor">|</div></div>';
			$textsLineContainer[0].insertAdjacentHTML('beforeend', insHtml);
		}
	}

	var $textsLine = document.querySelectorAll(".print_texts .textline");
	var $textsLineIw = document.querySelectorAll(".print_texts .textline .iw");
	var $textsLineCursor = document.querySelectorAll(".print_texts .textline .textLineCursor");
	var textsLineL = $textsLine.length;
	for( var i=0; i < textsLineL; i++ ){
		console.log("QWE1");
		var $line = $textsLineIw[i];
		$line.innerHTML = $line.innerHTML.replace(/[^\s]/g, "<span>$&</span>");//.replace(/\s/g, "&nbsp;");
	}
	for( var i = 0; i < textsLineL; i++ ){
		(function(i){
			var $line = $textsLineIw[i];
			var $cursor = $textsLineCursor[i];
			cursorTl[i] = new TimelineMax({ repeat: -1});
			cursorTl[i].to( $cursor , 0.15,  {autoAlpha:1} )
			.set({}, {}, "+=0.15")
			.to( $cursor , 0.15, {autoAlpha:0} );
			textTl.add(
				cursorTl[i]
			)
			textTl.add( 
				TweenMax.staggerFromTo( $line.querySelectorAll("span"), 0.05, {display: "none"}, {display:"inline"}, 0.07, function(){
					textTl.remove(cursorTl[i]);
					TweenMax.set( $textsLineCursor[i] , {display:"none"} );
				} )
			);
		})(i);
	}

	setInterval(function(){
		var cont = document.getElementById("wcs030319");
		cont.classList.contains("blueV") ? cont.classList.remove('blueV') : cont.classList.add('blueV');
	}, 5000);


	var t1 = document.querySelectorAll("#wcs030319 .bannerWaves_text_left"),
		t2 = document.querySelectorAll("#wcs030319 .bannerWaves_text_right"),
		b2 = document.querySelectorAll("#wcs030319 .bannerWaves_bg_right"),
		b1 = document.querySelectorAll("#wcs030319 .bannerWaves_bg_left"),
		particles = document.querySelectorAll("#wcs030319 .bannerWaves_particles"),
		particle1 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_1"),
		particle2 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_2"),
		particle3 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_3"),
		particle4 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_4"),
		particle45 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_45"),
		particle5 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_5"),
		particle6 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_6"),
		particle7 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_7"),
		particle8 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_8"),
		particle9 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_9"),
		particle10 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_10"),
		particle11 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_11"),
		particle12 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_12"),
		particle13 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_13"),
		particle14 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_14"),
		particle15 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_15"),
		particle16 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_16"),
		particle17 = document.querySelectorAll("#wcs030319 .bannerWaves_particle_17"),
		lines = document.querySelectorAll("#wcs030319 .bannerWaves_line"),
		line1 = document.querySelectorAll("#wcs030319 .bannerWaves_line1"),
		line2 = document.querySelectorAll("#wcs030319 .bannerWaves_line2"),
		line3 = document.querySelectorAll("#wcs030319 .bannerWaves_line3"),
		RglToRight_L = document.querySelectorAll("#wcs030319 .RightGlitchToRight_left"),
		RglToRight_R = document.querySelectorAll("#wcs030319 .RightGlitchToRight_right"),
		RglToLeft_L = document.querySelectorAll("#wcs030319 .RightGlitchToLeft_left"),
		RglToLeft_R = document.querySelectorAll("#wcs030319 .RightGlitchToLeft_right"),
		LglToRight_L = document.querySelectorAll("#wcs030319 .LeftGlitchToRight_left"),
		LglToRight_R = document.querySelectorAll("#wcs030319 .LeftGlitchToRight_right"),
		LglToLeft_L = document.querySelectorAll("#wcs030319 .LeftGlitchToLeft_left"),
		LglToLeft_R = document.querySelectorAll("#wcs030319 .LeftGlitchToLeft_right"),
		BlueEls = document.querySelectorAll("#wcs030319 .bannerWaves_particle_blue");

	var tL;
	var timerId = null;
	function initAnim(){
		tL = new TimelineLite(
			{ 
				onComplete:function() {
					this.restart();
					glitchEase_1 = RoughEase.ease.config({ template:  Power0.easeNone, strength: 2, points: 1, taper: "none", randomize:  true, clamp: true});
				}
			}
		);
		var glitchX_1 = 4, // должен быть меньше пединга внутреннего контейнера!
			glitchX_2 = 3,
			glitchX_3 = 3,
			glitchX_4 = 3,
			glitchDur_1 = 0.35,
			glitchDur_2 = 0.07,
			glitchDur_3 = 0.05,
			glitchDur_4 = 0.05,
			glitchEase_1 = RoughEase.ease.config({ template:  Power0.easeNone, strength: 2, points: 15, taper: "none", randomize:  true, clamp: true}),
			glitchEase_2 = Sine.easeOut,
			glitchEase_3 = RoughEase.ease.config({ template:  Power0.easeNone, strength: 2, points: 20, taper: "none", randomize:  true, clamp: true}),
			glitchEase_4 = RoughEase.ease.config({ template:  Power0.easeNone, strength: 2, points: 20, taper: "none", randomize:  true, clamp: true});

		tL
			.to(t1, glitchDur_1, {x: -glitchX_1, ease: glitchEase_1  }, "start")
			.to(t2, glitchDur_1, {x: glitchX_1, ease: glitchEase_1  }, "start")
			.to(b1, glitchDur_1, {x: -glitchX_1, ease: glitchEase_1 }, "start")
			.to(b2, glitchDur_1, {x: glitchX_1, ease: glitchEase_1  }, "start")
			.to(RglToLeft_L, glitchDur_1, {width: "-="+glitchX_1+"", x: -glitchX_1 , ease: glitchEase_1  }, "start")
			.to(RglToLeft_R, glitchDur_1, {width: "+="+glitchX_1+"", ease: glitchEase_1  }, "start")
			.to(RglToRight_L, glitchDur_1, {width: "+="+glitchX_1+"", x: +glitchX_1, ease: glitchEase_1  }, "start")
			.to(RglToRight_R, glitchDur_1, {width: "-="+glitchX_1+"", ease: glitchEase_1  }, "start")
			.to(LglToRight_L, glitchDur_1, {width: "+="+glitchX_1+"", ease: glitchEase_1  }, "start")
			.to(LglToRight_R, glitchDur_1, {width: "-="+glitchX_1+"", x: +glitchX_1, ease: glitchEase_1  }, "start")
			.to(LglToLeft_L, glitchDur_1, {width: "-="+glitchX_1+"", ease: glitchEase_1  }, "start")
			.to(LglToLeft_R, glitchDur_1, {width: "+="+glitchX_1+"", x: -glitchX_1, ease: glitchEase_1  }, "start")
			.to(t1, glitchDur_1, {x: 0, ease: glitchEase_1  }, "start1-2" )
			.to(t2, glitchDur_1, {x: 0, ease: glitchEase_1  }, "start1-2")
			.to(b1, glitchDur_1, {x: 0, ease: glitchEase_1 }, "start1-2")
			.to(b2, glitchDur_1, {x: 0, ease: glitchEase_1  }, "start1-2")
			.to(RglToLeft_L, glitchDur_1, {width: "+="+glitchX_1+"", x: 0 , ease: glitchEase_1  }, "start1-2")
			.to(RglToLeft_R, glitchDur_1, {width: "-="+glitchX_1+"", ease: glitchEase_1  }, "start1-2")
			.to(RglToRight_L, glitchDur_1, {width: "-="+glitchX_1+"", x: 0 , ease: glitchEase_1  }, "start1-2")
			.to(RglToRight_R, glitchDur_1, {width: "+="+glitchX_1+"", ease: glitchEase_1  }, "start1-2")
			.to(LglToRight_L, glitchDur_1, {width: "-="+glitchX_1+"", ease: glitchEase_1  }, "start1-2")
			.to(LglToRight_R, glitchDur_1, {width: "+="+glitchX_1+"", x: 0, ease: glitchEase_1  }, "start1-2")
			.to(LglToLeft_L, glitchDur_1, {width: "+="+glitchX_1+"", ease: glitchEase_1  }, "start1-2")
			.to(LglToLeft_R, glitchDur_1, {width: "-="+glitchX_1+"", x: 0, ease: glitchEase_1  }, "start1-2")
			// GLITCH 1 END
			.to( lines, glitchDur_1 , {autoAlpha: 0.3, ease: glitchEase_1  }, 0)
			.to( lines, glitchDur_1 , {autoAlpha: 1, ease: glitchEase_1 })
			// START GLITCH2
			.set({}, {}, "+=0.5")
			.to(t1, glitchDur_2, {x: -glitchX_2, ease: glitchEase_2 }, "start2")
			.to(t2, glitchDur_2, {x: glitchX_2, ease: glitchEase_2  }, "start2")
			.to(b1, glitchDur_2, {x: -glitchX_2, ease: glitchEase_2 }, "start2")
			.to(b2, glitchDur_2, {x: glitchX_2, ease: glitchEase_2  }, "start2")
			.to(RglToLeft_L, glitchDur_2, {width: "-="+glitchX_2+"", x: -glitchX_2 , ease: glitchEase_2  }, "start2")
			.to(RglToLeft_R, glitchDur_2, {width: "+="+glitchX_2+"", ease: glitchEase_2  }, "start2")
			.to(RglToRight_L, glitchDur_2, {width: "+="+glitchX_2+"", x: +glitchX_2, ease: glitchEase_2  }, "start2")
			.to(RglToRight_R, glitchDur_2, {width: "-="+glitchX_2+"", ease: glitchEase_2  }, "start2")
			.to(LglToRight_L, glitchDur_2, {width: "+="+glitchX_2+"", ease: glitchEase_2  }, "start2")
			.to(LglToRight_R, glitchDur_2, {width: "-="+glitchX_2+"", x: +glitchX_2, ease: glitchEase_2  }, "start2")
			.to(LglToLeft_L, glitchDur_2, {width: "-="+glitchX_2+"", ease: glitchEase_2  }, "start2")
			.to(LglToLeft_R, glitchDur_2, {width: "+="+glitchX_2+"", x: -glitchX_2, ease: glitchEase_2  }, "start2")
			.to(t1, glitchDur_2/2, {x: 0, ease: glitchEase_2  }, "start2-2" )
			.to(t2, glitchDur_2/2, {x: 0, ease: glitchEase_2  }, "start2-2")
			.to(b1, glitchDur_2/2, {x: 0, ease: glitchEase_2 }, "start2-2")
			.to(b2, glitchDur_2/2, {x: 0, ease: glitchEase_2  }, "start2-2")
			.to(RglToLeft_L, glitchDur_2/2, {width: "+="+glitchX_2+"", x: 0 , ease: glitchEase_2  }, "start2-2")
			.to(RglToLeft_R, glitchDur_2/2, {width: "-="+glitchX_2+"", ease: glitchEase_2  }, "start2-2")
			.to(RglToRight_L, glitchDur_2/2, {width: "-="+glitchX_2+"", x: 0 , ease: glitchEase_2  }, "start2-2")
			.to(RglToRight_R, glitchDur_2/2, {width: "+="+glitchX_2+"", ease: glitchEase_2  }, "start2-2")
			.to(LglToRight_L, glitchDur_2/2, {width: "-="+glitchX_2+"", ease: glitchEase_2  }, "start2-2")
			.to(LglToRight_R, glitchDur_2/2, {width: "+="+glitchX_2+"", x: 0, ease: glitchEase_2  }, "start2-2")
			.to(LglToLeft_L, glitchDur_2/2, {width: "+="+glitchX_2+"", ease: glitchEase_2  }, "start2-2")
			.to(LglToLeft_R, glitchDur_2/2, {width: "-="+glitchX_2+"", x: 0, ease: glitchEase_2  }, "start2-2")
			// BLINKS
			.to([lines, BlueEls], 0.06, {autoAlpha: 0 }, "start2")
			.staggerTo(nodeToArrayAndShuffle(lines), 0.1, {autoAlpha: 1 }, getRandomFloat(0.04, 0.07), "blinkLinesStagger")
			.staggerTo(nodeToArrayAndShuffle(BlueEls), 0.1, {autoAlpha: 1 }, getRandomFloat(0.04, 0.07), "blinkLinesStagger")
			// START GLITCH 3
			.set({}, {}, "+=0.6")
			.to(t1, glitchDur_3, {x: -glitchX_3, ease: glitchEase_3 }, "start3")
			.to(t2, glitchDur_3, {x: glitchX_3, ease: glitchEase_3  }, "start3")
			.to(b1, glitchDur_3, {x: -glitchX_3, ease: glitchEase_3 }, "start3")
			.to(b2, glitchDur_3, {x: glitchX_3, ease: glitchEase_3  }, "start3")
			.to(RglToLeft_L, glitchDur_3, {width: "-="+glitchX_3+"", x: -glitchX_3 , ease: glitchEase_3  }, "start3")
			.to(RglToLeft_R, glitchDur_3, {width: "+="+glitchX_3+"", ease: glitchEase_3  }, "start3")
			.to(RglToRight_L, glitchDur_3, {width: "+="+glitchX_3+"", x: +glitchX_3, ease: glitchEase_3  }, "start3")
			.to(RglToRight_R, glitchDur_3, {width: "-="+glitchX_3+"", ease: glitchEase_3  }, "start3")
			.to(LglToRight_L, glitchDur_3, {width: "+="+glitchX_3+"", ease: glitchEase_3  }, "start3")
			.to(LglToRight_R, glitchDur_3, {width: "-="+glitchX_3+"", x: +glitchX_3, ease: glitchEase_3  }, "start3")
			.to(LglToLeft_L, glitchDur_3, {width: "-="+glitchX_3+"", ease: glitchEase_3  }, "start3")
			.to(LglToLeft_R, glitchDur_3, {width: "+="+glitchX_3+"", x: -glitchX_3, ease: glitchEase_3  }, "start3")
			.to(t1, glitchDur_3, {x: 0, ease: glitchEase_3  }, "start3-2" )
			.to(t2, glitchDur_3, {x: 0, ease: glitchEase_3  }, "start3-2")
			.to(b1, glitchDur_3, {x: 0, ease: glitchEase_3 }, "start3-2")
			.to(b2, glitchDur_3, {x: 0, ease: glitchEase_3  }, "start3-2")
			.to(RglToLeft_L, glitchDur_3, {width: "+="+glitchX_3+"", x: 0 , ease: glitchEase_3  }, "start3-2")
			.to(RglToLeft_R, glitchDur_3, {width: "-="+glitchX_3+"", ease: glitchEase_3  }, "start3-2")
			.to(RglToRight_L, glitchDur_3, {width: "-="+glitchX_3+"", x: 0 , ease: glitchEase_3  }, "start3-2")
			.to(RglToRight_R, glitchDur_3, {width: "+="+glitchX_3+"", ease: glitchEase_3  }, "start3-2")
			.to(LglToRight_L, glitchDur_3, {width: "-="+glitchX_3+"", ease: glitchEase_3  }, "start3-2")
			.to(LglToRight_R, glitchDur_3, {width: "+="+glitchX_3+"", x: 0, ease: glitchEase_3  }, "start3-2")
			.to(LglToLeft_L, glitchDur_3, {width: "+="+glitchX_3+"", ease: glitchEase_3  }, "start3-2")
			.to(LglToLeft_R, glitchDur_3, {width: "-="+glitchX_3+"", x: 0, ease: glitchEase_3  }, "start3-2")
			// BLINKS
			.to(BlueEls, 0.06, {autoAlpha: 0 }, "start3+=0.1")
			.staggerTo(nodeToArrayAndShuffle(BlueEls), 0.01, {autoAlpha: 1 }, getRandomFloat(0.04, 0.07), "start3+=0.3")
			//.to(BlueEls, 0.06, {autoAlpha: 1 }, "start3+=0.3")
			// START GLITCH 4
			.set({}, {}, "+=0.3")
			.to(t1, glitchDur_4, {x: -glitchX_4, ease: glitchEase_4 }, "start4")
			.to(t2, glitchDur_4, {x: glitchX_4, ease: glitchEase_4  }, "start4")
			.to(b1, glitchDur_4, {x: -glitchX_4, ease: glitchEase_4 }, "start4")
			.to(b2, glitchDur_4, {x: glitchX_4, ease: glitchEase_4  }, "start4")
			.to(RglToLeft_L, glitchDur_4, {width: "-="+glitchX_4+"", x: -glitchX_4 , ease: glitchEase_4  }, "start4")
			.to(RglToLeft_R, glitchDur_4, {width: "+="+glitchX_4+"", ease: glitchEase_4  }, "start4")
			.to(RglToRight_L, glitchDur_4, {width: "+="+glitchX_4+"", x: +glitchX_4, ease: glitchEase_4  }, "start4")
			.to(RglToRight_R, glitchDur_4, {width: "-="+glitchX_4+"", ease: glitchEase_4  }, "start4")
			.to(LglToRight_L, glitchDur_4, {width: "+="+glitchX_4+"", ease: glitchEase_4  }, "start4")
			.to(LglToRight_R, glitchDur_4, {width: "-="+glitchX_4+"", x: +glitchX_4, ease: glitchEase_4  }, "start4")
			.to(LglToLeft_L, glitchDur_4, {width: "-="+glitchX_4+"", ease: glitchEase_4  }, "start4")
			.to(LglToLeft_R, glitchDur_4, {width: "+="+glitchX_4+"", x: -glitchX_4, ease: glitchEase_4  }, "start4")
			.to(t1, glitchDur_4, {x: 0, ease: glitchEase_4  }, "start4-2" )
			.to(t2, glitchDur_4, {x: 0, ease: glitchEase_4  }, "start4-2")
			.to(b1, glitchDur_4, {x: 0, ease: glitchEase_4 }, "start4-2")
			.to(b2, glitchDur_4, {x: 0, ease: glitchEase_4  }, "start4-2")
			.to(RglToLeft_L, glitchDur_4, {width: "+="+glitchX_4+"", x: 0 , ease: glitchEase_4  }, "start4-2")
			.to(RglToLeft_R, glitchDur_4, {width: "-="+glitchX_4+"", ease: glitchEase_4  }, "start4-2")
			.to(RglToRight_L, glitchDur_4, {width: "-="+glitchX_4+"", x: 0 , ease: glitchEase_4  }, "start4-2")
			.to(RglToRight_R, glitchDur_4, {width: "+="+glitchX_4+"", ease: glitchEase_4  }, "start4-2")
			.to(LglToRight_L, glitchDur_4, {width: "-="+glitchX_4+"", ease: glitchEase_4  }, "start4-2")
			.to(LglToRight_R, glitchDur_4, {width: "+="+glitchX_4+"", x: 0, ease: glitchEase_4  }, "start4-2")
			.to(LglToLeft_L, glitchDur_4, {width: "+="+glitchX_4+"", ease: glitchEase_4  }, "start4-2")
			.to(LglToLeft_R, glitchDur_4, {width: "-="+glitchX_4+"", x: 0, ease: glitchEase_4  }, "start4-2")
			//BLINKS
			.to(lines, 0.06, {autoAlpha: 0 }, "start4+=0.1")
			.staggerTo(nodeToArrayAndShuffle(lines), 0.01, {autoAlpha: 1 }, getRandomFloat(0.04, 0.07), "start4+=0.3")
			//.to(lines, 0.06, {autoAlpha: 1 }, "start4+=0.3")
			.set({}, {}, "+=0.8");
	}
	initAnim();
})();