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
      <img src='empty-jar.png'>
      <div class=' bg-red-300 flex w-full h-[80%]' border absolute left-0 bottom-0>
        <div class='bg-green-300 opacity-40 border w-[96%] h-[72%] absolute left-[2%] bottom-0 rounded-bl-[7rem] rounded-br-[7rem] !important'></div>
      </div>
      <p class='absolute top-10 sm:top-4 '>original balance:</p>
      <p class='absolute top-12 pt-5 sm:top-8 sm:pt-0'>$${startBal}</p>
      <h3 class='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl pb-5 sm:text-lg sm:w-full'>${label}</h3>
      <h2 class='absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-2 font-bold text-2xl sm:text-lg'>$${currentBal}</h2>
    </div>`
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

let savedData
let savedJarsData
function initializeJars() {
  if (localStorage.key(formId)) {
    savedData = JSON.parse(localStorage.getItem(formId))
  
    makeJar('Transportation', parseFloat(savedData.transportationAmt))
    makeJar('Food', parseFloat(savedData.foodAmt))
    makeJar('Entertainment', parseFloat(savedData.entertainmentAmt))
    makeJar('Clothes/gifts', parseFloat(savedData.clothesGiftsAmt))
    makeJar('Everything else', parseFloat(savedData.everythingElseAmt))
  }
}

// function initializeJars() {
//   /** A function to create the jars */
//   if (localStorage.key('jars')) {
//     savedJarsData = JSON.parse(localStorage.getItem('jars'))
//     if (savedJarsData !== undefined) {
//     /** I am sure there is a more DRY way to do this, but it works and I am short on time */
//     makeJar('Transportation', parseFloat(savedJarsData[0].startBal), parseFloat(savedJarsData[0].currentBal))
//     makeJar('Food', parseFloat(savedJarsData[1].startBal), parseFloat(savedJarsData[1].currentBal))
//     makeJar('Entertainment', parseFloat(savedJarsData[2].startBal), parseFloat(savedJarsData[2].currentBal))
//     makeJar('Clothes/gifts', parseFloat(savedJarsData[3].startBal), parseFloat(savedJarsData[3].currentBal))
//     makeJar('Everything else', parseFloat(savedJarsData[4].startBal), parseFloat(savedJarsData[4].currentBal))
//     }
//   }
  
//   else if (localStorage.key(formId)) {
//     savedData = JSON.parse(localStorage.getItem(formId))
  
//     makeJar('Transportation', parseFloat(savedData.transportationAmt))
//     makeJar('Food', parseFloat(savedData.foodAmt))
//     makeJar('Entertainment', parseFloat(savedData.entertainmentAmt))
//     makeJar('Clothes/gifts', parseFloat(savedData.clothesGiftsAmt))
//     makeJar('Everything else', parseFloat(savedData.everythingElseAmt))
//     localStorage.setItem('jars', JSON.stringify(jars))
//   }
// }   

   // makeJar('Transportation', parseFloat(0), parseFloat(0))
    // makeJar('Food', 0, 0)
    // makeJar('Entertainment', 0, 0)
    // makeJar('Clothes/gifts', 0, 0)
    // makeJar('Everything else', 0, 0)
    // localStorage.setItem('jars', JSON.stringify(jars))
    // have a pop-up directing user to Get Started
    // jarList.innerHTML = 'use the Get Started link to make a budget'
  

  // } else if (localStorage.key('jars') == undefined) {
  //     makeJar('Transportation', 0, 0)
  //     makeJar('Food', 0, 0)
  //     makeJar('Entertainment', 0, 0)
  //     makeJar('Clothes/gifts', 0, 0)
  //     makeJar('Everything else', 0, 0)

  // }





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






