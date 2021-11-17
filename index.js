(function() {
const enter = document.querySelector('.enter'); 
enter.addEventListener('click', _showData);
})();

function _showData() {
    const inputs = _getInput();
    if (inputs != null) 
        _getWeatherWLoc(inputs[0], inputs[1]);
}

async function _getWeatherWLoc(location, units) {
    const freeKey = "6045234e565531f24f76ad6ba96f4cf4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${freeKey}`;
    try {
        const response = await fetch(url, {mode: 'cors'});
        const data = await response.json();
        console.log(data);
        _displayResult(data);
    } catch (e) {
        console.log(e);
    }
}

function _getInput() {
    const location_in = document.querySelector('.location');
    const unit = document.querySelector('.units');
    const display = document.querySelector('.display');
    _clearDisplay(display);
    if (location_in.checkValidity()) {
        const location = location_in.value;
        const unitV = unit.value;
        return [location, unitV];
    } else {
        display.textContent = "please enter city name";
    }
}

function _displayResult(data) {
    const display = document.querySelector('.display');
    const data_div = _createDivForData(data);
    for (let field in data_div) {
        display.append(data_div[field]);
    }
}

const _createDivForData = (data) => {
    const data_w_main = _createEle('p', 'w_main', data.weather[0].main);
    const data_w_des = _createEle('p', 'w_des', data.weather[0].description);
    const data_main_t = _createEle('p', 'm_t', data.main.temp);
    const data_main_fl = _createEle('p', 'm_fl', data.main.feels_like);
    const data_main_p = _createEle('p', 'm_p', data.main.pressure);
    const data_main_h = _createEle('p', 'm_h', data.main.humidity);
    const data_main_min = _createEle('p', 'm_t_min', data.main.temp_min);
    const data_main_max = _createEle('p', 'm_t_max', data.main.temp_max);
    const data_wind = _createEle('p', 'm_w', data.wind.speed);

    return {data_w_main, data_w_des, data_main_t, data_main_fl, data_main_p, data_main_h,
                data_main_min, data_main_max, data_wind};
}

function _clearDisplay(display) {
    while(display.firstChild != null)
        display.removeChild(display.firstChild);
}

function _createEle(type, name, value) {
    const element = document.createElement(type);
    element.classList.add(name);
    element.textContent = value;
    console.log(value);
    return element;
}