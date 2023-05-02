// make Jar class, help from Mitchell
class Jar {
    constructor(label, startBal, currentBal=startBal) {
      this.label = label
      this.startBal = startBal
      this.currentBal = currentBal
    }
  
    spend(amount) {
      if (this.currentBal > amount) {
        this.currentBal -= amount
        return true  // does not allow negative balance in jar
      }
  
      return false
    }
  
    deposit(amount) {
      this.currentBal += amount
    }
  
  }
  
  export default Jar;
