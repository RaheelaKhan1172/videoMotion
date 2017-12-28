'use strict';

(() => {
  // make request to static directory, and get the videos 
  function getData() { // returns promise
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', 'http://localhost:8000/')
    
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          resolve(request.response);
        }
      }

      request.onerror = () => {
        reject(request.statusText);
      }
    
      request.send();
    });
  }

  function initialize() {
    //getData()
    
    let container = document.getElementById("main");
    for (let i = 0; i < 10; i++) { // replace with data
      let div = document.createElement("div");
      div.setAttribute("class", "item");
      
      container.appendChild(div);
    }
  }
  initialize();
})()
