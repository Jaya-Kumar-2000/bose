window.addEventListener("load", eventFunctions.onLoad);

document.addEventListener('keydown', eventFunctions.checkUserTyping);

_("body").addEventListener("click",function(e){
	let clickedElement = e.target.getAttribute("data-type");

	if(clickedElement === "giveAccBtn"){
		eventFunctions.onLoad()
	}
	else if(clickedElement === "checkInternet"){
		eventFunctions.checkNetWorkClick()
	}
	else if(clickedElement === "micSpan"){
		eventFunctions.GetSpeech(e)
	}
	else if(clickedElement === "aimButton"){
		eventFunctions.gettingCurrentLocation()
	}
	else if(clickedElement === "todayOrWeek"){
		eventFunctions.convertWeekToHour(e)
	}
	else if(clickedElement === "toggleDark"){
		eventFunctions.darkAndLightModeBtn()
	}
	else if(clickedElement === "display_image"){
		eventFunctions.display_image(e)
	}
	else if(clickedElement === "img_clear"){
		eventFunctions.clearLargerPopupImage(e)
	}
	else if(clickedElement === "refresh"){
		eventFunctions.refreshContent(e)
	}
	else if(clickedElement != "eachCityList" && clickedElement != "searchVal"){
		_(".listOfCity")!=null ? _(".listOfCity").remove():'';
	}
})


