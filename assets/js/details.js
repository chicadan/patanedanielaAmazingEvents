async function bringData() {
    try {
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        const data = await response.json()
        const events = data.events

        const id = new URLSearchParams(location.search).get("id")

        const eventid = events.find(element => element._id == id)

        displayCardDetails(eventid, 'detailsGroup')

    }
    catch (error) {
        alert("DETECTED ERROR")
    }
}

bringData()


function displayCardDetails(eventObject, idContainer) {

    const detailsjs = document.getElementById(idContainer)

    let nuevoDiv = document.createElement('div');
    nuevoDiv.className = "cardDetails d-flex justify-content-center p-2";
    nuevoDiv.style.width = "36rem"
    nuevoDiv.innerHTML = `<div class="card">
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
                    <li class="list-group-item"><b>${eventObject.assistance == undefined ? "Estimate" : "Assistance"}</b> ${eventObject.assistance ? eventObject.assistance : eventObject.estimate}</li>
                    <li class="list-group-item"><b>Price: &#36</b> ${eventObject.price}.-</li>
                </ul>
            </div>`;

    detailsjs.appendChild(nuevoDiv)
}




