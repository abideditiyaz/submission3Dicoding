function resultTeamFav(data) {

    let dataTeamFavHtml = ''
    data.forEach(function (team) {

        dataTeamFavHtml += `
        
          <div class="card">
        
          <div class="card-content">
          <div class="center-align">
            <a href="./details.html?id=${team.id}">
              <img style="width: 35%" src=${team.crestUrl}  alt="logo club">
              <h5 class="center-align">
               <span class="blue-text text-darken-2">  
               ${team.name}
               </span>
              </h5>
            </a>  
          </div>
          </div>
          </div>
        
        `
    });

    document.querySelector('#favPage').innerHTML = dataTeamFavHtml;
}