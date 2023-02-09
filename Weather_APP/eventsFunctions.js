let count=0;
let recognition;
let exist=0;
let TimeOut;



let eventFunctions ={
	onLoad: function(){       //onload event
		_(".warningMsg")!=null ? _(".warningMsg").remove():'';

		_(".main").innerHTML += createElement.warningMsg(true);
		totalFunction.getUserLocation();
	},

	checkNetWorkClick: totalFunction.checkNetWork,     // Rechecking network Button click event in popupNetWork

	gettingCurrentLocation: totalFunction.againGetCurrentLocation,    //getting user location whwn user click aim button

	convertWeekToHour: function(e){       //converting week to hour or hour to week
		e.preventDefault();
		_(".active").classList.remove("active");
		e.target.classList.add("active");
		totalFunction.switchDayToHour();
	}, 

	darkAndLightModeBtn: function(){           // Dark ang light mode button click
		count+=1;
		if(count<=1){
			_("head").appendChild(createElement.showSnowLibrary());
			_("body").innerHTML+= `<div id="snow"></div>`;
			window.history.pushState("", "", `${window.location.href}/DarkMode`);
			_(".cloud_image").classList.add("border_white")

		}
		else{
			_("#snow").remove();
			_("head script").remove();
			history.back()
			count=0;
		}
		_(".toggleBox").classList.toggle("toggleBoxRotate");
		_(".main").classList.toggle("bodyExtraStyle");
		_(".container-1").classList.toggle("container1ExtraStyle");
		_(".container-2").classList.toggle("container2ExtraStyle");
	},

	convertCelcius: function(e){      //convert all celcius to fahernheit

		_(".active_degree").classList.remove("active_degree");

		e.target.classList.add("active_degree");

		let todayTemparature = Number(_(".today_temparature").innerText);

		document.querySelectorAll(".each_day_info .eachBox").forEach((eachBox)=>{
			let maxTempOfEachBox = Number(eachBox.querySelector(".maxTemp").innerText);
			let minTempOfEachBox = Number(eachBox.querySelector(".minTemp").innerText);

			if(e.target.classList.contains("celcius")){
				converter(((todayTemparature - 32) * 5/9),((maxTempOfEachBox - 32) * 5/9),((minTempOfEachBox - 32) * 5/9),"C","fahernheit");
			}
			if(e.target.classList.contains("fahernheit")){
				converter((todayTemparature * (9/5) + 32),(maxTempOfEachBox * (9/5) + 32),(minTempOfEachBox * (9/5) + 32),"F","celcius");
			}

			function converter(todayTemp,maxTemp,minTemp,sign,addEvent){
				e.target.removeAttribute("onclick");
				_(`.${addEvent}`).setAttribute("onclick", "eventFunctions.convertCelcius(event)");

				_(".temparature").innerHTML = `<span class="today_temparature">${Math.round(todayTemp)}</span><sup>&ordm;${sign}</sup>` ;
				eachBox.querySelector(".maxTemp").innerText = Math.round(maxTemp) ;	
				eachBox.querySelector(".minTemp").innerText = Math.round(minTemp) ;		
			}
		})
	},


	showSmallPopUpImage: function(e){                     //small image popup Box
		if(e.target.classList.contains("display_image")){

			let url =`url(${getComputedStyle(e.target).backgroundImage.substring(5, getComputedStyle(e.target).backgroundImage.length - 2)})`;
			TimeOut = setTimeout(function(){
				_('.display_image').innerHTML += createElement.smallImagePopUP(url);
				setTimeout(function(){
					_(".popupLoader")!=null ? _(".popupLoader").remove():'';
				},800)		
			},500)
		}

		document.body.addEventListener("mousemove",eventFunctions.clearSmallPopupImage);
		
	},

	clearSmallPopupImage: function(e){            //remove small popup image box
		if(!(e.target.classList.contains("display_image"))){
			clearTimeout(TimeOut);
			_(".popUpSmall")!=null ? _(".popUpSmall").remove():'';
			document.body.removeEventListener("mousemove",eventFunctions.clearSmallPopupImage);
		}
	},

	display_image: function(e){        //show image on fullscreen
		e.preventDefault();
		window.history.pushState("", "", `${window.location.href}/profileImage`);
		let imgURL = `url(${getComputedStyle(e.target).backgroundImage.substring(5, getComputedStyle(e.target).backgroundImage.length - 2)})`;
		_(".parent").style.display="none";
		_(".main").innerHTML += createElement.largeImagePopup(imgURL);
	},

	clearLargerPopupImage: function(e){     //clear fullscreen image
		_(".parent").style.display="flex";
		history.back();

		_(".popup_DP").remove();
		_(".popUpSmall")!=null ? _(".popUpSmall").remove():'';
	},

	refreshContent:  function(e){              //calling when user clicking refresh button
		e.stopPropagation();
		totalFunction.fetchAPIdata(latitude,longitude);
		clearInterval(minuteTimeOut);
		clearInterval(hourTimeout);
	
	},

	getInputVal: function(e){      //getting user typed value after they press Enter button. 

		_(".line")!=null ? _(".line").remove():'';

		_(".searchVal").placeholder ="Search for places...";

	   recognition!=undefined ? recognition.stop() :'';


		if (e.keyCode === 13) {     //Checking whether user pressed Enter or not
	   	if(_("#textBox").value === ''){
				totalFunction.showError("Please enter the city name");
			}
			else{
				totalFunction.gettingUserTypedVal();
		   }
	   }

	},

	checkUserTyping: function(e){                    //showing error if the user type out of the input box
		if(_(".warningMsg")==null){
			if(_(".searchVal") != document.activeElement){
				exist+=1;
				if(exist<=1){
					_(".typeMsg").classList.add("typeMsgExtra");
					setTimeout(function(){
						_(".typeMsg").classList.remove("typeMsgExtra");
						exist=0;
					},3000)
				}	
				if(e.keyCode == 191){       //checking user pressed '/' key
					_(".searchVal").value="";
					_(".typeMsg").classList.remove("typeMsgExtra");
					exist=0;
					setTimeout(function(){
						_(".searchVal").focus();
					},150)
				}
			}
		}	
	},

	showDropDown:  function(ele,e){             //showing list of city name as per ser types
		if(navigator.onLine){
			if(ele.value.length >= 3){
				// API call for get the list of cityname as user types.
				fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${ele.value}&format=json&apiKey=b5d33b2a15ac4439a658791db3195e81`)
				.then(response => {
					return response.json();
				})
				.then(data => {
					_(".listOfCity")!=null ? _(".listOfCity").remove():'';
					_(".searchBox").appendChild(createElement.createEachCity(data));
				})
    		}
			else{
				setTimeout(function(){
					_(".listOfCity")!=null ? _(".listOfCity").remove():'';	
				},1000)	
			}
		}
	},

	clickEachListCity:   function(ele,data,e){         //listener for Each city of list of city.
		const index = Array.from(ele.parentNode.children).indexOf(ele);
		e.stopPropagation();
		e.preventDefault();
		_("#textBox").value ="";
		_(".listOfCity").remove();
		latitude=data.results[index].lat;
		longitude=data.results[index].lon;
		totalFunction.fetchAPIdata(latitude,longitude);
	},

	GetSpeech:  function () {                    //getting city name through user voice input

		let inputValBox = _(".searchVal");
		inputValBox.value="";
		_(".listOfCity")!=null ? _(".listOfCity").remove():'';

	   const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;
	   recognition = new SpeechRecognition();

	   // start recognition
	   recognition.start();

	   // This runs when the speech recognition service starts
	   recognition.onstart = function() {
	   	inputValBox.placeholder = "Say Something...";    	
	   	_("body").innerHTML+= `<div class="line"></div>`;

	  		let i=0;
	   	timeOut = setInterval(function(){
	   		i+=(100/8)
	    		_(".line").style.width = `${i}%`;
	    	},1000)
	   };
	        
	   recognition.onend = function() {
	      clearInterval(timeOut)
	     	recognition.stop();

	  		if(inputValBox.value==""){
	     		_(".micSpan").classList.add("lineExtra");

	  			setTimeout(function(){
		   		_(".line")!=null ? _(".line").remove():'';
					_(".searchVal").placeholder ="Search for places...";
				},200)

				setTimeout(function(){
	     			_(".micSpan").classList.remove("lineExtra");
				},800)

		   }

	   }

	   // This runs when the speech recognition service returns result
	   recognition.onresult = function(event) {
	      inputValBox.value = event.results[0][0].transcript;
			inputValBox.placeholder ="Search for places...";
	   	_(".line").remove();
	      totalFunction.gettingUserTypedVal();
	   };
	},

	onFocusEvent:  function(){    //Every half an hour to get a dynamic data from api
		_(".searchVal").value="";
		history.back();
		totalFunction.fetchAPIdata(latitude,longitude,"onfocus");	
	}

}






