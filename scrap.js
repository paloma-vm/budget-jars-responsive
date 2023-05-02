// what I had tried, I needed e.target, etc
depositButton.addEventListener('click', (e) => {
    if (options.selectedIndex == 'Transportation') {
      // get deposits and add to jar amount
      const mathAmount = document.getElementById('amt')
      console.log(mathAmount.value) 
      jars[0].deposit(mathAmount.value)
      console.log(mathAmount.value)
    }
    
  })

  // const gameFund = new Jar('games', 75)
// jars.push(gameFund)

jars[0].startBal = parseFloat(savedData.transportationAmt)
jars[1].startBal = parseFloat(savedData.foodAmt)
jars[2].startBal = parseFloat(savedData.entertainmentAmt)
jars[3].startBal = parseFloat(savedData.clothesGiftsAmt)
jars[4].startBal = parseFloat(savedData.everythingElseAmt)

function updateJars() {
  // if (localStorage.key('jars')) {
  //   savedJarsData = JSON.parse(localStorage.getItem('jars'))
  // }
  if (localStorage.key(formId)) {
    savedData = JSON.parse(localStorage.getItem(formId))
    
    if (savedData !== undefined) {
      makeJar('Transportation', parseFloat(savedData.transportationAmt))
      makeJar('Food', parseFloat(savedData.foodAmt))
      makeJar('Entertainment', parseFloat(savedData.entertainmentAmt))
      makeJar('Clothes/gifts', parseFloat(savedData.clothesGiftsAmt))
      makeJar('Everything else', parseFloat(savedData.everythingElseAmt))
      localStorage.setItem('jars', JSON.stringify(jars))

      console.log(jars)
    }
  }
  
}