/**
 * radio, checklist中解析value值的不同类型: object 或者其他;
 */
function getKey(item) {
    return typeof item === 'object' ? item.key : item
}

function getValue(item) {
    return typeof item === 'object' ? item.value : item
}

export {
    getKey,
    getValue
}