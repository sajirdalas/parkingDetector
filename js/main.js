
var map;
var service;
var resultArray;
var cIndex = 0;
var cDestination = new Object();
var cLocation = new Object();
var listSize = 0;

function getResults(lat,long,callback) {
  var location = new google.maps.LatLng(lat,long);

  map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 15
    });

  var request = {
    location: location,
    radius: '500',
    types: ['parking']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results,status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    resultArray = results;
    listSize = results.length;
    callback(results);
  }
  });
}

function getPosition(callback,errorcallback){
  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
    // $("body").append("latitude: "+position.coords.latitude+" longitude: "+position.coords.longitude);
    callback(position.coords.latitude,position.coords.longitude);
    });
  } else {
    errorcallback();
  }
}

function showNearest(list){
  // console.log(list);
  // $("body").append("name: "+list[0].name+" vicinity: "+list[0].vicinity+" latitude: "+list[0].geometry.location.b+" longitude: "+list[0].geometry.location.d);
  $("#name").append(list[cIndex].name);
  if(!list[cIndex].vicinity!==undefined){
    $("#vicinity").append(list[cIndex].vicinity);
  }else{
    $("#vicinity").css("display","none");
  }
  $("#rotating_icon").fadeOut(400,function(){
    $("#results").fadeIn();
  });
  cDestination.latitude = list[cIndex].geometry.location.d;
  cDestination.longitude = list[cIndex].geometry.location.e;
}

function initialize(){
  getPosition(function(a,b){
    cLocation.latitude = a;
    cLocation.longitude = b;
    getResults(a,b,showNearest);
  },function(){
    alert("No location api found");
  });
}

function dummyInitialize(){
  cLocation.latitude = 41.4093890;
  cLocation.longitude = 2.1602520;
  getResults(41.4093890,2.1602520,showNearest);
}

function nextElement(){
  cIndex++;
  if(cIndex<listSize){
    showNearest(resultArray);
  }else{
    if(confirm("Out of results! Restart?")){
      location.reload();
    }
  }
}

function getGoogleDirections(origin,end){

  if(origin.latitude===undefined || origin.longitude===undefined || end.longitude===undefined || end.longitude===undefined){
      return "error";
  }

  if(checkIfAndroid()){
    var result = "geo:"+origin.latitude+","+origin.longitude+"?q="+end.latitude+","+end.longitude;
  }
  else{
    var result = "http://maps.google.com/maps?saddr="+origin.latitude+","+origin.longitude+"&daddr="+end.latitude+","+end.longitude;
  }
  return result;
}

function goToMap(){
  var mapAddr = getGoogleDirections(cLocation,cDestination);
  alert(mapAddr);
  // var mapAddr = "geo:41.4093890,2.1602520?q=41.4093891,2.1602521";
  if(mapAddr!="error"){
    window.location = mapAddr;
  }
}

function checkIfAndroid(){
  var ua = navigator.userAgent.toLowerCase();
  var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
  if(isAndroid) {
    return true;
  }else{
    return false;
  }
}