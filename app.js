const container = document.querySelector(".container");
const count = document.querySelector(".count")
const amount = document.querySelector("#amount")
const select = document.getElementById("movie")
const seats = document.querySelectorAll(".seat:not(.reserved)")

getFromLocalStorage()
calculateTotal()

container.addEventListener("click",(e)=>{

    if(e.target.classList.contains("seat") && !e.target.classList.contains("reserved")){

        e.target.classList.toggle("selected");

        calculateTotal()

    }

})

select.addEventListener("change",(e) =>{

    calculateTotal()

})

function calculateTotal(){

    const selectedSeats = container.querySelectorAll(".seat.selected")

    let selectedSeatCount = selectedSeats.length

    count.innerText = selectedSeatCount

    amount.innerHTML = selectedSeatCount * select.value

    const selectedSeatsArr = [];
    const seatsArr = []

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat)
    })

    seats.forEach(function(seat){

        seatsArr.push(seat);

    })

    let selectedSeatIndexes = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat)
    })

    savetoLocalStorage(selectedSeatIndexes)

}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

    if(selectedSeats != null && selectedSeats.length > 0 ){

        seatsforEach(function(seat,index){

            if(selectedSeats.indexOf(index) > -1){

                seat.classList.add("selected")

            }

        })

    }


    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex")

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex
    }

}

function savetoLocalStorage(indexes){

    localStorage.setItem("selectedSeats", JSON.stringify(indexes))

    localStorage.setItem("selectedMovieIndex", select.selectedIndex)

}