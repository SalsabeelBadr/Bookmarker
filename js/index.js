var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var submitButton = document.getElementById("submitButton");
var nameAlert = document.getElementById("nameAlert");
var urlAlert = document.getElementById("urlAlert");
var urlList = [];
var nameRegex = /^[A-Z ?a-z]{5,20}$/;
var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

if (localStorage.getItem("urlArray") != null) {
    urlList = JSON.parse(localStorage.getItem("urlArray"));
    displayUrl();
}

siteNameInput.addEventListener("blur", function() {
  if (siteNameInput.value.length < 5 || siteNameInput.value.length > 20) {
      nameAlert.classList.remove("d-none");  
  } else {
      nameAlert.classList.add("d-none");  
  }
});

siteNameInput.addEventListener("input", function() {
  nameAlert.classList.add("d-none");  
});

siteUrlInput.addEventListener("blur", function() {
  if (!urlRegex.test(siteUrlInput.value)) {
      urlAlert.classList.remove("d-none");  
  } else {
      urlAlert.classList.add("d-none");  
  }
});

siteUrlInput.addEventListener("input", function() {
  urlAlert.classList.add("d-none");  
});

function addSite() {
  var site = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
  };

  if (isDuplicateSite(site.siteName, site.siteUrl)) {
      alert("The site name or URL already exists. Please choose a different name or URL.");
  } else if (!onInputName() || !onInputUrl()) {
      alert("Please enter a valid site name and URL.");
  } else {
      urlList.push(site);
      localStorage.setItem("urlArray", JSON.stringify(urlList));
      displayUrl();
      clearForm();
      siteNameInput.classList.remove("is-valid");
      siteUrlInput.classList.remove("is-valid");
  }
}

function isDuplicateSite(siteName, siteUrl) {
  for (var i = 0; i < urlList.length; i++) {
      if (urlList[i].siteName.toLowerCase() === siteName.toLowerCase() || urlList[i].siteUrl === siteUrl) {
          return true; 
      }
  }
  return false; 
}


function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function displayUrl() {
    var urlSite = "";
    for (var i = 0; i < urlList.length; i++) {
        urlSite += `        
        <tr>
        <td>${i+1}</td>
        <td>${urlList[i].siteName}</td>
        <td><a target="_blank" href='${urlList[i].siteUrl}'>
        <button id="visitSite" class="btn btn-visit">
            <i class="fa-regular fa-eye"></i>
            Visit
        </button></a></td>
        <td><button onclick="deleteItem(${i})" id="deleteSite" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
            Delete
        </button></td>
        </tr>
        `;
    }
    document.getElementById("showItems").innerHTML = urlSite;
}

function deleteItem(index) {
    urlList.splice(index, 1);
    localStorage.setItem("urlArray", JSON.stringify(urlList));
    displayUrl();
}

function onInputName() {
    if (nameRegex.test(siteNameInput.value) == true) {
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        return true;
    } else {
        siteNameInput.classList.remove("is-valid");
        siteNameInput.classList.add("is-invalid");
        return false;
    }
}

function onInputUrl() {
    if (urlRegex.test(siteUrlInput.value) == true) {
        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
        return true;
    } else {
        siteUrlInput.classList.remove("is-valid");
        siteUrlInput.classList.add("is-invalid");
        return false;
    }
}
