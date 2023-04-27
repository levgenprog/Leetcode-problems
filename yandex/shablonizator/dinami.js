let currentConfig = 'first';

const changeConfig = (config) => {
    currentConfig = config;
}

const configValue = (key) => {
    return `${currentConfig}:${key}`;
}

const makeDynamicConfig = function (configObject) {
    const dynamicConfigObject = {};
    for (const [key, value] of Object.entries(configObject)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
            dynamicConfigObject[key] = makeDynamicConfig(value);
        } else if (Array.isArray(value)) {
            dynamicConfigObject[key] = value.map((el) =>
                typeof el === 'object' && !Array.isArray(el)
                    ? makeDynamicConfig(el)
                    : dynamicConfigValue(el)
            );
        } else {
            dynamicConfigObject[key] = dynamicConfigValue(value);
        }
    }
    return dynamicConfigObject;
};

const dynamicConfigValue = function (key) {
    return function () {
        return configValue(key);
    };
};

// const options = {
//     key1: configValue('key1'),
//     key2: configValue('key2'),
//     key3: configValue('key3'),
// };

// console.log(options.key1) // Выводит 'first:key1',

// changeConfig('second');

// console.log(options.key1);


// const {
//     changeConfig,
//     dynamicConfigValue,
//     makeDynamicConfig,
// } = require('dynamic-congigs');

const options = makeDynamicConfig({
    key1: dynamicConfigValue('key1'),
    key2: dynamicConfigValue('key2'),
    key3: dynamicConfigValue('key3'),
});

console.log(options.key1) // Выводит 'first:key1',

changeConfig('second');

console.log(options.key1)

function fn2(configValue /* (key: string) => string */) {

    const makeDynamicConfig = (obj) => {
        const dynamicConfigObject = {};
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && !Array.isArray(value)) {
                dynamicConfigObject[key] = makeDynamicConfig(value);
            } else if (Array.isArray(value)) {
                dynamicConfigObject[key] = value.map((el) =>
                    typeof el === 'object' && !Array.isArray(el)
                        ? makeDynamicConfig(el)
                        : dynamicConfigValue(el)
                );
            } else {
                dynamicConfigObject[key] = dynamicConfigValue(value);
            }
        }
        return dynamicConfigObject;
    };

    const dynamicConfigValue = (key) => {
        return configValue(key);
    };
    // const dynamicConfigValue = (key) => {
    //     return `${currentConfig}:${key}`;
    // };

    return {
        makeDynamicConfig,
        dynamicConfigValue,
    };
}