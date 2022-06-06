const draggable_list = document.querySelector('.draggable-list')
const check = document.getElementById('check')

const cryptoCoins = [
  'Bitcoin',
  'Ethereum',
  'Tether',
  'USD Coin',
  'Binance Coin'
]

// store coin items
const coinItems = []

// move our list items to a differnt index
let dragStartIndex

createLists()

// function to insert items
function createLists() {
  ;[...cryptoCoins]
    .map((c) => ({ value: c, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((c) => c.value)

    .forEach((coin, index) => {
      const cryptoCoin = document.createElement('li')

      // console.log(coin)

      // cryptoCoin.classList.add('over')

      cryptoCoin.setAttribute('coin-index', index)

      cryptoCoin.innerHTML = `

    <span class="mcap">${index + 1}</span>
    <div class="draggable" draggable="true">
      <p class="coin-name">${coin}</p>
      <i class="fas fa-grip-lines"></i>
    </div>
    `
      // push the items tot the empty array
      coinItems.push(cryptoCoin)
      draggable_list.appendChild(cryptoCoin)
    })

  addEventListeners()
}

// D R A G        F U N C T I O N S
function dragStart() {
  // console.log('Event: ', 'dragstart')
  dragStartIndex = +this.closest('li').getAttribute('coin-index')
  // console.log(dragStartIndex) ---- identifies the index of the closest li
}
function dragEnter() {
  // console.log('Event: ', 'dragenter')
  this.classList.add('over')
}
function dragLeave() {
  // console.log('Event: ', 'dragleave')
  this.classList.remove('over')
}
function dragOver(evt) {
  // console.log('Event: ', 'dragover')

  evt.preventDefault() // prevents default behavious of events
}
function dragDrop() {
  // console.log('Event: ', 'drop')
  const dragEndIndex = +this.getAttribute('coin-index')

  // callback to swap the dragged and dropped item
  swapCoins(dragStartIndex, dragEndIndex)

  this.classList.remove('over')
}

// function to swap from first to next index
function swapCoins(firstIndex, nextIndex) {
  const itemOne = coinItems[firstIndex].querySelector('.draggable')
  const itemTwo = coinItems[nextIndex].querySelector('.draggable')

  // this takes the dragged item and appends it to the dropped item
  // essentially swapping the two items in the process
  coinItems[firstIndex].appendChild(itemTwo)
  coinItems[nextIndex].appendChild(itemOne)

  // console.log(itemOne, itemTwo) -- identifies the two swap elements in the DOM
}

// check the order of list items on button click
function checkOrder() {
  coinItems.forEach((cryptoCoin, index) => {
    const coinName = cryptoCoin.querySelector('.draggable').innerText.trim()

    if (coinName !== cryptoCoins[index]) {
      cryptoCoin.classList.add('wrong')
    } else {
      cryptoCoin.classList.remove('wrong')
      cryptoCoin.classList.add('right')
    }
  })
}

// D R A G-D R O P        E V E N T S
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable')
  const draggCoinItems = document.querySelectorAll('.draggable-list li')

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart)
  })

  draggCoinItems.forEach((item) => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })
}

// C H E C K-BTN        E V E N T S
check.addEventListener('click', checkOrder)

// M O B I L E        E V E N T S

moveable(document.querySelector('.draggable'))

function moveable(mobileDrag) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0

  mobileDrag.onpointerdown = pointerDrag

  function pointerDrag(e) {
    e.preventDefault()
    console.log(e)

    pos3 = e.clientX
    pos4 = e.clientY

    document.onpointermove = elementDrag
    document.onpointerup = stopElementDrag
  }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos3 = e.clientY

    console.log(pos1, pos2, pos3, pos4)
  }

  function stopElementDrag() {
    document.onpointerup = null
    document.onpointermove = null
  }
}
