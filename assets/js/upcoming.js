let referenceString = (data.currentDate)
let dateReference = new Date ((referenceString))

const cardjs = document.getElementById(cardGroup)

let fragment = document.createDocumentFragment()


for(let value of data.events){

    let dateString = (value.date)
    let dateDate = new Date ((dateString))

    if (dateDate > dateReference) {
        let nuevoDiv = document.createElement('div')
            nuevoDiv.classList.add("cardjs")
            nuevoDiv.style.width = "20rem"
            nuevoDiv.innerHTML = `<img src= ${value.image} class="card-img-top p-2" alt="${value.name}">
            <div class="card-body">
                <h5 class="card-title fw-bold text-center p-1">${value.name}</h5>
                <p class="card-text text-center p-3">${value.description}</p>
                    <div class="cardBottom d-flex justify-content-between p-3">
                        <p>Price: $ ${value.price}-</p>
                        <a href="details.html" class="btn btn-danger">View more...</a>
                    </div>
            </div>`
            fragment.appendChild(nuevoDiv)
    }
}
cardGroup.appendChild(fragment)

