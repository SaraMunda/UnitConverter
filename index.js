const property = document.getElementById("property")
const input = document.getElementById("input")
const result = document.getElementById("result")
const fromUnit = document.getElementById ("fromUnit")
const toUnit = document.getElementById("toUnit")

//update unit option

const conversionRates = {
  length: {
      Meter: 1,
      Centimeter: 100,
      Kilometer: 0.001,
      Millimeter: 1000,
      Foot: 3.28084,
      Inch: 39.3701
  },
  weight: {
      Gram: 1,
      Milligram: 1000,
      Kilogram: 0.001,
      Ounce: 0.03527396,
      Pound: 0.00220462
  },
  time: {
      Second: 1,
      Minute: 1 / 60,
      Hour: 1 / 3600,
      Day: 1 / 86400,
      Week: 1 / 604800,
      Month: 1 / 2628000,
      Year: 1 / 31536000
  },
  temperature: {
      Kelvin: {
          celsius: kelvin => kelvin - 273.15,
          fahrenheit: kelvin => (kelvin - 273.15) * 9/5 + 32
      },
      Celsius: {
          kelvin: celsius => celsius + 273.15,
          fahrenheit: celsius => celsius * 9/5 + 32
      },
      Fahrenheit: {
          kelvin: fahrenheit => (fahrenheit - 32) * 5/9 + 273.15,
          celsius: fahrenheit => (fahrenheit - 32) * 5/9
      }
  }
}

function updateUnitOptions(selectElement) {
  const selectedValue = property.value
  selectElement.innerHTML = Object.keys(conversionRates[selectedValue]).map(unit => `<option>${unit}</option>`).join('')
}

updateUnitOptions(fromUnit)
updateUnitOptions(toUnit)

property.addEventListener("change", function() {
  updateUnitOptions(fromUnit)
  updateUnitOptions(toUnit)
})

//display the result

const finalResult = () => {
  const inputValue = parseFloat(input.value)

  if (!isNaN(inputValue)) {
      const selectedProperty = property.value
      const fromUnitValue = fromUnit.value
      const toUnitValue = toUnit.value

      if (conversionRates[selectedProperty] && conversionRates[selectedProperty][fromUnitValue] && conversionRates[selectedProperty][toUnitValue]) {
        let resultValue
        if (fromUnitValue === "Kelvin" && toUnitValue === "Celsius" ) {
          resultValue = inputValue - 273.15
      } else if (fromUnitValue === "Celsius" && toUnitValue === "Kelvin"){
        resultValue = inputValue + 273.15
      } else if (fromUnitValue === "Kelvin" && toUnitValue === "Fahrenheit"){
        resultValue = (inputValue - 273.15) * 9/5 + 32
      } else if (fromUnitValue === "Fahrenheit" && toUnitValue === "Kelvin"){
        resultValue = (inputValue - 32) * 5/9 + 273.15
      } else if (fromUnitValue === "Celsius" && toUnitValue === "Fahrenheit"){
        resultValue = inputValue * 9/5 + 32
      } else if (fromUnitValue === "Fahrenheit" && toUnitValue === "Celsius"){
        resultValue = (inputValue - 32) * 5/9
      } else if (fromUnitValue === toUnitValue){
        resultValue = "Error"
      }
       else {resultValue = inputValue * (conversionRates[selectedProperty][toUnitValue]/conversionRates[selectedProperty][fromUnitValue])
      } result.value = resultValue
    }
  }
}

input.addEventListener("input", function() {
  if (input.value === "") {
      result.value = ""  
  } else {
    finalResult()
  }
})

fromUnit.addEventListener("change", finalResult)
toUnit.addEventListener("change", finalResult)

//reset unit values when property is changed 

function resetValues() {
  input.value = ""
  result.value = ""
}

property.addEventListener("change", function() {
  resetValues()
})