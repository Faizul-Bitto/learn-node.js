function calculateCelsiusToFahrenheit ( celsius ) {
    let celsiusTemperature = celsius;
    return ( celsiusTemperature * ( 9 / 5 ) ) + 32;
}

function calculateFahrenheitToCelsius ( fahrenheit ) {
    let fahrenheitTemperature = fahrenheit;
    return ( fahrenheitTemperature - 32 ) * ( 5 / 9 );
}

module.exports = {
    calculateCelsiusToFahrenheit,
    calculateFahrenheitToCelsius
};