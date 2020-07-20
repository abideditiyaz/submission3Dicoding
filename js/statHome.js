function klasemenData(data) {
  let tabelKlasemenHtml = ''
  data.standings.forEach(function (klasemen) {
    let dataTabelKlasemen = '';

    klasemen.table.forEach(function (club) {
      club = JSON.parse(JSON.stringify(club).replace(/http:/g, 'https:'));

      dataTabelKlasemen += `<tr>
        <td class="center-align">${club.position}</td>
        <td>
        <p class="hide-on-small-only">
        <img class = "show-on-medium-and-up show-on-medium-and-down" src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
        ${club.team.name}
        </p>
        <p class="hide-on-med-and-up">
        <img src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
        </p>
        </td>
        <td class="center-align">${club.playedGames}</td>
        <td class="center-align">${club.won}</td>
        <td class="center-align">${club.draw}</td>
        <td class="center-align">${club.lost}</td>
        <td class="center-align">
        <div class="btn blue-grey lighten-5">
          <a href="./details.html?id=${club.team.id}">
            <i class="small material-icons">directions</i>
          <a>
        </div>
        </td>
      </tr>`

    })

    tabelKlasemenHtml += `
      

      <div class="card">
      <div class="card-content">
        <h4 class="center-align hide-on-med-and-down show-on-medium">Last Update: ${convertUTCDate(new Date(data.competition.lastUpdated))}</h4>
        <div class="center-align" style="margin: 25px 0">
            <span class="blue-grey darken-2 waves-light btn hide-on-med-and-up show-on-small">Last Update </span>
            <span class="blue-grey darken-1 waves-light btn hide-on-med-and-up show-on-small">${convertUTCDate(new Date(data.competition.lastUpdated))}</span>
        </div>
        <hr size="5px" class="hide-on-med-and-down">
      <table class="responsive-table striped " >
      <thead>
        <tr>
          <th class="center-align">Position</th>
          <th>Team</th>
          <th class="center-align">Played</th>
          <th class="center-align">Won</th>
          <th class="center-align">Draw</th>
          <th class="center-align">Lost</th>
        </tr>
      </thead>
      <tbody>` + dataTabelKlasemen + `</tbody>
      </table>
    
      </div>
      </div>

    `

  });

  document.getElementById("tabelKlasemen").innerHTML = tabelKlasemenHtml;
}

// <div class="btn blue-grey lighten-5">
//           <a id="save">
//           <i class="small material-icons">archive</i>
//           </a>
//         </div>