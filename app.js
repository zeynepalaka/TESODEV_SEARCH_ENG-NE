const input = document.getElementById('input');
const matchList = document.getElementById('match-list');

const searchStates = async searchText => {
    const res = await fetch('./mockData.json');
    const states = await res.json();

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });
    if (searchText.length == 0) {
        matches = []
    }

    outputHtml(matches);
};

//show html
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div class="searchjs search border-bottom list-group">
        <h4>${match.name}(${match.abbr}) 
        <span class="text-primary">
        ${match.capital}</span></h4>
        <small>Lat: ${match.lat} /Long: ${match.long}</small>
        </div>
        `)
            .join('');

        matchList.innerHTML = html;
    }
};
input.addEventListener('input', () => searchStates(input.value));

///////

