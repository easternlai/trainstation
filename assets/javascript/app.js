var trainsList = [];

var firebaseConfig = {
    apiKey: "AIzaSyCrqvDa47jwFdt7Udl2-Qi3f1LZsucXYHM",
    authDomain: "firstproject2-2bbb8.firebaseapp.com",
    databaseURL: "https://firstproject2-2bbb8.firebaseio.com",
    projectId: "firstproject2-2bbb8",
    storageBucket: "firstproject2-2bbb8.appspot.com",
    messagingSenderId: "518162345823",
    appId: "1:518162345823:web:76806d06a3119fa74290ea",
    measurementId: "G-Q454P9TNYX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

database= firebase.database();

$("#submit-train").on("click", function (event){
    var correctFields = true;

    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var trainInterval = parseInt($("#train-interval").val().trim());

    var addTrain = {
        name: trainName,
        loc: destination,
        first: firstTrain,
        interval: trainInterval
    }



    if(trainName.indexOf(' ') === -1){
        console.log("test");
    }

    // database.ref().push(addTrain);


    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#train-interval").val("");

});

database.ref().on("child_added", function(snapshot){


    var trainName = snapshot.val().name;
    var destiation = snapshot.val().loc;
    var firstTrain = snapshot.val().first;
    var trainInterval = parseInt(snapshot.val().interval);

    var addTrain = {
        name: trainName,
        loc: destination,
        first: firstTrain,
        interval: trainInterval
    }

    trainsList.push(addTrain);
    

    var currentMinute = parseInt(moment().minute());
    var nextMinute = parseInt(trainInterval);
    while(currentMinute > nextMinute){
        nextMinute += trainInterval;
    }
    
    var nextTrain = moment().add(nextMinute-currentMinute, 'minutes').format('hh:mm');

    var newTrow = $("<tr>").append( 
        $("<td>").text(trainName),
        $("<td>").text(destiation),
        $("<td>").text(trainInterval),
        $("<td>").text(nextTrain).addClass(trainName +"-next"),
        $("<td>").text(nextMinute - currentMinute).addClass(trainName+"-left")
    );

    newTrow.addClass(trainName + "-row")
    
    $("#train-list").append(newTrow);

});

setInterval(function(){
    for (i = 0; i<trainsList.length; i++){
        var currentMinute = parseInt(moment().minute());
        var nextMinute = parseInt(trainsList[i].interval);
        
        while(currentMinute > nextMinute){
            nextMinute += trainsList[i].interval;
        }

        var nextTrain = moment().add(nextMinute-currentMinute, 'minutes').format('hh:mm');
            
        $("."+trainsList[i].name + "-next").text(nextTrain);
        if(nextMinute-currentMinute === 0){
            $("."+trainsList[i].name + "-left").text("Now Boarding");
            $("."+trainsList[i].name + "-row").addClass("boarding");

        }else{
            $("."+trainsList[i].name + "-row").removeClass("boarding");
            $("."+trainsList[i].name + "-left").text(nextMinute - currentMinute);
            
        }
    }
}, 1000);