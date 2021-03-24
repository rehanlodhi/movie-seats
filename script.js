const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const selectMovie = document.getElementById('movie')

populateUI()

let ticketPrice = +selectMovie.value


//Functions
function setMovieData(movieIndex, priceIndex){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedPriceIndex', priceIndex)
}

function updateCountAndPrice(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatCount = selectedSeats.length
    const totalPrice = selectedSeatCount * ticketPrice

    //To save in local storage we need an index of selected seat with the help of "spread operator"
    //array can't be stored in local storage directly
    const seatsIndex = [...selectedSeats].map(seat=> [...seats].indexOf(seat))
    localStorage.setItem('selectedSeatIndex', JSON.stringify(seatsIndex))

    count.innerText = selectedSeatCount
    total.innerText = totalPrice

}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeatIndex'))
    if (selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if (selectedMovieIndex !== null){
        selectMovie.selectedIndex = selectedMovieIndex
    }
}

//Change Event
selectMovie.addEventListener('change', e=>{
    ticketPrice = e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateCountAndPrice()
})

//Click Event
container.addEventListener('click', (e)=>{
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateCountAndPrice()
    }
})
updateCountAndPrice()