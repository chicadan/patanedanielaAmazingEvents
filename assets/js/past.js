
async function bringData() {
    try {
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        console.log(response)
        const data = await response.json()
        console.log(data)
        const events = data.events
        console.log(events)

        const pastEvents = events.filter(element => new Date(element.date) < new Date(data.currentDate))
        console.log(pastEvents)

        let inputsChecked = []
        let checkInfo = ""

        addCardsjs(pastEvents, 'cardGroupPast');


        const checkjs = document.getElementById('cardGroupPast');

        let uniqueCat = []

        let categories = events.map(events => !uniqueCat.includes(events.category) ? uniqueCat.push(events.category) : false);
        
        addCheckjs(uniqueCat)
        addSearchjs()

        let checkCategories = document.querySelectorAll('input[type=checkbox]')
        console.log(checkCategories)
        checkCategories.forEach(check => check.addEventListener('change', checkClick))

        function checkClick() {
            inputsChecked = Array.from(checkCategories).filter(checkCategories => checkCategories.checked).map(input => input.value)
            console.log(inputsChecked);//array strings
            crossFilter(pastEvents)
        }

        let checkInput = document.querySelector('button[type=button]')

        checkInput.addEventListener('click', checkEnter)

        function checkEnter(e) {
            let inputInfo = document.querySelector('input[type=text]')
            checkInfo = inputInfo.value //imprime info
            console.log(checkInfo)
            crossFilter(pastEvents)
        }

        function crossFilter(arrayObject) {
            let arrayCheck = compareAndFilter(inputsChecked, arrayObject)
            let arraySearch = compareAndFilter2(checkInfo, arrayCheck)
            addCardsjs(arraySearch,  'cardGroupPast')
        }

    }
    catch (error) {
        alert("DETECTED ERROR")
    }
}

bringData()


//CARDS

//Cards Dinamicas//

function addCardsjs(arrayCard, idContainer) {
    const cardjs = document.getElementById(idContainer)
    cardjs.innerHTML = ''

    if (arrayCard.length == 0) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.style.width = "20rem";
        card.innerHTML = `<h5 class="card-text text-center p-3"> You must adjust the search to find the events</h5>`;
        cardjs.appendChild(card);
    } else {
        let fragment = document.createDocumentFragment();
        for (let value of arrayCard) {
            let nuevoDiv = document.createElement('div');
            nuevoDiv.classList.add("cardjs");
            nuevoDiv.style.width = "20rem";
            nuevoDiv.innerHTML = `<img src= ${value.image} class="card-img-top p-2" alt="${value.name}">
            <div class="card-body">
                <h5 class="card-title fw-bold text-center p-1">${value.name}</h5>
                <p class="card-text text-center p-3">${value.description}</p>
                    <div class="cardBottom d-flex justify-content-between p-3">
                        <p>Price: $ ${value.price}-</p>
                        <a href="details.html?id=${value._id}" class="btn btn-danger">View more...</a>
                    </div>
            </div>`;
            fragment.appendChild(nuevoDiv);
        }
        cardjs.appendChild(fragment);
    }
}



//CHECKBOX

//Checkboxes Dinamico//   

function addCheckjs(array) {

    let fragment = document.createDocumentFragment();

    for (let unique of array) {

        let nuevoDiv = document.createElement('div');
        nuevoDiv.classList.add("form-checkjs");
        nuevoDiv.style.padding = "1rem";
        nuevoDiv.innerHTML = ` 
            <label class="form-check-label"> ${unique}
                <input class="form-check-input" type="checkbox"  value="${unique}" name="" id="${unique}">
            </label>`
        fragment.appendChild(nuevoDiv);
    }

    checkGroupPast.appendChild(fragment);

}


function compareAndFilter(arrayString, arrayObject) {
    return arrayString.length === 0 ? arrayObject : arrayObject.filter(event => arrayString.includes(event.category))
}

//SEARCH

//Fitrado de Nombre del Evento//

const searchjs = document.getElementById("searchGroupPast");


//Search Dinamico //

function addSearchjs() {

    let fragment = document.createDocumentFragment();

    let nuevoDiv = document.createElement('div');
    nuevoDiv.classList.add("searchjs");
    nuevoDiv.style.padding = "1rem";
    nuevoDiv.innerHTML = `
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" >
            <button class="btn btn-outline-danger" type="button" id="button-addon2"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></button>
        </div>`;

    fragment.appendChild(nuevoDiv);

    searchGroupPast.appendChild(fragment);

}

function compareAndFilter2(value, arrayObject) {
    if (value == '') return arrayObject
    return arrayObject.filter(event => (event.name.toLowerCase()).includes(value.toLowerCase().trim()))
}
