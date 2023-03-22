async function bringData() {
  try {
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
    const data = await response.json()
    const events = data.events

    const table = document.getElementById("tableGroup1")
    addTablejs(events, table)

    let filAssis = events.filter(event => event.assistance)
    let filEstim = events.filter(event => event.estimate)
    addTablejs23(filEstim, tableGroup2)
    addTablejs23(filAssis, tableGroup3)


    function addTablejs(array, container) {

      let attendanceHigh = array.filter(event => event.assistance).reduce((event1, event2) =>
        (event1.assistance / event1.capacity) > (event2.assistance / event2.capacity) ? event1 : event2
      )

      let attendanceLow = array.filter(event => event.assistance).reduce((event1, event2) =>
        (event1.assistance / event1.capacity) < (event2.assistance / event2.capacity) ? event1 : event2
      )

      let capacityLarger = array.reduce((event1, event2) => (event1.capacity >= event2.capacity) ? event1 : event2
      )

      let nuevotr = document.createElement('tr')
      nuevotr.innerHTML = `
                <td><b>${attendanceHigh.name}:</b> ${(attendanceHigh.assistance / attendanceHigh.capacity * 100).toFixed(2)} %</td>
                <td><b>${attendanceLow.name}:</b> ${(attendanceLow.assistance / attendanceLow.capacity * 100).toFixed(2)} %</td>
                <td><b>${capacityLarger.name}:</b> ${capacityLarger.capacity}</td>`

      container.appendChild(nuevotr)
    }

    function revenues(array, categoriesName) {

      let byCategory = array.filter(event => event.category == categoriesName)
      let byEvents = byCategory.reduce((suma, event) => event.assistance != undefined ? suma += event.assistance * event.price : suma += event.estimate * event.price, 0)
      return byEvents
    }

    function attendancePer(array, categoriesName) {

      let byCategory = array.filter(event => event.category == categoriesName)
      let byEvents = byCategory.reduce((total, event) => event.assistance != undefined ? total += (event.assistance / event.capacity) * 100 : total += (event.estimate / event.capacity) * 100, 0)
      return (byEvents / byCategory.length).toFixed(2)
    }

    function addTablejs23(array, container) {

      let categories = [... new Set(array.map(event => event.category))]
      let fragment = document.createDocumentFragment()

      for (let category of categories) {
        let nuevotr = document.createElement('tr')
        nuevotr.innerHTML = `
                      <td><b>${category}</b></td>
                      <td> &#36 ${revenues(array, category)}</td>
                      <td>${attendancePer(array, category)} %</td>`

        fragment.appendChild(nuevotr)
      }
      container.appendChild(fragment)

    }

  }
  catch (error) {
    alert("DETECTED ERROR")
  }
}

bringData()





