let latitude;
let longitude;
let totalBoxes=0;
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let sevenDays =[];
let sevenHours =[];
let aqIndexContent;
let uvIndexDivContent;

_= function(ele){
	return document.querySelector(ele);
}

let totalFunction = {

	getUserLocation: function() {      //to get user location
		if(navigator.onLine ){

			_(".networkPopup")!=null ? _(".networkPopup").remove():'';

			if(navigator.geolocation){	
				window.history.pushState("", "", `index.html`);
			    navigator.geolocation.getCurrentPosition((position) => {

					_(".warningMsg")!=null ? _(".warningMsg").remove():'';


			     	lon = position.coords.longitude;
			    	lat = position.coords.latitude;
					latitude=lat;
					longitude=lon;
					this.fetchAPIdata(latitude,lon);
			    },(err)=>{
			    	if(!navigator.onLine){
						_(".main").innerHTML += createElement.netWorkPopUP;
			    	}	
			    	else{
						_(".warningMsg").remove();
			    		_(".main").innerHTML += createElement.warningMsg(false);
			    	}
			    });   
			}  
		}
		else{
			_(".warningMsg").remove();
			_(".main").innerHTML += createElement.netWorkPopUP;
		}
	},

	checkNetWork: function (){     //to check uer is online 

		 		

		_(".main").innerHTML+= createElement.popUPWifiLoader;
	
		setTimeout(function(){
			_(".popUpwifiLoader").remove();
			if(navigator.onLine){
				if(latitude==undefined && longitude==undefined){
					eventFunctions.onLoad();
				}
				else{
					_(".networkPopup").remove();	
				}			
			}
			else{
				_(".main").innerHTML += createElement.netWorkPopUP;
			}
		},600)		
	},

	againGetCurrentLocation: function(){       //getting user location whwn user click aim button
		if(navigator.onLine ){

			_(".networkPopup")!=null ? _(".networkPopup").remove():'';
	
			if(navigator.geolocation){	
			    navigator.geolocation.getCurrentPosition(position => {

					_(".searchVal").placeholder ="Search for places...";

					recognition!=undefined ? recognition.stop() :'';
   					
			     	lon = position.coords.longitude;
			    	lat = position.coords.latitude;
					latitude=lat;
					longitude=lon;	
					totalFunction.fetchAPIdata(latitude,longitude);
			    });   
			}    
		}
		else{ 	
			_(".main").innerHTML += createElement.netWorkPopUP();
		}
	},

	fetchAPIdata:  function(lat,lon,e){    //calling fetch to get the data bt API

		if(navigator.onLine){

			_("article").innerHTML="";
			
			_(".main").innerHTML += createElement.showStatcicInfos;

			// Calling the API  to get uvIndex
			fetch(`https://api.openweathermap.org/data/2.5/uvi?appid=0569cbc0ef791e29906331d4bb0994ef&lat=${lat}&lon=${lon}`)
			.then(res => {return res.json()})
			.then(uvindex => {
				uvIndexDivContent=createElement.uvIndexDiv(uvindex)
				_(".main").innerHTML+= `<div class="buttonBox" data-type="refresh">Refresh <i id="refresh-icon" class="fa-solid fa-rotate refresh-icon" data-type="refresh"></i></div>`;
			});	

			// Calling the API to find AIR Quality
			fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=88f6735d206f1a6150de3f8b8a25ccbd7649f5c1`)
			.then(response => {
			 	return response.json();
			})
			.then(aqIndex => {
				aqIndexContent = createElement.aqIndexDiv(aqIndex);
			});		

			// Calling the API  for each day
		    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=02794db330eb7e86a55efca7f9003cea`)
		    .then((response) => {
		        return response.json();
		    })
		    .then(wholeData => {	
		    	setTimeout(function(){
		    		createElement.showWholeDataInofs(wholeData);
					totalFunction.createSixBoxes(wholeData,"daily");
		    	},300)
		    });	

			// Calling the API  for each hours
			fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0569cbc0ef791e29906331d4bb0994ef`)
			.then(response => {
			    return response.json();
			})
			.then(hoursData => {
				setTimeout(function(){
					window.history.pushState("", "", `index.html#${hoursData.city.name}`);
					_(".city_img .animated-background").remove();
					_(".city_img").innerHTML+=`<span class="cityName">${hoursData.city.name}, <a href="#" onclick="event.preventDefault()" class="countryName">${hoursData.city.country}</a> </span>`
					totalFunction.createSixBoxes(hoursData,"hours");

					window.onpopstate = function () {
						if(_(".toggleBox").classList.contains("toggleBoxRotate")){
							window.history.pushState("", "", `index.html#${hoursData.city.name}/DarkMode`);
						}
						else{
							window.history.pushState("", "", `index.html#${hoursData.city.name}`);
						}	
					};

					if(_("article").classList.contains("bodyExtraStyle")){
						window.history.pushState("", "", `${window.location.href}/DarkMode`);
					}
				},300)	
			})   						


			minuteTimeOut =  setInterval(function(){
				_(".currentTime").innerText= `${((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes()}`;
			},30000)

		    hourTimeout = setInterval(eventFunctions.onFocusEvent,1000*60*60);

		    if(_("article").classList.contains("bodyExtraStyle")){	
				_(".toggleBox").classList.toggle("toggleBoxRotate");
				_(".container-1").classList.toggle("container1ExtraStyle");
				_(".container-2").classList.toggle("container2ExtraStyle");
			}
		}
		else{
			_(".networkPopup")!=null ? _(".networkPopup").remove():'';
		}		
	},

	convertTime: function(timeString){      //To convert Railway time to normal time
		// Prepend any date. Use your birthday.
		const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
		  .toLocaleTimeString('en-US',
		    {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
		  );
		return timeString12hr;
	},

	sunsetRaiseTime: function(unixTimestamp,sample=''){       //Conver unixTimestamp to date
		
		let date = new Date(unixTimestamp * 1000);

		let hours = ((date.getHours() < 10)?"0":"") + date.getHours()

		// Minutes part from the timestamp
		let minutes = ((date.getMinutes() < 10)?"0":"") + date.getMinutes()

		if(sample!=""){
			return date.getDay();
		}	
		return hours + ':' + minutes;
	},

	checkHumitityLevel:  function(humidity){       //status checking for humidity
	 	if(humidity >= 75){
			return `Comfortable 😌`;
		}	
		else if((humidity < 75) && (humidity >= 50)){
			return `Getting Sticky 😏`;
		}
		else if((humidity < 50) && (humidity >= 25)){
			return `Unpleasant 😟`;
		}
		else if(humidity < 25){
			return `Downright Cross 🤮`;
		}
	},

	checkVisibility: function(visibility){    //status checking for Visibility
		if(visibility >= 1000){
			return `No Fog 😍`;
		}	
		else if((visibility < 1000) && (visibility >= 300)){
			return `Low Fog 😞`;
		}
		else if((visibility < 300) && (visibility >= 100)){
			return `Moderate Fog 😟`;
		}
		else if((visibility < 100)){
			return `Very Dense Fog 😰`;
		}
	},

	checkAirQuality: function(airQuality){   //status checking for airQuality
		if(airQuality < 50){
			return `Good 😍`;
		}	
		else if(airQuality < 51 && airQuality<100){
			return `Satisfactory 😞`;
		}
		else if(airQuality < 101 && airQuality<200){
			return `Moderate 😟`;
		}	
		else if(airQuality < 201 && airQuality<300){
			return `Poor 😰`;
		}
	},

	changeBg:  function(uvIndex){        //Border color for uvIndex according to range
		if(uvIndex <= 2 ){
		  	return this.colorforBorder("#3bc41c");
		}	
		else if(uvIndex <= 5 ){
			return this.colorforBorder("#eda961");
  		}
  		else if(uvIndex <= 7 ){
  			return this.colorforBorder("#e89133");
  		}
  		else if(uvIndex <= 10){
  			return this.colorforBorder("red");
  		}	
  		else if(uvIndex > 10){
  			return this.colorforBorder("darkviolet");
  		}
	},

	colorforBorder: function(borderColor){     //setting border for uvIndex 
		return `20px solid ${borderColor};border-top:20px solid transparent;border-left:20px solid transparent`;
	},

	switchDayToHour: function(){       //converting Day to hour
		_(".each_day_info").innerHTML="";

		if(_(".active").innerText=="Today"){
			sevenHours.forEach(function(eachInfo){
				let max=eachInfo.main.temp_max-273.15;
				let min=eachInfo.main.temp_min-273.15;
				if(_(".fahernheit").classList.contains("active_degree")){
					max = (max * 9/5) + 32;
					min = (min * 9/5) + 32;
				}
				_(".each_day_info").innerHTML+=createElement.detailsOfEachDay(totalFunction.sunsetRaiseTime(eachInfo.dt),eachInfo.weather[0].icon,max,min);			
			})
		}	
		else{
			sevenDays.forEach(function(eachInfo){
				let max=eachInfo.temp.max;
				let min=eachInfo.temp.min;
				if(_(".fahernheit").classList.contains("active_degree")){
					max = (max * 9/5) + 32;
					min = (min * 9/5) + 32;
				}
				_(".each_day_info").innerHTML+= createElement.detailsOfEachDay(days[totalFunction.sunsetRaiseTime(eachInfo.dt,"day")].slice(0, 3),eachInfo.weather[0].icon,max,min);
			})
		}
		totalBoxes=0;
	},

	rainMeasurement:   function(rain){   //RainMeasurement because sometimes fetch response will be 0.
	 	if(rain == undefined){
		  	return`Rain - 0 mm`;
		}
		else{
		   return `Rain - ${Math.round(rain)} mm`;
		}	
	},

	createSixBoxes:   function(data,state){        //Setting Values for creating hours Or Daily boxes according to user requirement 

		if(state=="daily"){
			sevenDays =[]

			for(i=1;i<data.daily.length;i++){
				sevenDays.push(data.daily[i]);
		  	}
		}  	
	  	if(state=="hours"){
			sevenHours=[];
			for(i=0;i<7;i++){
		  		sevenHours.push(data.list[i])
			}
		}	
		totalFunction.switchDayToHour();
	},

	showError: function(err){        //Showing error if the user types invalid city.

		_(".errorMsg")!=null ? _(".errorMsg").remove():'';
		_(".listOfCity")!=null ? _(".listOfCity").remove():'';

		setTimeout(function(){
			_(".errorMsg").style.opacity = 0;
			setTimeout(function(){
				_(".errorMsg").remove();
			},500)
		},2500);
		_(".main").innerHTML += `<div class="errorMsg">${err}</div>`;
	},

	gettingUserTypedVal:   function(){       //getting typed Value of user from seachBox
		let userInput = _(".searchVal").value;

		_(".searchVal").blur();

		//The below api is used to get the value for lat and lon for given city 
		fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=3db1741c964961d4b6e819ab2d004e4f`)
		.then((response) => {
			return response.json();
		})
		.then(data => {		
			if(data.length==0){
				totalFunction.showError("Please provide a valid input");
			}
			else{
				latitude=data[0].lat;
				longitude=data[0].lon;
				totalFunction.fetchAPIdata(data[0].lat,data[0].lon);
				clearInterval(minuteTimeOut);
				clearInterval(hourTimeout);
			}
			setTimeout(function(){
				_(".listOfCity")!=null ? _(".listOfCity").remove():'';
			},500)
		});	
	}
	
}







