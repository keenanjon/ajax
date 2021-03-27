'use strict';
const jorma = document.getElementById('hakumeininki');
const form = document.querySelector('#search-form');
const tuloskentta = document.getElementById('tahan_tulokset');
//const input = document.getElementById('hakuteksti');
jorma.appendChild(form);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  haeTiedot();
});

function haeTiedot() {
  let haettava = document.querySelector('input[name=search-field]').value;
  let haku = 'http://api.tvmaze.com/search/shows?q=' + haettava;

  if ((document.getElementById('leffat')) != null) {
    const roskiin = document.getElementById('leffat');
    roskiin.remove();
  }

  fetch(haku).then(response => response.json()).then(data => {
    const all = data;
    const vonBagh = document.createElement('div');
    vonBagh.id = 'leffat';
    for (let i = 0; i < all.length; i++) {

      if ((all[i].show.name) != null) {
        let h4 = document.createElement('h4');
        h4.innerText = all[i].show.name;
        vonBagh.appendChild(h4);
      }

      let img = document.createElement('img');
      img.src = all[i].show.image ? all[i].show.image.medium : 'avaruutta_1v2.png';
      vonBagh.appendChild(img);


      if ((all[i].show.genres) != null) {
        let p = document.createElement('p');
        p.innerText = all[i].show.genres;
        vonBagh.appendChild(p);
      }

      if ((all[i].show.officialSite) != null) {
        let a = document.createElement('a');
        a.text = all[i].show.officialSite;
        a.href = all[i].show.officialSite;
        a.target = 'blank';
        vonBagh.appendChild(a);
      }

      if ((all[i].show.summary) != null) {
        let p2 = document.createElement('p');
        p2.innerHTML = all[i].show.summary;
        vonBagh.appendChild(p2);
      }

      let hr = document.createElement('hr');
      vonBagh.appendChild(hr);
      tuloskentta.appendChild(vonBagh);
      jorma.appendChild(tuloskentta);
    }

  }).catch(error => console.error(error));
}
