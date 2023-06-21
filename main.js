import Jar from './Jar.js';

const formId = "BudgetForm"; // form id
const transportationAmt = 200;

// event delegation
document.body.addEventListener('click', (e) => {
  console.log('%%%%%%%%%%%')
  if (e.target.matches('#depositButton')) {
    console.log('You deposited money')
    const amt = parseFloat(document.getElementById('amt').value)
    const category = document.getElementById('category').value
    for (let i = 0; i < jars.length; i += 1) {
      if (jars[i].label === category) {
        jars[i].deposit(amt)
        localStorage.setItem('jars', JSON.stringify(jars))
        console.log(jars)
      }
    }
    showJars()
    
  } else if (e.target.matches('#spendButton')) {
      console.log('You spent money')
      const amt = parseFloat(document.getElementById('amt').value)
      const category = document.getElementById('category').value

      for (let i = 0; i < jars.length; i += 1) {
        if (jars[i].label === category) {
          jars[i].spend(amt)
          localStorage.setItem('jars', JSON.stringify(jars))
          console.log(jars)
        }
      }
      showJars()
  }
})
document.body.addEventListener('submit', (e) => { // to prevent the whole page refreshing
  e.preventDefault()
})
document.body.addEventListener('change', (e) => {
  if (e.target.matches('.jar')) { // unfinished, may use later

  } else if (e.target.matches('#category')) {
    const category = document.getElementById('category').value
    for (let i = 0; i < jars.length; i += 1) {
      if (jars[i].label === category) {
        document.getElementById(`jar-${i}`).classList.add('active')
      } else {
        document.getElementById(`jar-${i}`).classList.remove('active')
      }
    }
  }
})

const jars = []

const jarList = document.getElementById('jars')
const options = document.getElementById('category')


function makeJar(label, startBal, currentBal) {
  const jar = new Jar(label, startBal, currentBal)
  jars.push(jar)
}


// help from mood-shop assignment
function showJars() {
  let jarsDisplay = ''
  for (let i = 0; i < jars.length; i += 1) {
    const { label, startBal, currentBal } = jars[i]
    const startLevel = (1 - ((startBal - currentBal) / startBal)) * 100


    jarsDisplay += 
    `<div class='text-slate-900 text-center relative flex flex-col justify-center items-center box-border h-full text-lg sm:text-sm' id='jar-${i}'>
      <img src='empty-jar.png' alt='A transparent jar with a money level equal to ${currentBal}'>
      <div class=' bg-red-300 flex w-full h-[80%]' border absolute left-0 bottom-0>
        <div class='bg-green-300 opacity-40 border w-[96%] h-[72%] absolute left-[2%] bottom-0 rounded-bl-[7rem] rounded-br-[7rem] !important'></div>
      </div>
      <p class='absolute top-10 sm:top-4 '>original balance:</p>
      <p class='absolute top-12 pt-5 sm:top-8 sm:pt-0'>$${startBal}</p>
      <h3 class='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl pb-5 sm:text-lg sm:w-full'>${label}</h3>
      <h2 class='absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-2 font-bold text-2xl sm:text-lg'>$${currentBal}</h2>
    </div>` // I don't know what's going on with the bg-red-300 div...it has no height and I can't find it anymore
  }
  jarList.innerHTML = jarsDisplay
  
  
}

function jarSelect() {
  let jarChoices = `<option value=','>-----------    select   -----------</option>`
  for (let i = 0; i < jars.length; i += 1) {
    const { label } = jars[i]

    jarChoices += `<option value='${label}'>${label}</option>`
    console.log(label)
   
  }
  console.log(options, jarChoices)
  options.innerHTML = jarChoices
}

// -----------------------------------------------------
// I can use event delegation with this line below to add as a feature in the future
// document.getElementById('jar-0').addEventListener('click', highlightDiv);
function highlightDiv() {
  const jar0 = document.getElementById('jar-0');
  jar0.classList.toggle('highlight');
}

let savedJarsData

function initializeJars() {
  /** A function to create the jars */
  //if (localStorage.key('jars')) {
  if (localStorage.getItem('jars')) {
    savedJarsData = JSON.parse(localStorage.getItem('jars'))
    for (let i = 0; i < savedJarsData.length; i++) {
      const { label, startBal, currentBal } = savedJarsData[i]
      makeJar(label, parseFloat(startBal), parseFloat(currentBal))
    }
  } else {
    makeJar('Transportation', 0, 0)
    makeJar('Food', 0, 0)
    makeJar('Entertainment', 0, 0)
    makeJar('Clothes/gifts', 0, 0)
    makeJar('Everything else', 0, 0)
    // localStorage.setItem('jars', JSON.stringify(jars))
  }
}   

/**
 * A function to retrieve the form data and
 * use it to create the jar starting balance
 */
const displayPage = () => {
  initializeJars()
  showJars()
  jarSelect()
}

displayPage() // create jars and show deposit/spend input 
console.log(jars)

/** Below I was wondering how to style the money levels
 * I did it differently abve, but keeping this for reference
 */
// const startLevel = document.getElementsByClassName('startLevel')
// startLevel.style.height = currentBal%






