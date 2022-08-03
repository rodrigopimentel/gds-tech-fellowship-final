
import {temp} from './ride.js';

const submit = document.getElementById("submitButton");

var mapCount = 0 ;


const handleInput = () => {
  var inputs = Array.from(document.querySelectorAll('#postForm input')).reduce((acc, input) => ({...acc,[input.id]: input.value}), {});
  var comment = document.querySelector("textarea").value;

  console.log(comment)
  
  
  console.log(inputs)
  console.log(temp)

  let mapName = "map" + mapCount;
  createNewPost(inputs, comment, mapName);

  console.log(mapCount)

  console.log(mapName)


  new google.maps.Map(document.getElementById("viewMap"), {
    center: temp.center,
    map : temp.map
  });

  new google.maps.Map(document.getElementById(mapName), {
    center: temp.center,
    map : temp.map
  });

  mapCount++;
  
  document.querySelector("textarea").value = "";
  document.getElementById("search").value = "";
  document.getElementById("name").value = "";
  document.getElementById("comments").value = "";
}


const createNewPost = (inputs, comments, mapName) => {


  var post = document.createElement("div");


  
  let username = document.createElement("h2");
  username.innerText = inputs.name;

  let location = document.createElement("h3");
  location.innerText = inputs.search;

  let userComment = document.createElement("p");
  userComment.innerText = comments;

  let mapDiv = document.createElement("div");
  mapDiv.setAttribute("id", mapName);
  // mapDiv.classList.add("viewMap");


  post.appendChild(username);
  post. appendChild(location);
  post.appendChild(userComment);
  post.appendChild(mapDiv);
  post.classList.add("post")
  document.querySelector(".postContainer").appendChild(post);
  



}



submit.addEventListener('click', handleInput);