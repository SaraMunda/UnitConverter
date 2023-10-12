const property = document.getElementById("property")
const input = document.getElementById("input")
const result = document.getElementById("result")
const fromUnit = document.getElementById ("fromUnit")
const toUnit = document.getElementById("toUnit")


const options = {
    length: ["Meter", "Centimeter", "Kilometer", "Millimeter", "Foot", "Inch"],
    weight: ["Gram", "Milligram", "Kilogram", "Ounce", "Pound"],
    time: ["Second", "Minute", "Hour", "Day", "Week", "Month", "Year"],
    temperature: ["Kelvin", "Celsius", "Fahrnheit"]
  }
  
  function updateUnitOptions(selectElement) {
    const selectedValue = property.value
    selectElement.innerHTML = options[selectedValue].map(option => `<option>${option}</option>`).join('')
  }
  
  updateUnitOptions(fromUnit)
  updateUnitOptions(toUnit)
  
  property.addEventListener("change", function () {
    updateUnitOptions(fromUnit)
    updateUnitOptions(toUnit)
  })
