'use strict';

function gotData(data) {
  //seed array (uncomment on first time initializing database only)
  //seedDatabase(fortunes);

  // need to retrieve firebase data with val() method
  // this returns an object of all data
  fbData = data.val();

  if (fbData) { // check to see if there is something in your database to start
    console.log('received data:');
    console.log(fbData);

    // create an array of the post values (if you need to loop through it retaining order of entries)
    fbDataArray = Object.values(fbData);
    console.log(fbDataArray);
  } else {
    console.log('nothing in this folder yet');
  }
}


function errData(err) {
  console.log("error! did not receive data");
  console.log(err);
}

// create a new node
// the node folder name, id, and object are all passed in as parameters

function createNode(_nodeFolder, _nodeID, _nodeObject) {
firebase.database().ref(_nodeFolder + '/' + _nodeID).set(_nodeObject);

// call this function to create and seed the folder!
// createNode(folderName, "seed", {text: "this is to seed folder"});
// (to test you can just paste it into the web console)

// the update method will update an existing node

function updateNode(_nodeFolder, _nodeID, _updateObject) {
firebase.database().ref(_nodeFolder + '/' + _nodeID).update(_updateObject);
// this will update existing key:value pair(s) OR add new ones to your object
// so your object might look like:
// { existingKey: updatedKeyValue,
//   newKey: newValue }
// Where the existing key is updated and newKey is added
}

// And this removes an entire node from your folder

function deleteNode(_nodeFolder, _nodeID) {
firebase.database().ref(_nodeFolder + '/' + _nodeID).remove();
}



}


function seedDatabase(_array){

  _array.forEach(function(item){
    //first, assign timestamp for the messages
    //we sill use this both for message Id and include it in message obj itself
    // *** it may be redundant but helps when updating the message values
    let timestamp = Date.now(); //milliseconds since midnight of Jan 1, 1970 (beginning of time)

    //note: console functions on the global scope... therefore timestamp does not appear on console

    //first, create obj of messageData
    nodeData = {
      messageText: item,
      timestamp: timestamp, //trailing , at the end is okay
      received: false,
    }

    //push to firebase!!
    createNode(folderName, timestamp, nodeData);
  })



}
