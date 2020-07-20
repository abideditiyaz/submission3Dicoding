let api_token = 'ee6555ddd77f4823ae25c1393c407bf5'
let kode_liga = 2014;
let base_url = "https://api.football-data.org/v2/";
let endpoint_tim = `${base_url}teams/`
let endpoint_pemain = `${base_url}players/`
let endpoint_klasemen = `${base_url}competitions/${kode_liga}/standings?standingType=TOTAL`
let endpoint_pertandingan_upcoming = `${base_url}competitions/${kode_liga}/matches?status=SCHEDULED`

const fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token
    }
  });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function klasemenDataLiga() {
  if ('caches' in window) {
    caches.match(endpoint_klasemen).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          klasemenData(data);
        });
      }
    });
  }

  fetchApi(endpoint_klasemen)
    .then(status)
    .then(json)
    .then(function (data) {
      // console.log(data)
      // console.log(data)
      klasemenData(data)
    })
    .catch(error);
}

function matchID() {
  return new Promise(function (resolve, reject) {

    if ('caches' in window) {
      caches.match(endpoint_pertandingan_upcoming).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            hasilMatch(data);
            resolve(data);
          });
        }
      });
    }

    fetchApi(endpoint_pertandingan_upcoming)
      .then(status)
      .then(json)
      .then(function (data) {
        hasilMatch(data);
        resolve(data);
      })
      .catch(error);
  });
};

function getDetailKlubById() {
  return new Promise(function (resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    let dataSquadHTML = ''
    let tabelSquadHTML = ''
    if ("caches" in window) {
      caches.match(endpoint_tim + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultDetailTimJSON(data)
            data.squad.forEach(function (squad, index) {
              dataSquadJSON = squad;
              dataSquadHTML += `
                <tr>
                <td>${squad.name}</td>
                <td >${squad.position}</td>
                </tr>
                `
            });
            tabelSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`

            document.getElementById("squad").innerHTML = tabelSquadHTML;
            resolve(data);
          });
        }
      });
    }

    fetchApi(endpoint_tim + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // console.log(data);
        resultDetailTimJSON(data)
        dataTeamJSON = data;
        data.squad.forEach(function (squad, index) {
          dataSquadJSON = squad;
          // console.log("cek squad name: " + squad.name);
          // console.log("cek squad position: " + squad.position);
          dataSquadHTML += `
      <tr>
        <td>${squad.name}</td>
        <td >${squad.position}</td>
      </tr>
     `
        });
        tabelSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`

        document.getElementById("squad").innerHTML = tabelSquadHTML;
        resolve(data);
      })
      .catch(error);
  });
};