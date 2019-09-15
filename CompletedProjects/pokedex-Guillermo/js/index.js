//Get array of Nodes with class 'row'
let row = document.getElementsByClassName('row')[0];

let typeMappings = {
    Normal: 'type-normal',
    Fire: 'type-fire',
    Water: 'type-water',
    Electric: 'type-electric',
    Grass: 'type-grass',
    Ice: 'type-ice',
    Fighting: 'type-fighting',
    Poison: 'type-poison',
    Ground: 'type-ground',
    Flying: 'type-flying',
    Psychic: 'type-psychic',
    Bug: 'type-bug',
    Rock: 'type-rock',
    Ghost: 'type-ghost',
    Fairy: 'type-fairy',
    Dragon: 'type-dragon',
    Dark: 'type-dark',
    Steel: 'type-steel'
};

function loadPokemon(name, id, types) {
    row.innerHTML +=
        `<div class="col-md-4 col-sm-6 col-xs-12 bottom"> \
        <div class="jumbotron"> \
            <img \
                src="./Database/thumbnails/${id}.png" \
                class="card-img rounded" \
                alt="..." \
            /> \
            <div class=""> \
                <p>#${
                    id < 10 ? '00' + id : id > 10 && id < 100 ? '0' + id : id
                }</p>
                <p class="">${name}</p> \
                <hr>` +
        types.map(type => type).join('') +
        '</div> \
                </div> \
                </div>';
}

function createTypeLabels(types) {
    let result = [];
    for (var i = 0; i < types.length; i++) {
        result.push(
            `<span class="badge ${typeMappings[types[i]]} mr-1">${
                types[i]
            }</span>`
        );
    }
    return result;
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType('application/json');

    xobj.open('GET', './Database/pokedex.json', true); // Replace 'my_data' with the path to your file

    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function hideLoading() {
    let loading = document.getElementsByClassName('loading')[0];
    loading.classList.add('hide-loading');
}

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
        hideLoading();
        actual_JSON.map(pokemon => {
            loadPokemon(
                pokemon.name.english,
                pokemon.id,
                createTypeLabels(pokemon.type)
            );
        });
    });
}

init();
