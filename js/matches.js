function hasilMatch(data) {
  let dataMatchesHtml2 = '';
  let dataMatchesHtml = '';
  let match = data.matches;

  for (let i = 1; i <= 25; i++) {
    dataMatchesHtml += `
    <div class="col s6">
          <div class="card">
            <div class="card-content flow-text">
              <img class="hide-on-small-only" src="../asset/matchesInside.png" style="width: 25%;margin-left: 50%; transform: translateX(-50%);">
              <img class="show-on-small hide-on-med-only hide-on-med-and-up" src="../asset/matchesInside.png" style="width: 35%;margin-left: 50%; transform: translateX(-50%);">
              <div class="center-align"><h5 style="margin-top: 0 !important">Match: ${match[i].matchday}</h5></div>
              <div id="kickOff" class="center-align">${convertUTCDate(new Date(match[i].utcDate))}</div>

              <div class="row" style="margin:20px">
                <div class="col s5 right-align hide-on-small-only">
                  <span id="homeTeamName" class="blue-text text-darken-2">${match[i].homeTeam.name}</span>
                </div>
                <div class="col s2 center-align hide-on-small-only">
                  VS
                </div>
                <div class="col s5 left-align hide-on-small-only">
                  <span id="awayTeamName" class="blue-text text-darken-2">${match[i].awayTeam.name}</span>
                </div>

                <div class="center-align hide-on-med-only hide-on-med-and-up show-on-small"><span id="homeTeamName" class="blue-text text-darken-2">${match[i].homeTeam.name}</span></div>
                <div class="center-align hide-on-med-only hide-on-med-and-up show-on-small">
                    VS
                  </div>
                <div class="center-align hide-on-med-only hide-on-med-and-up show-on-small"><span id="homeTeamName" class="blue-text text-darken-2">${match[i].awayTeam.name}</span></div>

              </div>

            </div>
          </div>
    </div>
      `;

  }

  // Sisipkan komponen card ke dalam elemen
  document.getElementById("divMatches").innerHTML = dataMatchesHtml;
}