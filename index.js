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
        _displayResult(data, location, units);
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

function _displayResult(data, location, units) {
    const display = document.querySelector('.display');
    const data_div = _createDivForData(data, units);
    const cityName = location.replace(/^\w/, (c) => c.toUpperCase());
    const fields_div = _createEle('div', 'holder', '');
    display.appendChild(_createEle('h2', 'city', cityName + "'s weather"));
    for (let field in data_div) {
        fields_div.appendChild(data_div[field]);
    }
    display.appendChild(fields_div);
}

const _createDivForData = (data, units) => {
    const data_w_main = _createfields(units, 'p', 'weather', data.weather[0].main);
    const data_w_des = _createfields(units, 'p', 'description', data.weather[0].description);
    const data_main_t = _createfields(units, 'p', 'temp', data.main.temp);
    const data_main_fl = _createfields(units, 'p', 'feels_like', data.main.feels_like);
    const data_main_p = _createfields(units, 'p', 'pressure', data.main.pressure);
    const data_main_h = _createfields(units, 'p', 'humidity', data.main.humidity);
    const data_main_min = _createfields(units, 'p', 'min_temp', data.main.temp_min);
    const data_main_max = _createfields(units, 'p', 'max_temp', data.main.temp_max);
    const data_wind = _createfields(units, 'p', 'wind_speed', data.wind.speed);

    return {data_w_main, data_w_des, data_main_t, data_main_fl, data_main_p, data_main_h,
                data_main_min, data_main_max, data_wind};
}

function _clearDisplay(display) {
    while(display.firstChild != null)
        display.removeChild(display.firstChild);
}

function _createfields(units, type, name, value) {
    const data_div = _createEle('div', 'fields', '');
    const field_name = name.replace('_', ' ');
    const labelText = `${field_name}`;
    const output = value + _getUnit(units, name);
    const label = _createEle('label', `label_${name}`, labelText);
    const element = _createEle(type, name, output);
    data_div.appendChild(label);
    data_div.appendChild(element);
    return data_div;
}

function _createEle(type, name, value) {
    const element = document.createElement(type);
    element.classList.add(name);
    element.textContent = value;
    return element;
}

function _getUnit(unit, name) {
    let value = " ";
    switch (name) {
        case 'temp':
        case 'feels_like':
        case 'min_temp:':
        case 'max_temp':
            switch (unit) {
                case 'metric':
                    value += '°C';
                    break;

                case 'imperial':
                    value += '°F';
                    break;

                case 'standard':
                    value += 'K';
                    break;
            }   
            break;

        case 'pressure':
            value += 'hPa';
            break;

        case 'humidity':
            value += '%';
            break;

        case 'wind_speed':
            switch (unit) {
                case 'metric':
                case 'standard':
                    value += 'm/s';
                    break;

                case 'imperial':
                    value += 'miles/hour';
                    break;
            }
            break;
    }

    return value;
}