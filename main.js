import Jar from './Jar.js';

// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const jars = []
let savedJarsData
let barGroup
let barData

function makeJar(label, startBal, currentBal) {
    const jar = new Jar(label, startBal, currentBal)
    jars.push(jar)
}



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
        makeJar('Transportation', 200, 10)
        makeJar('Food', 150, 50)
        makeJar('Entertainment', 250, 500)
        makeJar('Clothes/gifts', 250, 37)
        makeJar('Everything else', 250, 300)
        // localStorage.setItem('jars', JSON.stringify(jars))
    }
  //   } else {
  //       makeJar('Transportation', 300, 0)
  //       makeJar('Food', 0, 0)
  //       makeJar('Entertainment', 0, 0)
  //       makeJar('Clothes/gifts', 0, 0)
  //       makeJar('Everything else', 0, 0)
  //       localStorage.setItem('jars', JSON.stringify(jars))
  // }
} 

// Declare the chart dimensions and margins.
const marginTop = 20;
const marginRight = 30;
const marginBottom = 70;
const marginLeft = 80;
const width = 900;
const height = 400;
let x
let y
let colorScale

function drawChart() {

  x = d3.scaleBand()
      .domain(jars.map(d => d.label))
      // .range([marginLeft, width + marginLeft])
      .range([marginLeft, width - marginRight]) // help from ChatGPT

      .padding(0.1)
  console.log(jars)
  // Declare the y (vertical position) scale.
  y = d3.scaleLinear()
      // .domain([0, 500])
      .domain([0, d3.max(jars, d => d.startBal)]) // changed this for changing max
      .range([height - marginBottom, marginTop])
      // .range([marginTop, height])
      // .range([height, marginTop])
  colorScale = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(jars)
      .range(['cornflowerblue', 'green', 'gold', 'tomato', 'purple'])


  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);

  // Add the x-axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

  // Add the y-axis.
  const leftAxis = svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y) // removed round bracket here
          // add horizontal tick lines
          .ticks(10) // change number of ticks dynamically based on the data
          .tickFormat(d3.format(".0f")) // Format the axis numbers
          .tickSizeInner(-width + marginLeft + marginRight)
          .tickValues(d3.range(0, d3.max(jars, d => d.currentBal) + 50, 50))
      ) // moved the round to here

  // make the horizontal ticks dashed
  leftAxis.selectAll("line")
      .attr("stroke-dasharray", "4 4")
      .attr("stroke-opacity", 0.5)
  // make the axis numbers appear again, because they disappeared when I added the dashed ticks
  leftAxis.selectAll(".tick text")
      .attr("x", -10)
      .attr("dy", 4)

  // add axis labels
  // x label
  svg
    .append('text')
    .attr('x', (width / 2) + marginLeft)
    .attr('y', height - 20)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', '18px')
    .text('Jars')
  // y label
  svg
    .append('text')
    // .attr('x', 10)
    // .attr('y', height / 2)
    .attr('transform', 'translate(30, ' + height / 2 + ')rotate(-90)')
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', '18px')
    .text('Dollars')


  // Append the SVG element.
  const container = d3.select('#container')
  container.append(() => svg.node())

  // ---------- DRAW -------------------------------
  // Select the SVG (root node)
  // bars group (make a group to hold the bars)
  barGroup = svg.append('g')
  // Make the bars

  barData = barGroup 
      .selectAll('rect')
      .data(jars)
      .enter()
      .append('rect')

  updateChart()
    

  const transparentBarsGroup = svg.append('g')
  // Make the bars

  transparentBarsGroup 
      .selectAll('rect')
      .data(jars)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(d.label))
      .attr('y', d => y(d.startBal))
      .attr('width', x.bandwidth())
      .attr('height', d => height - marginBottom -y(d.startBal))
      .attr('fill', 'bisque')
      .attr('opacity', 0.45)
}

function updateChart() {
  barData
    .attr('class', 'bar')
    .attr('x', (d, i) => x(d.label))
    .attr('y', d => y(d.currentBal))
    .attr('width', x.bandwidth())
    .attr('height', d => height - marginBottom -y(d.currentBal))
    .attr('fill', d => colorScale(d.label))
}

const formId = "BudgetForm"; // form id
// const transportationAmt = 200;

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
  barData.data(jars)
  updateChart()
  console.log('updating jars!')
  console.log(jars)  
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


// function initializeJars() {
//   /** A function to create the jars */
//   //if (localStorage.key('jars')) {
//   if (localStorage.getItem('jars')) {
//     savedJarsData = JSON.parse(localStorage.getItem('jars'))
//     for (let i = 0; i < savedJarsData.length; i++) {
//       const { label, startBal, currentBal } = savedJarsData[i]
//       makeJar(label, parseFloat(startBal), parseFloat(currentBal))
//     }
//   } else {
//     makeJar('Transportation', 0, 0)
//     makeJar('Food', 0, 0)
//     makeJar('Entertainment', 0, 0)
//     makeJar('Clothes/gifts', 0, 0)
//     makeJar('Everything else', 0, 0)
//     // localStorage.setItem('jars', JSON.stringify(jars))
//   }
// }   

/**
 * A function to retrieve the form data and
 * use it to create the jar starting balance
 */
const displayPage = () => {
  initializeJars()
  jarSelect()
  drawChart()
  showJars()
  console.log('initializing')
  console.log(jars)

  
}

displayPage() // create jars and show deposit/spend input 







