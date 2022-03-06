const currentOrder = [{
    "morcilla": "2",
    "id": "6224c318224961b353791920",
    "Cerveza": "1"
}, {
    "morcilla": "2",
    "id": "6224c318224961b353791920",
    "Cerveza": "1"
}, {
    "morcilla": "2",
    "id": "6224c318224961b353791920",
    "Cerveza": "1"
}, {
    "morcilla": "2",
    "id": "6224c318224961b353791920",
    "Cerveza": "1"
}]

const alternativeOrders = [{
    id: "sfsadfsdf",
    items: [{ Cerveza: 5}, { morcilla: 2}]
}, {
    id: "wer234325r",
    items: [{ Cerveza: 1}]
}]

const prices = {
    Cerveza: 2.5,
    morcilla: 6
}

const result = {
    "morcilla": 8,
    "Cerveza": 4
}

function cookOrder(order) {
    const { id, ...rest } = order

    const result = {}
    for (const item in rest) {
        result[item] = Number(rest[item])
    }
    return result
}

function getOrderTotals(orders) {
    return orders.reduce((acc, order) => {
        const cookedOrder = cookOrder(order)
        for (const item in cookedOrder) {
            const currentValue = acc[item] ?? 0
            acc[item] = currentValue + cookedOrder[item]
        }
        return acc    }, {})
}

console.log(getOrderTotals(currentOrder))