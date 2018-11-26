/* Перетасовать  */
export const shuffleArray = (array) =>  {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

/* Метод  проверки на совпадение свойств в массиве объектов */
export const ArrayOfObjectsFindSameProperty=(ArrayOfObject, ArrayOfObject2, property)=> {
    let returnArray = [];
    for (let i = 0; i < ArrayOfObject.length; i++) {
        for (let j = 0; j < ArrayOfObject2.length; j++) {
            if (ArrayOfObject[i][property] === ArrayOfObject2[j][property]) {
                returnArray.push(ArrayOfObject[i]);
            }
        }
    }
    return returnArray;
}

/* Метод  проверки на совпадение свойств в массиве объектов и удаляет */
export const ArrayOfObjectsFindSamePropertyAndDelete = (fromArrayOfObject, thisArrayOfObject2, property) => {
    for (let i = 0; i < fromArrayOfObject.length; i++) {
        for (let j = 0; j < thisArrayOfObject2.length; j++) {
            if (fromArrayOfObject[i][property] === thisArrayOfObject2[j][property]) {
                fromArrayOfObject.splice(i, 1)
            }
        }
    }
}
/* Метод  получения  наименшего ранга */

export const minFindValue = (arr) => arr.sort((a, b) => a.rang - b.rang)[0]
