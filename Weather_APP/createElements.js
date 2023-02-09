let createElement = {
	warningMsg: function(isGranted=""){
					let warnMsg = `<div class="warningMsg"> 
										<div>
											<h5>Enable Location</h5>
											<figure class="markerGif yetToPtovide"></figure>
											<p>We need to know your location to fetch information</p>
										</div>	
									</div>`;
					if(isGranted!=true){
						warnMsg = warnMsg.replace("Enable Location","Access Denied");
						warnMsg = warnMsg.replace("yetToPtovide","accessDenied");	
						warnMsg = warnMsg.replace("We need to know your location to fetch information",`<button class="giveAccBtn" data-type="giveAccBtn" type="button">Give Access</button>`)
					}
					return warnMsg;
				},			


	netWorkPopUP:   `<div class="networkPopup">
							<figure></figure>
							<h1>Ooops</h1>
							<p>No Internet connection found.<br> Check your connection.</p>
							<button  class="checkInternet" data-type="checkInternet" type="button">Try Again</button>
						</div>`,

		popUPWifiLoader:    `<div class="popUpwifiLoader">
									<h2>Checking...</h2>
									<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
								</div>`,


	showStatcicInfos: `<main class="parent">

				<div class="typeMsg">Press <b>/</b> to jump to the search box</div>

				<section class="container-1">
					<div class="searchBox">
						<div class="inputBox">
							<label for="textBox"><i class="fa-solid fa-magnifying-glass"></i></label>
							<input type="text" class="searchVal" data-type="searchVal" id="textBox" onkeyup=eventFunctions.getInputVal(event) onfocus=eventFunctions.showDropDown(this,event) oninput=eventFunctions.showDropDown(this,event) placeholder="Search for places..."  autocomplete="off">
							  <span class="micSpan" data-type="micSpan" ><i class="fa-solid fa-microphone" data-type="micSpan"></i></span> 
							<h6 class="underLine"></h6>
						</div>
						<div class="aimButton" data-type="aimButton" title="Use Current Location">
							<i class="fa-solid fa-crosshairs" data-type="aimButton"></i>
						</div>
					</div>	

				 	<figure class="cloud_image border_white" >
				 	  <section class="animated-background"></section>
  					</figure>	

				 	<div class="today_info">
				 	  <section class="animated-background"></section>
					</div>	

					<div class="Weather_info">	
				 	  <section class="animated-background"></section>
					</div>	

					<figure class="city_img">
				 	  <section class="animated-background"></section>
					</figure>					
					
				</section>

				<section class="container-2">
					<div class="profile_card">
						<nav>
							<a href="#" class="links" data-type="todayOrWeek">Today</a>
							<a href="#" class="active links" data-type=todayOrWeek>Week</a>
						</nav>

						<div class="profile_Image">
							<div class="degree">
								<span class="cORf celcius active_degree">ºC</span>
								<span class="cORf fahernheit" onclick="eventFunctions.convertCelcius(event)">ºF</span>
								<div class="toggle" >
								    <div class="toggleBox" data-type="toggleDark">
										<b class="sun" data-type="toggleDark" title="Light mode"></b>
								    	<b class="moon" data-type="toggleDark" title="Dark mode"></b>
									</div>
								</div>
							</div>	
							<div class="display_image" data-type="display_image" onmouseenter=eventFunctions.showSmallPopUpImage(event)></div>
						</div>	
					</div>	
					<div class="each_day_info">
				 	  		<section class="animated-background"></section>
					</div>

					<div class="today_highlights">
						<h2>Today's Highlights</h2>
						<div class="six_boxes">
				 	  		<section class="animated-background"></section>
						</div>
					</div>
				</section>
			</main>`,			


	showWholeDataInofs:   function(wholeData){

		_(".cloud_image .animated-background").remove();
		_(".cloud_image").style.backgroundImage = `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${wholeData.current.weather[0]["icon"]}.svg)`;

		_(".today_info .animated-background").remove();
		_(".today_info").innerHTML += `<p class="temparature"><span class="today_temparature">${Math.round(wholeData.current.temp)}</span><sup>ºC</sup></p>  
		 				<h1><span class="currentDay">${days[new Date().getDay()]},</span> <span class="currentTime">${((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes()}</span></h1>`;


		_(".Weather_info .animated-background").remove();
		_(".Weather_info").innerHTML += `<p><span class="material-symbols-outlined">cloudy</span><span class="cloud_info">${wholeData.current.weather[0].description}</span></p>
					<p><i class="fa-solid fa-signal rainIcon"></i><span class="rainMeasurment">${totalFunction.rainMeasurement(wholeData.daily[0].rain)}</span></p>`;

		_(".six_boxes .animated-background").remove();
		_(".six_boxes").innerHTML +=	
							`<div class="eachBox iconup uvIndex">
				 	  			${uvIndexDivContent}
							</div>

							<div class="eachBox iconup">
								<h3>Wind Status</h3>
								<p><b class="windSpeed">${parseFloat(((wholeData.current.wind_speed*3600)/1000).toFixed(1))}</b> <span>km/h</span></p>
								<span>
									<b class="boxShadow">
										<i class="fa-solid fa-location-dot links" style="transform: rotate(${(wholeData.current.wind_deg)+180}deg);"></i> 
										<h6 class="direction links north">N</h6>
										<h6 class="direction links east">E</h6>
										<h6 class="direction links west">W</h6>
										<h6 class="direction links south">S</h6>
									</b>  WSW</span>
							</div>
							<div class="eachBox iconup">
								<h3>Sunrise &amp; Sunset</h3>
								<div class="sunrise">
									<span class="iconup"><i class="fa-solid fa-arrow-up"></i></span>
									<div>
										<span class="sunriseTime">${totalFunction.convertTime(totalFunction.sunsetRaiseTime(wholeData.current.sunrise))}</span>
									</div>	
									
								</div>
								<div class="sunrise">
									<span class="iconup"><i class="fa-solid fa-arrow-down"></i></span>
									<div>
										<span class="sunsetTime">${totalFunction.convertTime(totalFunction.sunsetRaiseTime(wholeData.current.sunset))}</span>
									</div>	
								</div>
							</div>
							<div class="eachBox iconup">
								<h3>Humidity</h3>
								<p><b class="Humidity">${wholeData.current.humidity}</b> <span>%</span></p>
								<span class="HumidityLevel">${totalFunction.checkHumitityLevel(wholeData.current.humidity)}</span>

								<section class="toggleBtn"><h6 class="toggleCircle" style="top: ${wholeData.current.humidity * 75/100}%;"></h6></section>
							</div>
							<div class="eachBox iconup">
								<h3>Visibility</h3>
								<p><b class="visibility">${wholeData.current.visibility / 1000}</b> <span>km</span></p>
								<span class="visibilityAverage">${totalFunction.checkVisibility(wholeData.current.visibility)}</span>
							</div>
							<div class="eachBox iconup airQuality">
								${aqIndexContent}
							</div>
						</div>`;

		if(uvIndexDivContent==undefined){
			_(".uvIndex").innerHTML="";
			setTimeout(function(){
				console.log(uvIndexDivContent)
				_(".uvIndex").innerHTML+=uvIndexDivContent;
			},100)
		}		
	},
	
	detailsOfEachDay:   function(day,icon,max,min){
							return `<div class="eachBox iconup box${totalBoxes+=1}">
								<h4>${day}</h4>
								<figure class="figure${totalBoxes}" style="background-image: url(&quot;https://openweathermap.org/img/w/${icon}.png&quot;);"></figure>
								<p><span><span class="maxTemp">${Math.round(max)}</span><sup>º</sup></span> <span><span class="minTemp">${Math.round(min)}</span><sup>º</sup></span></p>
							</div>`;
						},

	showSnowLibrary:  function(){
							   var script = document.createElement('script');
							   script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
							   script.onload = function(){
							      particlesJS("snow", {
							         "particles": {
							            "number": {
							               "value": 200,
							               "density": {
							               "enable": true,
							                  "value_area": 800
							               }
							            },
							            "color": {
							               "value": "#ffffff"
							            },
							            "opacity": {
							               "value": 0.6,
							               "random": false,
							               "anim": {
							                  "enable": false
							               }
							            },
							            "size": {
							               "value": 5,
							               "random": true,
							               "anim": {
							                  "enable": false
							               }
							            },
							            "line_linked": {
							               "enable": false
							            },
							            "move": {
							               "enable": true,
							               "speed": 3,
							               "direction": "bottom",
							               "random": true,
							               "straight": false,
							               "out_mode": "out",
							               "bounce": false,
							               "attract": {
							    	           "enable": true,
							                  "rotateX": 300,
							                  "rotateY": 1200
							               }
							            }
							         },
							         "interactivity": {
							            "events": {
							               "onhover": {
							                  "enable": false
							               },
							               "onclick": {
							                  "enable": false
							               },
							               "resize": false
							            }
							         },
							         "retina_detect": true
							      });
							   }
							   return script;
							},

	smallImagePopUP:    function(url){
								return `<div class="popUpSmall" style="background-image:${url}">
									<div class="popupLoader">
										<div class="loaderSmall"></div>
									</div>
								</div>`;
							},

	largeImagePopup:    function(url){
								return `<article class="popup_DP">
									<section class="popup_DP_large" data-type="img_clear" style="background-image: ${url}"></section>
									<i class="fa-solid fa-xmark" data-type="img_clear"></i>
									<div class="image" style="background-image: ${url}">
									</div>	
								</article>`
							},

	createEachCity:     function(data){
							let listOfCity = document.createElement("ul");
							listOfCity.setAttribute("class","listOfCity"); 
							data.results.forEach(function(name){
								let eachClityName = document.createElement("li");
								eachClityName.innerHTML = `<span class="cityName">${name.address_line1},<a href="#" class="countryName">${name.country_code}</a></span>`;	
								eachClityName.setAttribute("data-type","eachCityList");

								let strObj = JSON.stringify(data);
								eachClityName.setAttribute("onclick",`eventFunctions.clickEachListCity(this,${strObj},event)`);
								listOfCity.appendChild(eachClityName);	
							})
							return listOfCity;	
						},

	uvIndexDiv:     function(uvindex){
						return `<h3>UV Index</h3>
								<div class="UV_range">
									<div class="chart">
										<span>6</span>
										<span>9</span>
										<span>12</span>
									</div>

									<section>
										<div></div>
									    <div style="rotate: ${(180/15)*uvindex.value}deg;border:${totalFunction.changeBg((180/15)*uvindex.value)}"></div>
									</section>
									<span>${parseFloat(uvindex.value.toFixed(1))}</span>
								</div>`	
					},

	aqIndexDiv:     function(aqIndex){
						return `<h3>Air Quality</h3>
								<p class="airQuality">${aqIndex.data.aqi}</p>
								<span class="airQualityInfo">${totalFunction.checkAirQuality(aqIndex.data.aqi)}</span>
								<section class="toggleBtn extraToggle"><h6 class="toggleCircle" style="top: ${(aqIndex.data.aqi *75/100)/(300/100)}%;"></h6></section>`;
					}		
}





