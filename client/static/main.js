'use strict';

(() => {
  const MAIN = "https://api.dropboxapi.com/2/files/list_folder";
  const LINK = "https://api.dropboxapi.com/2/files/get_temporary_link";
  
  function getData(url, data) { // returns promise
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      var token = "MxDtoJnSnrAAAAAAAAAACska_fFd26wTZg4eV1WXbB1yEHNAFxwURpLI_og2y-UV";
      request.open('POST', url)
      request.setRequestHeader('Authorization', `Bearer ${token}`);
      request.setRequestHeader("Content-Type", "application/json");
      
    
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          resolve(request.response);
        }
      }

      request.onerror = () => {
        reject(request.statusText);
      }
    
      request.send(data);
    });
  }

  function initialize() {
    getData(MAIN, JSON.stringify({path: '/raheelasVideos'})).then(d => {
      let data = JSON.parse(d);
      let myStuff = data.entries;
      let links = [];
      for (let i = 0; i < myStuff.length; i++) {
        links.push(getData(LINK, JSON.stringify({path: myStuff[i].path_display})));
      }
      return new Promise((resolve, reject) => {
        Promise.all(links).then(val => {
          resolve(val);
        })
      })
    })
    .then(data => {
      let d = data.map(it => JSON.parse(it));
      return d;
    })
    .then(parsedData => {
      let container = document.getElementById("main");
      for (let i = 0; i < parsedData.length; i++) {
        let video = document.createElement("video");
        video.setAttribute("src", parsedData[i].link);
        container.append(video); 
      }
    })
    .catch(e => console.warn("error", e));
  }
  initialize();
})()
