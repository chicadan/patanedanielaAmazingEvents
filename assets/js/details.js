
const id = new URLSearchParams(location.search).get("id")
console.log(id)

const eventObject = data.events.find(element => element._id == id)
console.log(eventObject)


function displayCardDetails(idContainer) {

    const detailsjs = document.getElementById(idContainer)

    let nuevoDiv = document.createElement('div');
            nuevoDiv.className = "cardDetails d-flex justify-content-center p-5" ;
            nuevoDiv.style.width = "38rem"
            nuevoDiv.innerHTML = `<div class="card" style="width: 38rem">
                <img src="${eventObject.image}" class="card-img-top p-2" alt="${eventObject.name}">
                <div class="card-body p-0">
                    <h5 class="card-title fw-bold text-center">${eventObject.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Date:</b> ${eventObject.date}</li>
                    <li class="list-group-item"><b>Description:</b> ${eventObject.description}</li>
                    <li class="list-group-item"><b>Category:</b> ${eventObject.category}</li>
                    <li class="list-group-item"><b>Place:</b> ${eventObject.place}</li>
                    <li class="list-group-item"><b>Capacity:</b> ${eventObject.capacity}</li>
                    <li class="list-group-item"><b>Assistance or estimate:</b> ${eventObject.assistance ? eventObject.assistance : eventObject.estimate}</li>
                    <li class="list-group-item"><b>Price: &#36</b> ${eventObject.price}.-</li>
                </ul>
            </div>`;
            
    detailsjs.appendChild(nuevoDiv)
}

displayCardDetails('detailsGroup')



