
import {temp} from './ride.js';

const submit = document.getElementById("submitButton");



const handleInput = () => {
  var inputs = Array.from(document.querySelectorAll('#postForm input')).reduce((acc, input) => ({...acc,[input.id]: input.value}), {});

  console.log(inputs)
  console.log(temp)

 
  new google.maps.Map(document.getElementById("viewMap"), {
    center: temp.center,
    map : temp.map
  });

  document.getElementById("search").value = "";
  document.getElementById("name").value = "";
  document.getElementById("comments").value = "";
}


submit.addEventListener('click', handleInput);