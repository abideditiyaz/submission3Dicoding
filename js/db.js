function databasePromise(idb) {
    let dbPromise = idb.open("db_pwasepakbola", 1, function (upgradeDb) {
        upgradeDb.objectStoreNames.contains("tim_favorit")
            let indexTimFav = upgradeDb.createObjectStore("tim_favorit", {
                keyPath: "id"
            });
            indexTimFav.createIndex("namaTim", "name", {
                unique: false
            });
    
    });

    return dbPromise;
}

function cekData(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve("data favorit")
                } else {
                    reject("bukan data favorit")
                }
            });
    });
}

function createDataFav(dataType, data) {
	let storeName = "";
	let dataCreate = {}
	if (dataType == "tim") {
		storeName = "tim_favorit"
        dataCreate = {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            tla: data.tla,
            crestUrl: data.crestUrl,
            address: data.address,
            phone: data.phone,
            website: data.website,
            email: data.email,
            founded: data.founded,
            clubColors: data.clubColors,
            venue: data.venue,
            squad: data.squad
        }
	}
    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(dataCreate);

        return tx.complete;
    }).then(function () {
        console.log('tim berhasil disimpan.');
        document.getElementById("save").innerHTML = `
        <div id="save" class="fixed-action-btn">
        <a class="btn-floating btn-large">
          <i class="medium material-icons">delete</i>
        </a>
      </div>`;
        M.toast({
            html: 'Data berhasil difavoritkan!'
        });
    }).catch(function () {
        M.toast({
            html: 'terjadi kesalahan'
        });
    });
}

function deleteDatafav(storeName, data) {
    databasePromise(idb).then(function (db) {
        let tx = db.transaction(storeName, 'readwrite');
        let store = tx.objectStore(storeName);
        store.delete(data);
        return tx.complete;
    }).then(function () {
        console.log('Item deleted');
        document.getElementById("save").innerHTML = `
        <div id="save" class="fixed-action-btn">
        <a class="btn-floating btn-large blue-grey darken-3">
          <i class="medium material-icons">archive</i>
        </a>
      </div>`;
        M.toast({
            html: 'Data berhasil dihapus dari favorit!'
        });
    }).catch(function () {
        M.toast({
            html: 'terjadi kesalahan'
        });
    });
}

function getSavedDataById(dataType) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = Number(urlParams.get("id"));

    dataType == "tim"
        let dataSquadHTML = ''
        let tabelSquadHTML = ''
        getDataById("tim_favorit", idParam).then(function (tim) {
            // console.error("getSavedTimById: " + tim);
            resultDetailTimJSON(tim)
            dataTeamJSON = tim;
            tim.squad.forEach(function (squad) {
                dataSquadJSON = squad;
                dataSquadHTML += `
         <tr>
           <td >${squad.name}</td>
           <td >${squad.position}</td>
         </tr>
        `
            });
            tabelSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`

            document.getElementById("squad").innerHTML = tabelSquadHTML;
        })
}

function getDataById(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function getAllData(storeName) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function setupDataFavHtml(dataType) {

    dataType == "tim"
        getAllData("tim_favorit").then(function (data) {
            resultTeamFav(data);
        });
}