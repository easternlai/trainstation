  // Your web app's Firebase configuration

  // Your web app's Firebase configuration
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

    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var trainInterval = $("#train-interval").val().trim();

    var addTrain = {
        name: trainName,
        loc: destination,
        first: firstTrain,
        interval: trainInterval
    }

    database.ref().push(addTrain);

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#train-interval").val("");

    console.log(addTrain);
});

database.ref().on("child_added", function(snapshot){
    var trainName = snapshot.val().name;
    var destiation = snapshot.val().loc;
    var firstTrain = snapshot.val().first;
    var trainInterval = snapshot.val().interval;

});

