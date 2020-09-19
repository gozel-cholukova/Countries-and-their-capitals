const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//search states.json and filter it
const searchCountries = async searchText => {
  const res = await fetch('./data/countries.json');
  const countries = await res.json();

  //get matches to current text input
  let matches = countries.filter(country => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return country.name.match(regex) || country.abbr.match(regex);
  });

  if(searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }


  outputHtml(matches);
};

//show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches.map(
      match => `
      <div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr})  <span class="text-primary">${match.capital}</span></h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
      </div>
    `
    ).join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchCountries(search.value));