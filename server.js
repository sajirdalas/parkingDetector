


function StartSever(appV,expressV){
	
var app = appV;
var express = expressV;


// app.get('/predictions', function(req, response){

// 	names = [];
//     predictions = [];
//     finalDates = [];
//     predIds = [];
  
// 	response.writeHead(200, {"Content-Type": "application/json"});


// 	predictionIt.find().lean().exec(function (err, ret) {
//     		response.write(JSON.stringify(ret));
//     		response.end();
// 		}
// 	);

// });

// app.post('/receive', function(request, response){

// if(request.body.confidence  == "null"){
// 	request.body.confidence=-1;
// }
// if(request.body.reasons == "null"){
// 	request.body.reasons="";
// }
// if(request.body.mention == "null"){
// 	request.body.mention="";
// }
// if(request.body.links == "null"){
// 	request.body.links="";
// }



app.use("/",express.static(__dirname+'/'));
app.use("/css",express.static(__dirname+'/css'));
app.use("/js",express.static(__dirname+'/js'));
app.use("/img",express.static(__dirname+'/img'));

// app.get('*', function(req, res){


}

 exports.StartSever = StartSever;