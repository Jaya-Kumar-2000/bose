let createNewNote = function (){
	document.querySelector(".popupBox").style.display ="flex";
	document.querySelector(".forms").classList.add("newForm");
	document.querySelector(".name").focus();
	closeWithoutSave();
}

let weightRange = function (range){    //to get the value of range input
	document.querySelector(".weightValue").innerHTML=`<b>${range.value} kg</b>`;
}

let heightRange = function (range){    //to get the value of range input
	document.querySelector(".heightValue").innerHTML=`<b>${range.value} cm</b>`;
}
let retriveArray = function(){    //to get the value of localstorage
	let retriedArr= JSON.parse(localStorage.getItem("UserInfoArr"));
	return retriedArr;
}

let dp="";
let getUserImage = function(e){
	
	e.preventDefault();           
    const reader = new FileReader();
    reader.addEventListener("load",()=>{
    	dp=(reader.result);
    	document.querySelector(".dp").style.background="none";
    })


    const fi = document.querySelector(".dp");

    if (fi.files.length > 0) {
      for (let i = 0; i <= fi.files.length - 1; i++) {
        const file = Math.round((fi.files.item(i).size) / 500);
        // The size of the file.
        if (file > 1024) {
        	let errorArray=["please select a file lesser than 500 KB, Please try to change the new DP after some time."];
          	displayError(errorArray);
        } 
        else {
          reader.readAsDataURL(fi.files[i])
        }
      }
    }	  
}

let getFormValues = function(e){     //to get the value of form(new/edit) from user.
	let errorArray=[];
	e.preventDefault();
	let username= document.querySelector(".name").value;
	if((username).match(/^[\a-zA-Z0-9$@#_]+[a-zA-Z0-9$@#\.]{5,}$/gi)){    //rejex for username
		document.querySelector(".name").style.background="#eee";
	}
	else{
		username="";
		document.querySelector(".name").style.background="rgba(255,0,0,.2)";
		errorArray.push("Please provide a Valid User name, It should be more than 5 characters and it should not have any numbers, space, special characters except #$_@.");
	}

	let Email= document.querySelector(".email").value;
	if((Email).match(/^\w+([\.-]?\w+)\@(\w+([\.-]?\w+))\.(\w+([\.]?\w{2,}))$/gi)){    //rejex for Email validation
		document.querySelector(".email").style.background="#eee";
	}				
	else{
		username="";
		document.querySelector(".email").style.background="rgba(255,0,0,.2)";
		errorArray.push("Please provide a Valid Email ID");
	}

	let MobNumber= document.querySelector(".tel").value;
	if((MobNumber).match(/^[6-9]\d{9}$/gi)){		//regex for mobile number
		document.querySelector(".tel").style.background="#eee";	
		if(e.target.classList.contains("newForm")){
			if(retriveArray() != null){
				retriveArray().forEach(function(eachMobNum){
					if(eachMobNum.MobileNumber==MobNumber){
						MobNumber="";
						document.querySelector(".tel").style.background="rgba(255,0,0,.2)";
						errorArray.push("Mobile number already exist. Please try to give a new mobile number");
					}
				})
			}
		}		
	}
	else{
		MobNumber="";
		document.querySelector(".tel").style.background="rgba(255,0,0,.2)";
		errorArray.push("Please provide a valid Mobile number, the number should begin with 6 or 7 or 8 or 9 and contain exactly 10 digits.");
	}

	let description= document.querySelector(".info").value;
	if(description==""){
		document.querySelector(".info").style.background="rgba(255,0,0,.2)";
		errorArray.push("Please try to give a short information about you.");
	}	
	else{
		document.querySelector(".info").style.background="#eee";
	}

	let dob= document.querySelector(".dob").value;
	if(isValidDate(dob)){
		document.querySelector(".dob").style.background="#eee";
	}
	else{
		dob="";
		document.querySelector(".dob").style.background="rgba(255,0,0,.2)";
	}

	function isValidDate(dateOfBirth) {
	  let today = new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();
	  if(new Date(dateOfBirth).getTime() < new Date(today).getTime()){
	  	return dateOfBirth.match(/^\d{1,4}-\d{1,2}-\d{1,2}$/) != null;
	  }
	  else{
	  	errorArray.push("DD-MM-YYYY is the correct date of birth, and it should appear under today");
	  }
	}


	if(dp==""){
		document.querySelector(".dp").style.background="rgba(255,0,0,.2)";
		errorArray.push("Please provide correct display Image. Your image should be lesser than 500 KB. Please try again.");
	}
	else{
		document.querySelector(".dp").style.background="none";
	}

    //calculate month difference from current date in time  
    let month_diff = Date.now() - new Date(dob).getTime();  
          
    //convert the calculated difference in date format  
    let age_dt = new Date(month_diff);   
            
    //extract year from date      
    let year = age_dt.getUTCFullYear();  
            
    //now calculate the age of the user  
    let age = (Math.abs(year - 1970)).toString();



	let weight = document.querySelector(".weightRange").value;

	let height = document.querySelector(".heightRange").value;

	let gender="";
	document.querySelectorAll('.gender').forEach(function(ele){	
		if(ele.checked){
			gender=ele.value;
		}           
	});
	if(gender==""){
		errorArray.push("Gender field should not be empty.");
	}

	let checkboxes = document.querySelectorAll('input[name="hobbies"]:checked');
    let hobbiesArr=[];
    checkboxes.forEach((checkbox) => {
        hobbiesArr.push(checkbox.value);
    });
    if(hobbiesArr==""){
		errorArray.push("Hobbies field should not be empty.");
	}	

	let bmi = weight / ((height/100)**2);
	let bmiResult="";
	if (bmi>=0  && bmi<= 18.5){
		bmiResult = 'Under weight';
	}
	else if (bmi>18.5  && bmi<= 24.9){
		bmiResult = 'Normal';
	}
	else if (bmi>24.9  && bmi<= 29.9){
		bmiResult  = 'Over weight';
	}
	else if (bmi>29.9  && bmi<= 34.9){
		bmiResult = 'Obese';
	}
	else{
		bmiResult = 'Extremely obeses';
	}

	let lastEdit = (new Date().getDate() + "-" + (new Date().getMonth()+1) + "-" + (new Date().getFullYear().toString()).slice(2,) + " ["+ new Date().getHours() +"h: " + new Date().getMinutes() +"m]");
	
    let objCreation={
    	Name:username,
			Email:Email,
			MobileNumber:MobNumber,
			Description:description,
			DateOfBirth:dob,
			displayPicture:dp,
			Age:age,
			Weight:weight,
			Height:height,
			BMI:bmiResult,
			Gender:gender,
			Hobbies:hobbiesArr,
			lastEdit:lastEdit
    }
    
    if(e.target.classList.contains("editForm")){
    	saveEditNote(objCreation,errorArray);	
    }
    else{
    	saveNewNote(objCreation,errorArray);
    }	
}

let saveNewNote = function(obj,errorArray){
	let retriedArr = retriveArray();
	document.querySelector(".userDetails").innerText="";
	if(obj.Name==""||obj.Email==""||obj.MobileNumber=="" || obj.displayPicture=="" || obj.Description=="" ||obj.DateOfBirth==""|| obj.Gender=="" ||obj.Hobbies==""){
		displayError(errorArray);

	}
	else{
		closeErrorPopUp();
		document.querySelector(".popupBox").style.display ="none";
		if(retriedArr == undefined){
			let firstObj= [obj];	
			localStorage.setItem("UserInfoArr",JSON.stringify(firstObj));	
			loadDetails();
		}
		else{
			retriedArr.push(obj);
			localStorage.removeItem("UserInfoArr");
			localStorage.setItem("UserInfoArr",JSON.stringify(retriedArr));
			document.querySelector(".errMsg").style.display="none";
			loadDetails();
		}	
	}
	errorArray=[];	
}

let loadDetails= function(){
let retriedArr = retriveArray();
	if(retriedArr != null){
		if(retriedArr.length==0 ){
			document.querySelector(".errMsg").style.display="flex";
			document.querySelector(".details").style.display="none";
			document.querySelector(".userDetails").innerText="";
		}
		else{
			document.querySelector(".errMsg").style.display="none";
			document.querySelector(".details").style.display="flex";
			document.querySelector(".userDetails").innerText="";
			retriedArr.forEach(function(eachArray){
				loadEachPerson(eachArray);
			});
		}	
	}
}	
let count=0;

loadDetails();
function loadEachPerson(eachArray){
	let container = document.createElement("article");
	container.setAttribute("class","eachContainer");


	let imagecontainer = document.createElement("div");
	imagecontainer.setAttribute("class",`Imagecontainer Imagecontainer${count++}`);

	let dPcontainer = document.createElement("figure");
	dPcontainer.style.backgroundImage= `url(${eachArray.displayPicture})`;
	dPcontainer.onclick=displayImage;
	dPcontainer.onmouseenter=displayImagePopUP;
	dPcontainer.onmouseleave=blockImagePopUP;

	imagecontainer.appendChild(dPcontainer);
				
	container.appendChild(imagecontainer);
				
	let name = document.createElement("h1");
	name.innerText="Name: "

	let nameSpan = document.createElement("span");
	nameSpan.innerText= eachArray.Name;
	name.appendChild(nameSpan);
	container.appendChild(name);

	let mId = document.createElement("h1");
	mId.innerText="Mail Id: "

	let mailId = document.createElement("span");
	mailId.innerText= eachArray.Email;
	mId.appendChild(mailId);
	container.appendChild(mId);

	let phNo = document.createElement("h1");
	phNo.innerText="Ph No: ";

	let phoneNum = document.createElement("span");
	phoneNum.innerText= eachArray.MobileNumber;
	phoneNum.setAttribute("class","phnoSpan");
	phNo.appendChild(phoneNum);
	container.appendChild(phNo);

	let description = document.createElement("h1");
	description.innerText="Desc: "

	let descriptionSpan = document.createElement("span");
	descriptionSpan.innerText= eachArray.Description;
	description.appendChild(descriptionSpan);
	container.appendChild(description);

	let dob = document.createElement("h1");
	dob.innerText="DOB: "

	let dobSpan = document.createElement("span");
	dobSpan.innerText= eachArray.DateOfBirth;
	dob.appendChild(dobSpan);
	container.appendChild(dob);

	let age = document.createElement("h1");
	age.innerText="Age: "

	let ageSpan = document.createElement("span");
	ageSpan.innerText= eachArray.Age +" Yrs";
	age.appendChild(ageSpan);
	container.appendChild(age);

	let height = document.createElement("h1");
	height.innerText="Height: "

	let heightSpan = document.createElement("span");
	heightSpan.innerText= eachArray.Height +" cm";
	height.appendChild(heightSpan);
	container.appendChild(height);	

	let weight = document.createElement("h1");
	weight.innerText="Weight: "

	let weightSpan = document.createElement("span");
	weightSpan.innerText= eachArray.Weight +" kg";
	weight.appendChild(weightSpan);
	container.appendChild(weight);

	let bmi = document.createElement("h1");
	bmi.innerText="BMI: "

	let bmiSpan = document.createElement("span");
	bmiSpan.innerText= eachArray.BMI;
	bmi.appendChild(bmiSpan);
	container.appendChild(bmi);	


	let gender = document.createElement("h1");
	gender.innerText="Gender: "

	let genderSpan = document.createElement("span");
	genderSpan.innerText= eachArray.Gender;
	gender.appendChild(genderSpan);
	container.appendChild(gender);	

	let hobbies = document.createElement("ul");

	let hobbiesHead = document.createElement("b");
	hobbiesHead.innerText= "Hobbies: ";
	hobbies.appendChild(hobbiesHead);
	(eachArray.Hobbies).forEach(function(ele){
		let hobbiesSpan = document.createElement("li");
		hobbiesSpan.innerText= ele;
		hobbies.appendChild(hobbiesSpan);
	});
	container.appendChild(hobbies);
	
	let buttonDiv = document.createElement("div");
	buttonDiv.setAttribute("class","deleteEditImg")

	let editBtn = document.createElement("img");
	editBtn.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3PYod0DHL0kfpLXCxjRq6i2z4ez4Mtb1u2oFD-RtV-6v54jXZPRwwrLgMJigRsbB9u8&usqp=CAU";
	editBtn.setAttribute("title","Edit")
	editBtn.setAttribute("class","editBtn");
	editBtn.onclick=editNote;
	buttonDiv.appendChild(editBtn);

	let deleteBtn = document.createElement("img");
	deleteBtn.src="https://cpng.pikpng.com/pngl/s/247-2474264_png-file-svg-delete-icon-svg-clipart.png";
	deleteBtn.setAttribute("title","Delete")
	deleteBtn.setAttribute("class","deleteBtn");
	deleteBtn.onclick=deleteNote;
	buttonDiv.appendChild(deleteBtn)

	container.appendChild(buttonDiv);

	let lastEdit = document.createElement("span");
	lastEdit.innerHTML= `<b>Last edit: </b>${eachArray.lastEdit}`;
	lastEdit.setAttribute("class","lastEdit");
	container.appendChild(lastEdit);

	document.querySelector(".userDetails").appendChild(container);
}

let closeWithoutSave = function(){
	document.querySelector(".forms").classList.remove("editForm");
	document.querySelector(".name").value ="";
	document.querySelector(".email").value="";
	document.querySelector(".tel").value="";
	document.querySelector(".info").value ="";
	document.querySelector(".dob").value="";
	document.querySelector(".weightRange").innerText=50 +" kg";

	document.querySelector(".heightRange").innerText=100 +" cm";
	
	document.querySelectorAll(".gender").forEach(function(radio){
			radio.checked=false;
	})

	document.querySelectorAll(".hobbies").forEach(function(hobby){
			hobby.checked=false;
	})
	document.querySelector(".heading h1").innerText="New Record";
	loadDetails();
}

let closePopUP=  function(){
	document.querySelector(".forms").classList.remove("newForm");
	document.querySelector(".popupBox").style.display="none";
	document.querySelector(".name").style.background="#eee";
	document.querySelector(".email").style.background="#eee";
	document.querySelector(".tel").style.background="#eee";
	document.querySelector(".info").style.background="#eee";
	document.querySelector(".dob").style.background="#eee";
	closeErrorPopUp();
}

function deleteNote(e){
	let retriedArr = retriveArray();
	let deletedPhoeNum= this.parentNode.parentNode.querySelector(".phnoSpan").innerText;
	retriedArr.forEach(function(ele,index,arr){
		if(ele.MobileNumber==deletedPhoeNum){
			retriedArr.splice(index,1);
			localStorage.setItem("UserInfoArr",JSON.stringify(retriedArr));				
		}
	})
	loadDetails();
}

let index;
let clickedImageUrl="";
function editNote(){
	clickedImageUrl = this.parentNode.parentNode.querySelector("figure").style.backgroundImage.slice(4, -1); 
	let retriedArr = retriveArray();
	document.querySelector(".forms").classList.add("editForm");
	document.querySelector(".forms").classList.remove("newForm");
	let clickedIndex= this.parentNode.parentNode.querySelector(".phnoSpan").innerText;
	retriedArr.forEach(function(ele,indx,arr){
		if(ele.MobileNumber==clickedIndex){
			index=indx;
  			showPopup(retriedArr);		
		}
	})
	clearInput();
}

function showPopup(retriedArr){
	document.querySelector(".popupBox").style.display="flex";
	document.querySelector(".closeIcon").classList.add("closewithoutEdit");
	document.querySelector(".heading h1").innerText="EDIT";
	document.querySelector(".name").value =retriedArr[index].Name;
	document.querySelector(".email").value=retriedArr[index].Email;
	document.querySelector(".tel").value=retriedArr[index].MobileNumber;
	document.querySelector(".info").value=retriedArr[index].Description;
	document.querySelector(".dob").value=retriedArr[index].DateOfBirth;
	document.querySelector(".weightRange").value=retriedArr[index].Weight;
	document.querySelector(".heightRange").value=retriedArr[index].Height;
	document.querySelector(".weightValue").innerHTML=`<b>${document.querySelector(".weightRange").value} kg</b>`;
	document.querySelector(".heightValue").innerHTML=`<b>${document.querySelector(".heightRange").value} cm</b>`;
	document.querySelector(".name").focus();
	document.querySelectorAll(".gender").forEach(function(radio){
		if(radio.value==retriedArr[index].Gender){
			radio.checked=true;
		}
	})
	document.querySelectorAll(".hobbies").forEach(function(hobby){
		retriedArr[index].Hobbies.forEach(function(eachHobby){
			if(hobby.value==eachHobby){
				hobby.checked=true;
			}
		})
	})
}

let saveEditNote = function(obj,errorArray){
	let retriedArr = retriveArray();
	if(obj.displayPicture==""){
		obj.displayPicture= clickedImageUrl;
		document.querySelector(".dp").style.background="none";
	}
	if(obj.Name==""||obj.Email==""||obj.MobileNumber=="" || obj.Description=="" ||obj.DateOfBirth==""|| obj.Gender=="" ||obj.Hobbies==""){
		displayError(errorArray);
	}
	else{
		closeErrorPopUp();
		document.querySelector(".forms").classList.remove("editForm");
		retriedArr[index]=obj;
		localStorage.setItem("UserInfoArr",JSON.stringify(retriedArr));				
		document.querySelector(".popupBox").style.display ="none";
		loadDetails();
	}
	errorArray=[];	
}

let searchNote = function(){
	closeErrorPopUp();

	let errorArray=[];
	let retriedArr = retriveArray();
	document.querySelector(".ErrorMsg").innerText="Sorry, No record found";
	let val = document.querySelector(".searchInput").value;
	let dropDownVal = document.querySelector(".dropDown").value;
	if(val==""){
		document.querySelector(".searchInput").style.boxShadow="0 0 10px rgba(255,0,0,.2)";	
		errorArray.push("Please fill the Input box");
		displayError(errorArray);
	}
	else{
		document.querySelector(".searchInput").style.boxShadow="none";
	}
	if(dropDownVal!="" && val!=""){
		document.querySelector(".userDetails").innerText="";
		retriedArr.forEach(function(ele,index,arr){
			if(dropDownVal=="Age"){           //if dropdown value is age
				if(val.match(/^\d+$/)){     //rejex for age, it should contain only numbers.
					if(ele[dropDownVal]==val){  //ele.Age == userVal
						loadEachPerson(ele);
					}
				}
				else{
					errorArray.push("Age should not contain any special character, letters, floating point value");
					displayError(errorArray);
					document.querySelector(".ErrorMsg").innerText="Invalid age";
				}	
			}

			else if(dropDownVal=="Weight"){            	//if dropdown value is Weight
				if(val.match(/^\d+$/)){		//rejex for weight, it should contain only numbers.	
					if(ele[dropDownVal]==val){ 
						loadEachPerson(ele);
					}
				}
				else{
					errorArray.push("Weight should not contain any letters, any special character, floating point value");
					displayError(errorArray);
					document.querySelector(".ErrorMsg").innerText="Invalid Weight";
				}	
			}

			else if(dropDownVal=="Height"){             //if dropdown value is height
				if(val.match(/^\d+$/)){		//rejex for height, it should contain only numbers.	
					if(ele[dropDownVal]==val){ 
						loadEachPerson(ele);
					}
				}
				else{
					errorArray.push("Height should not contain any letters, any special character, floating point value");
					displayError(errorArray);
					document.querySelector(".ErrorMsg").innerText="Invalid Height";
				}	
			}

			else if(dropDownVal=="BMI"){        //if dropdown value is bmi
				if((val).match(/^([A-Za-z\s]){0,}$/)){		//rejex for bmi, it should have only character and space.		
					if(ele[dropDownVal].toLowerCase().includes(val)){ 
						loadEachPerson(ele);
					}	
				}
				else{
					errorArray.push("Please provide a valid BMI, it should not have any numbers, special characters except ' '");
					displayError(errorArray);
					document.querySelector(".ErrorMsg").innerText="Invalid BMI";
				}		
			}

			else if(dropDownVal=="DateOfBirth"){        //if dropdown value is dob 
				if(val.match(/^\d+$/gi)){
					if(ele[dropDownVal].includes(val)){
						loadEachPerson(ele);
					}
				}
				else{
					errorArray.push("Your input should be less than 4 numbers and should not be characters");
					displayError(errorArray);
					document.querySelector(".ErrorMsg").innerText="Invalid Date of Birth";
				}	
			}

			else if(dropDownVal=="Gender"){        //if dropdown value is gender
				if(val.match(/^[a-z]+$/gi)){
					if(ele[dropDownVal].toLowerCase().startsWith(val.toLowerCase())){
						loadEachPerson(ele);
					}
				}
				else{
					errorArray.push("Please provide a valid gender (F/M)");
					displayError(errorArray);
					document.querySelector(".ErrorMsg").innerText="Invalid Gender";
				}	
			}

			else if(dropDownVal=="MobileNumber"){         //if dropdown value is Mobile Number
				if((val).match(/^\d{1,10}$/gi)){		
					if(ele[dropDownVal].includes(val)){
						loadEachPerson(ele);		
					}		
				}
				else{
					errorArray.push("Please provide numbers only and it should be less than 10 numbers");
					displayError(errorArray);
					document.querySelector(".ErrorMsg").innerText="Invalid Mobile Number";
				}				
			}

			else if(dropDownVal=="Hobbies"){        //if dropdown value is hobby
				document.querySelector(".userDetails").innerText="";
				if((val).match(/^[A-Za-z]*$/gi)){	
					retriedArr.forEach(function(ele,index,arr){
						for(let i=0;i<(ele.Hobbies).length;i++){
							if(ele.Hobbies[i].toLowerCase().includes(val.toLowerCase())){
								loadEachPerson(ele);
								break;		
							}	
						}
					});	
				}
				else{
					errorArray.push("Please provide a valid hobby, it should not have any numbers, space, special characters.");
					displayError(errorArray);
					document.querySelector(".ErrorMsg").innerText="Invalid hobby";
				}		
			}

			else{       //if dropdown value is Mobile none of the above(name,email,desc)
				if(ele[dropDownVal].toLowerCase().includes(val.toLowerCase())){
					loadEachPerson(ele);
				}
			}	
			errorArray=[];
		});
	}	
	else{       //It will accept all type of input
		document.querySelector(".userDetails").innerText="";

		retriedArr.forEach(function(ele,index,arr){
			for (let eachVal of  Object.values(ele)) {
				if(typeof eachVal == "string"){   //if eachValue of ele object is not hobbies Array (string).
					if(eachVal.toLowerCase().includes(val.toLowerCase())){
						loadEachPerson(ele);
						break;
					}
				}	
				if(typeof eachVal == "object"){    //if eachVal of ele object is hobbies Array
					for(let eachHobby of eachVal){
						if(eachHobby.toLowerCase().includes(val.toLowerCase())){
							loadEachPerson(ele);
						}
					}
				}	
			}
		});	
	}

	if(document.querySelector(".userDetails").innerText== ""){
		document.querySelector(".ErrorMsg").style.display="block";
	}
	else{
		document.querySelector(".ErrorMsg").style.display="none";
	}
}

let checkEmpty = function(searchInput){
	closeErrorPopUp();
	if(searchInput.value == ""){
		document.querySelector(".ErrorMsg").style.display="none";
		document.querySelector(".seachBox > span b").classList.remove("closeX");
		loadDetails();
	}
	else{
		document.querySelector(".searchInput").style.boxShadow="none";
		document.querySelector(".seachBox > span b").classList.add("closeX");
	}
}

let displayError = function(errorArray){
	document.querySelector(".errorList").innerText="";
	document.querySelector(".throwError").classList.add("addCss");
	errorArray.forEach(function(eachError){
		let error = document.createElement("li");
		error.innerText=eachError;
		document.querySelector(".errorList").appendChild(error);
	});
}

let closeErrorPopUp = function(){
	document.querySelector(".throwError").classList.remove("addCss");
	document.querySelector(".searchInput").style.boxShadow="none";
}
document.querySelector(".forms").onclick=closeErrorPopUp;


let clearInput = function(){
	document.querySelector(".searchInput").value="";
	document.querySelector(".ErrorMsg").style.display="none";
	document.querySelector(".seachBox > span b").classList.remove("closeX");
	closeErrorPopUp();
	loadDetails();
}

function dropDownVal(dropDown){
	document.querySelector(".searchInput").placeholder=`Enter your ${dropDown.value}`
	if(dropDown.value==""){
		document.querySelector(".searchInput").placeholder="Enter something to search";
	}
}

function closeImagePopUp(ele) {
  document.querySelector("aside > div").style.backgroundSize="100% 100%";
	document.querySelector("aside").style.display="none";
}

let loading;
let popupImage;
function displayImagePopUP(e){
	loading = setTimeout(function(){
	let displayImagePopUp = document.createElement("div");
	displayImagePopUp.setAttribute("class","displayImagePopUp");
	displayImagePopUp.innerHTML=`<div class="loader"></div>`;

		popupImage = setTimeout(function(){
			displayImagePopUp.innerText="";
			displayImagePopUp.style.backgroundImage=e.target.style.backgroundImage;
		},"1500");

	document.querySelector(`.${e.target.parentNode.classList[1]}`).appendChild(displayImagePopUp);	
	}, "500");
}

function blockImagePopUP(e){
	document.querySelectorAll(".displayImagePopUp").forEach(function(ele){
		ele.remove();
	});	
	clearTimeout(loading);
	clearTimeout(popupImage)
}

function displayImage(){
	blockImagePopUP();
	document.querySelector("aside").style.display="flex";
	document.querySelector("aside > .img").style.backgroundImage = this.style.backgroundImage;
  document.querySelector("aside > .img").style.backgroundSize="100% 100%";
  document.querySelector(".imageUrl p").innerText=`${this.style.backgroundImage.slice(5, -2)}`;
}

let totalClick=0;
function zoomImage(e){
	e.stopPropagation()
  	totalClick+=1;
  	document.querySelector("aside > .img").style.backgroundSize="200% 200%";
  	document.querySelector("aside > .img").addEventListener("mousemove",zoomedImg);
  	if(totalClick>1) {
    	document.querySelector("aside > .img").style.backgroundSize="100% 100%";
    	totalClick=0;
  	} 
}

let zoomedImg = function(e){
	if(e.target.classList.contains("img")){
	  let xP = ((e.pageX - this.offsetLeft)/this.offsetWidth) * 100;
	  let yP = ((e.pageY - this.offsetTop)/this.offsetHeight) * 100;
	  document.querySelector("aside > .img").style.backgroundPosition=`${xP}% ${yP}%`; 
	}  
}

function incrementDecrement(sign,e) {
	e.stopPropagation();     
  string = document.querySelector("aside > .img").style.backgroundSize.split(" ");
	if(sign=="+")
 	 document.querySelector("aside > .img").style.backgroundSize = `${Number(string[0].slice(0,-1)) + 50}% ${Number(string[0].slice(0,-1)) + 50}%` ;
	else if(sign=="-"){
		if(document.querySelector("aside > .img").style.backgroundSize!="100% 100%")
	  document.querySelector("aside > .img").style.backgroundSize = `${Number(string[0].slice(0,-1)) - 50}% ${Number(string[0].slice(0,-1)) - 50}%` ;
	}
	else{
  	document.querySelector("aside > .img").style.backgroundSize="100% 100%";
	}
	document.querySelector("aside > .img").addEventListener("mousemove",zoomedImg);
}

function showZoomOpt(e){
	document.querySelector("aside .zoomINbtn").style.opacity="1";
}

function hideZoomOpt(){
	document.querySelector("aside .zoomINbtn").style.opacity="0";
}
function copyImageUrl(e){
	e.stopPropagation()
	if(e.target.classList.contains("copyIcon")){
		navigator.clipboard.writeText(document.querySelector(".imageUrl p").innerText);
		document.querySelector(".copiedImg").innerText="URL Copied !!!";
	}
}

function resetMsg(){
	setTimeout(function(){
		document.querySelector(".copiedImg").innerText="Copy URL";
	},100);
}