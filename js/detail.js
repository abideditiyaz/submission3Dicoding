function resultDetailTimJSON(data) {
  data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));
  const isiDets = `
      <table>
        <tbody>
          <tr>
            <td style="font-weight: bold;">Name:</td>
            <td id="name">${data.name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Short Name:</td>
            <td id="shortName">${data.shortName}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Tla:</td>
            <td id="tla">${data.tla}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Address:</td>
            <td id="address">${data.address}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Phone:</td>
            <td id="phone">${data.phone}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Website:</td>
            <td id="website"><span class="blue-grey lighten-2 waves-light btn"><a href="${data.website}" target="_blank" style="color: white">Click</a></span></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Email:</td>
            <td class="hide-on-small-only" id="email">${data.email}</td>
            <td class="hide-on-med-and-up show-on-small" id="email" style="font-size: 10px">${data.email}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Founded:</td>
            <td id="founded">${data.founded}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Club Colors:</td>
            <td id="clubColors">${data.clubColors}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Venue:</td>
            <td id="venue">${data.venue}</td>
          </tr>
        </tbody>
      </table>
  `;
  document.querySelector('#namaKlub').innerHTML = data.name;
  document.querySelector('#logoKlub').src = data.crestUrl;
  // isi table
  console.log(data.email)
  document.querySelector('#overview').innerHTML = isiDets;
}