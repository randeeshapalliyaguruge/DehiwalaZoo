let products = {
    price : [1000,500,500,250,5000,2500],
    duration : [0,250,500,1000],
    extras : [5000,500]
}
var num_Of_Adults = 0;
var num_Of_Children = 0;

function calculateCost(){
    var ticket_price = products["price"];
    var duration_price = products["duration"];
    var extra_price = products["extras"];

    var tCost = 0;

    var ticketType = document.getElementById("txtTicket").value;
    var duration = document.getElementById("duration").value;
    var numAdults = document.getElementById("noAdults").value;
    var numChildren = document.getElementById("noChildren").value;
    var numAnnualPss = document.getElementById("annualPasses").value;
    var foodTokens = document.getElementById("foodTokens").value;

if(numAdults || numChildren){
    if(ticketType == ""){
        alert("Select the Ticket Type");
        document.getElementById("txtTicket").focus();
        return;
    }

    if(duration ==""){
        alert("Select the Duration")
        document.getElementById("duration")
        return;

    }
}

    if(numAdults == ""){
        numAdults = 0;
    }
    else{
        numAdults=parseInt(numAdults);

    }
    //validation
    if(numAdults<0){
        alert("Enter a Possitive number for Adults")
    }

    if(numChildren == ""){
        numChildren = 0;
    }
    else{
        numChildren=parseInt(numChildren);

    }
    //validation
     if(numChildren<0){
        alert("Enter a Possitive number for Children")
    }

    if(numAnnualPss == ""){
        numAnnualPss = 0;
    }
    else{
        numAnnualPss=parseInt(numAnnualPss);

    }
    //validation
    if(numAnnualPss<0){
        alert("Enter a Possitive number for Annual Passes")
    }

    if(foodTokens == ""){
        foodTokens = 0;
    }
    else{
        foodTokens=parseInt(foodTokens);

    }
    //validation
    if(foodTokens<0){
        alert("Enter a Possitive number for Food Tokens")
    }
    
    totalPrice = 0;
    ticketType = parseInt(ticketType);


    if (ticketType == 0){
        totalPrice = (numAdults*ticket_price[0]) + (numChildren*ticket_price[1]);

    }
    else if(ticketType==1){
        totalPrice = (numAdults*ticket_price[2]) + (numChildren*ticket_price[3]);
        
    }
    else if(ticketType==2){
        totalPrice = (numAdults*ticket_price[4]) + (numChildren*ticket_price[5]);

    }
   

    if (duration!= ""){
        
        totalPrice = totalPrice + duration_price[duration];
    }
     

    totAnnu = numAnnualPss* extra_price[0];
    totFoodT = foodTokens* extra_price[1];

    tCost = parseFloat(totalPrice + totAnnu + totFoodT);
    document.getElementById("spCost").innerHTML = tCost.toFixed(2);


    num_Of_Adults = numAdults;
    num_Of_Children = numChildren;
    
}



function extras(){
    var divExtras = document.getElementById("divExtras");
    divExtras.style.display = optional.checked? "block" : "none";
}



function addToOrder(){

    var cost = parseFloat(document.getElementById("spCost").innerHTML);
    if(cost == 0){
        alert("Please select Ticket Type , Duration and no of tickets");
        return;
    }
        
    document.getElementById("divAddOrder").style = "display : block";

    var grand_total = parseFloat(document.getElementById("GrandTot").innerHTML);

    var ctrl_ticketType = document.getElementById("txtTicket");
    var ticket_pricetxt = ctrl_ticketType.options[ctrl_ticketType.selectedIndex].text;
   
    var ctrl_duration_price = document.getElementById("duration");
    var duration_price_name = ctrl_duration_price.options[ctrl_duration_price.selectedIndex].text;


    /*Adding Rows to the table body*/

    var tbody = document.getElementById("tbody_update");
    var trow = tbody.insertRow(-1);

    td1 = trow.insertCell(0);
    td1.innerHTML = ticket_pricetxt;

    td2 = trow.insertCell(1);
    td2.innerHTML = document.getElementById("noAdults").value;

    td3 = trow.insertCell(2);
    td3.innerHTML = document.getElementById("noChildren").value;

    td4 = trow.insertCell(3);
    td4.innerHTML = duration_price_name;

    td5 = trow.insertCell(4);
    td5.innerHTML = document.getElementById("annualPasses").value;

    td6 = trow.insertCell(5);
    td6.innerHTML = document.getElementById("foodTokens").value;

    var total = parseFloat(document.getElementById("spCost").innerHTML);
    grand_total = grand_total + total;

    td7 = trow.insertCell(6);
    td7.innerHTML = total.toFixed(2);

    td8 = trow.insertCell(7);
    td8.innerHTML = "<a href='javascript:void(0)' style='color:red;font-weight:bold' onclick='removeRecord(this.parentElement);'>X</a>";

    document.getElementById("GrandTot").innerHTML = grand_total.toFixed(2);
    
  
    calcLoyaltyPoints();
    resetPurchaseForm();
    extras();
    
}

function removeRecord(item){
    var result = confirm("Do you want to remove this record?");
    
    if(result == true){
        var table = document.getElementById("tbl_order");
        var grand_total = parseFloat(document.getElementById("GrandTot").innerHTML);
        
        var total = parseFloat(item.parentElement.cells[6].innerHTML);
       
        grand_total = grand_total - total;
        
        document.getElementById("GrandTot").innerHTML = grand_total.toFixed(2);
        table.deleteRow(item.parentElement.rowIndex);
    }
   
}

function placeOrder(){

    var Table = document.getElementById("tbody_update");
    var grandTotal = document.getElementById("GrandTot");
    Table.innerHTML = "";
  
    grandTotal.innerHTML = "0.00";

    alert("Thank You for Purchasing from ZOO DEHIWALA");
  }


function resetPurchaseForm(){
    document.getElementById("frmPurchase").reset();
    document.getElementById("spCost").innerHTML = "0.00";
}



    //Local Storage


const formId = "frmPurchase";
const formDetector = `${formId}`; 
const saveButton = document.querySelector("#addFavourite"); 
const retrieveButton = document.querySelector("#retrieveFavourite");
const alertBox = document.querySelector(".alert");
let form = document.querySelector(`#${formId}`);
let formElements = form.elements;


 const getFormData = () => {
  let data = { [formDetector]: {} };
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formDetector][element.name] = element.value;
    }
  }
  return data;
};

saveButton.onclick = event => {
  event.preventDefault();
  data = getFormData();
  localStorage.setItem(formDetector, JSON.stringify(data[formDetector]));
  alert("Your order has been saved as a Favorite.") ;
  
};



 const formautoRefill = () => {
  if (localStorage.key(formDetector)) {
    const savedData = JSON.parse(localStorage.getItem(formDetector));
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
    alert("Your order has been Retrived from Favourites.")
    
  }
};



retrieveButton.onclick = function(){
    formautoRefill(); 
    calculateCost();

}




//Calculate Loyalty points and save it in the local storage


var grand_loyaltyPoints = 0;
var loyaltyPoints = 0;
var totalTicket = 0;


function calcLoyaltyPoints(){

  totalTicket = totalTicket + num_Of_Adults + num_Of_Children;

  if(totalTicket > 3){

      loyaltyPoints = 20 * totalTicket;

      grand_loyaltyPoints = grand_loyaltyPoints + loyaltyPoints;

      localStorage.setItem("loyalty",grand_loyaltyPoints);

  }

}


function showLoyaltyPoints(){

  grand_loyaltyPoints = JSON.parse(localStorage.getItem(`loyalty`));

  if(grand_loyaltyPoints>0){

      alert("Congratulations! You have earned "+  grand_loyaltyPoints + " loyalty points so far");

  }

  else{

      alert("Sorry! You don't have any loyalty points so far");

  }
}


//Validations for Donate
function inputValidation(){

    var name = document.getElementById("txtname").value;
    var address = document.getElementById("txtadd").value;
    var cdname = document.getElementById("cdnametxt").value;
    var cdnum = document.getElementById("cdnumtxt").value;
    var cvcnum = document.getElementById("cvcnumtxt").value;
    var exp = document.getElementById("exptxt").value;
    
    
    var name_pattern = /^[A-Za-z\s\.]{10,}$/;
    var add_pattern = /^[A-Za-z\d\.\-\/\#\,\s]+$/;
    var cdname_pattern = /^[A-Za-z\s\.]{10,}$/;


    if(!name.match(name_pattern)){
        if(name.length<10){
            alert("Please enter your full name");
        }
        else{
            alert("Please enter a valid name");
        }
        document.getElementById("txtname").focus();
        return false;
    }

    if(!address.match(add_pattern)){
        alert("Please enter a valid address");
        document.getElementById("txtadd").focus();
        return false;
    }
    

    if(cdnum=="" || cdnum.length<19){
        alert("Invalid Card number. Please Check the Card number");
        document.getElementById("cdnumtxt").focus();
        return false;
    }

    if(!cdname.match(cdname_pattern)){
        if(cdname.length<10){
            alert("Please enter the Name Properly");
        }
        else{
            alert("Please enter the Name as printed on the Card");
        }
        document.getElementById("cdnametxt").focus();
        return false;
    }

    if(exp==""){
        alert("Please Enter the Card's expire Month & Year");
        document.getElementById("exptxt").focus();
        return false;
    }


    if(cvcnum=="" || cvcnum.length<3){
        alert("Invalid CVC. Please enter a Three Digit number");
        document.getElementById("cvcnumtxt").focus();
        return false;
    }
    resetDonationBttn();
}

function resetDonationBttn(){
    document.getElementById("donate").reset();
    alert("Thank you for Donating Dehiwla ZOO");
}