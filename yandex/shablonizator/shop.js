function api(apiClient, cart) {
    const defaultCurrency = apiClient.defaultCurrency;
    const date = cart.orderDate;
    const cityId = cart.cityId;

    const deliveryCost = apiClient.deliveryCost.cityId;
    

    let rest = apiClient.rests;
    rest.filter((r) => r.date === date);
    let prices = apiClient.prices;
    prices.filter((p) => p.date === date);

    let totalCost = 0;

    for (const item of cart.items) {
        const articleId = item.articleId;

        let price = prices.find((p) => p.articleId === articleId)?.price ?? 0;
        const currency = prices.find((p) => p.articleId === articleId)?.currency ?? defaultCurrency;

        const availableQuantity = rest.filter((r) => r.articleId === articleId).reduce((total, cur) => total + cur.quantity, 0);
        const quantity = Math.min(availableQuantity, item.quantity);

        if (currency !== cart.currency) {
            price = apiClient.convertCurrency(currency, cart.currency, price);
        }
        totalCost += quantity * price;
    }

    totalCost += deliveryCost;
    return totalCost;
};


function api2(apiClient, cart) {
    let totalCost = 0;
    const defaultCurrency = apiClient.getDefaultCurrency();
    const deliveryCost = apiClient.getDeliveryCost(cart.cityId);

    const prices = {};

    // получаем цены на заданную дату
    const datePrices = apiClient.getDatePrices(cart.orderDate);
    for (const price of datePrices) {
        prices[price.articleId] = price;
    }

    // создаем объект для хранения остатков товаров на нужную дату
    const stock = {};

    // получаем остатки товара на заданную дату
    const dateStock = apiClient.getDateStock(cart.orderDate);
    for (const item of dateStock) {
        stock[item.articleId] = stock[item.articleId] || 0;
        stock[item.articleId] += item.quantity;
    }

    // вычисляем стоимость заказа
    for (const item of cart.items) {
        const articleId = item.articleId;
        const quantity = item.quantity;
        const price = prices[articleId] || { price: 0, currency: defaultCurrency };
        const articleStock = stock[articleId] || 0;
        const availableQuantity = Math.min(quantity, articleStock);
        totalCost += availableQuantity * price.price;
        stock[articleId] -= availableQuantity;
    }

    // конвертируем стоимость в нужную валюту, если необходимо
    if (cart.currency !== defaultCurrency) {
        totalCost = apiClient.convertCurrency(defaultCurrency, cart.currency, totalCost);
    }

    // добавляем стоимость доставки
    totalCost += deliveryCost;

    return totalCost;
}