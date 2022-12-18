///////////////////////////////////
///////////////////////////////////

//main-varilables
let theInput = document.querySelector(".get-repos input"),
  getButton = document.querySelector(".get-button"),
  reposData = document.querySelector(".show-data");

  getButton.addEventListener("click", function () {
  getRepos();
});

function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username. </span>"
    alert("Please Write Github Username.");
}

else {
  fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then((res) => res.json())
    .then((repos) => {
      // empty the containers
      reposData.innerHTML = "";
      // loop in repos
      repos.forEach((repo) => {
      // create main div element
      let mainDiv = document.createElement("div");
      // craete repo name text
      let repoName = document.createTextNode(repo.name);
      // append the text in the mainDiv
      mainDiv.appendChild(repoName);

      let theUrl = document.createElement("a");
      // create repo url text
      let theUrlText  = document.createTextNode("visit");
      // append the repo url text to anchor tag
      theUrl.appendChild(theUrlText);
      // add the href
      theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
      // set attribute blank
      theUrl.setAttribute("target","_blank");
      // append url anchor to mainDiv
      mainDiv.appendChild(theUrl);
      // create star repo span
      let starSpan = document.createElement("span");
      // craete the star count text
      let starsText  = document.createTextNode(`stars ${repo.stargazers_count}`);
      // add star count text to stars span
      starSpan.appendChild(starsText);
      //append star spancount to mainDiv
      mainDiv.appendChild(starSpan);
      // add class on mainDiv
      mainDiv.className = "repo-box";
      // append the main div to the container
      reposData.appendChild(mainDiv);
      });
   });
  }
}
