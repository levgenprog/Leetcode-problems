const stringTokens = [
    "#price",
    " ",
    ["@plural", "#day", "$tripDays"],
    " - ",
    ["@number", "$tripPrice", "USD"]
];


const variables = {
    tripDays: 10,
    tripPrice: 56789.01,
}

const translations = {
    "ru-RU": {             // локаль  
        price: "Цена",        // обычный перевод для ключа price  
        day: {                // перевод для ключа day c учетом плюральных форм  
            zero: " дней",
            one: " день",
            few: " дня",
            many: " дней",
            other: " дней",
        }
    },
    "en-US": {
        price: "Price",
        day: {
            one: " day",
            other: " days",
            //...  
        }
    },
    //...  
}

function getI18nText({ stringTokens, variables, translations, locale }) {
    // console.log(typeof stringTokens);
    let i18nText = '';

    for (const token of stringTokens) {
        if (typeof token === 'string') {
            if (token.startsWith('$')) {
                let v = token.slice(1, token.length);
                i18nText += variables[v];
            } else if (token.startsWith('#')) {
                let k = token.slice(1, token.length);
                i18nText += translations[locale][k];
            } else {
                i18nText += token;
            }
        } else if (Array.isArray(token)) {
            let [funcName, ...args] = token;
            // console.log(funcName);
            // console.log(args);

            switch (funcName) {
                case '@date':
                    i18nText += new Intl.DateTimeFormat(locale, {
                        timeZone: 'UTC',
                        dateStyle: 'full',
                        timeStyle: 'long'
                    }).format(new Date(args[0]));
                    break;
                case '@number':
                    // console.log(args[0]);

                    let number = args[0][0] === '$' ? variables[args[0].slice(1, args[0].length)] : args[0];
                    if (args[1]) {
                        // console.log(args[1]);
                        i18nText += new Intl.NumberFormat(locale, {
                            style: 'currency',
                            currency: args[1]
                        }).format(number);
                    } else {
                        i18nText += new Intl.NumberFormat(locale).format(number);
                    }
                    break;
                case '@plural':
                    let k = args[0].slice(1, args[0].length);
                    let n = args[1][0] === '$' ? variables[args[1].slice(1, args[1].length)] : args[1];

                    let pr = new Intl.PluralRules(locale);
                    i18nText += `${n}${translations[locale][k][pr.select(n)]}`;
                    break;
                case '@list':
                    let items = args.map((item) => {
                        if (item[0] === '$') {
                            return variables[item.slice(1, item.length)];
                        } else if (item[0] === '#') {
                            return translations[locale][item.slice(1, item.length)];
                        }
                        return item;
                    });

                    i18nText += new Intl.ListFormat(locale, {
                        style: 'long',
                        type: 'conjunction'
                    }).format(items);
                    break;
                case '@relativeTime':
                    i18nText += new Intl.RelativeTimeFormat(locale).format(args[0], args[1]);
                    break;
            }
        }
    }

    return i18nText;
}

// console.log(getI18nText({
//     stringTokens: [["@number", 56789.01, "USD"]],
//     locale: "ru-RU",
// }));

// console.log(getI18nText({
//     stringTokens: [["@plural", "#day", "$tripDays"]],
//     variables: { tripDays: 434.5 },
//     translations: {
//         "ru-RU": {
//             day: {
//                 zero: " дней",
//                 one: " день",
//                 few: " дня",
//                 many: " дней",
//                 other: " дней",
//             },
//         }
//         // ...  
//     },
//     locale: "ru-RU",
// })); // "434,5 дня");

// console.log(getI18nText({
//     stringTokens: [["@list", "Motorcycle", "$item", "#bus"]],
//     variables: { item: "Car" },
//     translations: {
//         "en-US": {
//             bus: "Bus",
//         },
//         // ...  
//     },
//     locale: "en-US",
// }));


// console.log(getI18nText({
//     stringTokens: [["@relativeTime", -5, "hours"]],
//     locale: "ru-RU",
// })) // 5 часов назад);

// console.log(getI18nText({ stringTokens, variables, translations, locale: "ru-RU" }));
// console.log(getI18nText({ stringTokens, variables, translations, locale: "en-US" }));

console.log(getI18nText({
    stringTokens: ["key", " ", "$var", " ", "#translation"],
    variables: { var: 100 },
    translations: {
        "ru-RU": { translation: "тест" },
        "en-US": { translation: "test" },
        "de-DE": { translation: "prüfen" },
        "hi-IN": { translation: "परीक्षा" },
        "ar-AA": { translation: "امتحان" },
    },
}));