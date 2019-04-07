export const formatBrazilianDate = (date) => {
    const day = date.getDate() <= 9 ? 0 + date.getDate().toString() : date.getDate().toString();
    const month = date.getMonth() <= 9 ? 0 + date.getMonth().toString() : date.getMonth().toString();
    const year = date.getFullYear().toString();
    
    return `${day}/${month}/${year}`;
}

export const formatHourMinutes = (date) => {
    const hours = date.getHours() <= 9 ? 0 + date.getHours().toString() : date.getHours().toString();
    const minutes = date.getMinutes() <= 9 ? 0 + date.getMinutes().toString(): date.getMinutes().toString();

    return `${hours}:${minutes}`;
}

export const groupByTransactionId = (payload) => {
    return payload.events.reduce((finalData, event) => {
        const extractEventObject = _extractEventObject(event);
        const index = extractEventObject.transactionId;

        finalData[index] = finalData[index] || { products: [], date: extractEventObject.extractedObject.date };

        if (extractEventObject.extractedObject.revenue) {
            finalData[index].storeName = extractEventObject.extractedObject.storeName;
            finalData[index].revenue = extractEventObject.extractedObject.revenue;
        } else {
            finalData[index].products.push(extractEventObject.extractedObject.product);
        }
        return finalData;
    }, {});
};

const _extractEventObject = (event) => {
    const { timestamp, revenue } = event;
    const extractedObject = { revenue, date: timestamp };

    let transactionId;

    extractedObject.product = event.custom_data.reduce((finalData, data) => {
        const extractedCustomData = { ...finalData };

        if (data.key === 'transaction_id') transactionId = data.value;
        else if (data.key === 'store_name') extractedObject.storeName = data.value;
        else extractedCustomData[data.key] = data.value;

        return extractedCustomData;
    }, {});

    return { extractedObject, transactionId };
};