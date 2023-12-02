let someObj = {
    name: 'someName',
    getNameGood() {
        console.log(this.name)
    },
    getNameBad: () => {
        console.log(this.name)
    }
}

// Что будет в первом и втором случаях?

someObj.getNameBad() // undefined
// внутри стрелочной функции getNameBad также используется this. Однако в стрелочных функциях
// значение this берется из контекста, в котором они были созданы, и не может быть изменено.
// В данном случае, стрелочная функция создана в контексте создания объекта someObj, но в отличие
// от обычных методов объекта, стрелочная функция не изменяет свой контекст в момент вызова.
// Таким образом, при вызове someObj.getNameBad(), значение this внутри стрелочной функции
// указывает на глобальный объект (в браузере это может быть window), а не на someObj.
// Поскольку глобальный объект не имеет свойства name, this.name будет undefined.
// В консоли будет выведено undefined

someObj.getNameGood() // someName
// getNameGood используется this. В контексте метода объекта someObj, this ссылается на сам
// объект someObj. Поэтому при вызове someObj.getNameGood(), this.name будет равно 'someName',
// и в консоли будет выведено 'someName'.

//----------------2----------------------

//  Какой будет порядок выполнения console.log()? 

setTimeout(() => console.log(1), 0)

const p = Promise.resolve()
.then(() => console.log(2))
.finally(() => console.log(3));

console.log(4);

p.then(() => console.log(5));

const p2 = new Promise((resolve) => {
    console.log(6);
    resolve();
}).then(() => console.log(7));

//1. console.log(4);: Выводится в консоль 4.
//2. const p2 = new Promise((resolve) => { console.log(6); resolve(); }).then(() => console.log(7));: Создается новый промис p2. Внутри конструктора промиса есть асинхронная функция (функция, принимаемая конструктором промиса), и она выполняется сразу же при создании промиса. Поэтому console.log(6) выводится в консоль сразу же при создании промиса, затем промис разрешается с помощью resolve().
//3. Выполняется обработчик then промиса p, выводится 2.
//4. После этого, к промису p2 добавляется обработчик с помощью метода then, который выводит в консоль 7.
//5. После этого, к промису p2 добавляется обработчик с помощью метода finally добавляет обработчик, который выводит в консоль 3. Обратите внимание, что обработчик, переданный методу finally, будет выполнен независимо от того, завершился ли промис успешно или с ошибкой.
//6. p.then(() => console.log(5));: Добавляет обработчик к промису p, который выводит в консоль 5. Обратите внимание, что это происходит после выполнения промиса p, включая выполнение обработчика из finally.
// setTimeout(() => console.log(1), 0): Создает таймер, который запустит функцию console.log(1) после нулевой задержки. Заметьте, что даже с нулевой задержкой, setTimeout будет выполнен после текущей фазы выполнения кода.

// вывод:
// 4
// 6
// 2
// 7
// 3
// 5
// 1

//----------------2+----------------------

// Усложненная вариация задачи

setTimeout(() => {
    const p = new Promise((res, rej) => {
        console.log(1)
        res()
    }).then(() => console.log(2))
    console.log(3)
}, 1000)

console.log(4)

const r = Promise.resolve()
.then(() => console.log(5))
.finally(() => console.log(6))

Promise.resolve()
.then(() => console.log(7))

setTimeout(() => {
    const p = new Promise((res, rej) => {
        console.log(8)
        res()
    }).then(() => console.log(9))
    console.log(10)
}, 1000)

// 1. console.log(4): Выводится в консоль 4.
// 2. const r = Promise.resolve() ...: Создается промис r с использованием Promise.resolve(). К этому промису добавляются два обработчика с помощью методов then и finally.
// then добавляет обработчик, который выводит в консоль 5
// 3. Promise.resolve().then(() => console.log(7)): Создается еще один промис, к которому добавляется обработчик, который выводит в консоль 7
// 4. finally добавляет обработчик, который выводит в консоль 6
// 5. setTimeout(() => {...}, 1000): Устанавливает таймер на 1000 миллисекунд (1 секунда), после истечения которого будет выполнена асинхронная функция.
// Внутри функции обратного вызова setTimeout(() => {...}, 1000) происходит следующее:
// const p = new Promise((res, rej) => {...}): Создается новый промис p с использованием конструктора Promise. При создании промиса выполняется его конструктор,
// в данном случае, console.log(1) выводит 1 в консоль, затем промис разрешается с помощью res().
// 6. console.log(3): Выводит в консоль 3.
// 7. .then(() => console.log(2)): Обработчик then добавляется к промису p, который выводит в консоль 2.
// 8. По истечении таймера внутри второй функции обратного вызова setTimeout(() => {...}, 1000) происходит следующее:
// const p = new Promise((res, rej) => {...}): Создается новый промис p с использованием конструктора Promise.
// При создании промиса выполняется его конструктор, в данном случае, console.log(8) выводит 8 в консоль, затем промис разрешается с помощью res().
// 9. console.log(10): Выводит в консоль 10.
// 10. .then(() => console.log(9)): Обработчик then добавляется к промису p, который выводит в консоль 9.

// вывод:
// 4
// 5
// 7
// 6
// 1
// 3
// 2
// 8
// 10
// 9

//----------------3----------------------

// Что будет выведено в консоль?

[1,2,3,4].map(console.log)

// Метод map принимает функцию обратного вызова и вызывает её для каждого элемента массива,
// передавая текущий элемент, текущий индекс и сам массив. Однако, важно понимать,
// что возвращаемое значение этой функции обратного вызова используется для создания нового массива результатов.
// map создаст новый массив, состоящий из четырех элементов,
// Где каждая строка представляет собой результат вывода console.log для каждого элемента массива.
// Первый столбец - сам элемент массива, второй столбец - его индекс, и третий столбец - весь массив.
// вывод:
// 1 0 [ 1, 2, 3, 4 ]
// 2 1 [ 1, 2, 3, 4 ]
// 3 2 [ 1, 2, 3, 4 ]
// 4 3 [ 1, 2, 3, 4 ]

//----------------4----------------------

const arr1 = [1,2,3,4,5,1,2,3]
const arr2 = [1,1,2,2,3,3,4,5]

// Написать Функцию которая проверяет, что у этих массивов одинаковые элементы в одинаковом количестве 

function haveSameElements(arr1, arr2) {
    // Проверяем, имеют ли массивы одинаковую длину
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Создаем объекты для подсчета количества элементов в каждом массиве
    const countMap1 = {};
    const countMap2 = {};

    // Заполняем объекты подсчета для первого массива
    for (const element of arr1) {
        countMap1[element] = (countMap1[element] || 0) + 1;
    }

    // Заполняем объекты подсчета для второго массива
    for (const element of arr2) {
        countMap2[element] = (countMap2[element] || 0) + 1;
    }

    // Сравниваем количество каждого элемента в обоих массивах
    for (const key in countMap1) {
        if (countMap1[key] !== countMap2[key]) {
            return false;
        }
    }

    // Если все проверки пройдены, возвращаем true
    return true;
}

console.log(haveSameElements(arr1, arr2)); // Выведет true, так как оба массива содержат одинаковые элементы в одинаковом количестве

//-----------------5---------------------

// Написать функцию сложения которую можно вызывать sum(2,3) или sum(2)(3) и получить верный ответ.

function sum(a, b) {
    if (arguments.length === 2) {
        // Если передано два аргумента, выполняем сложение и возвращаем результат
        return a + b;
    } else if (arguments.length === 1) {
        // Если передан только один аргумент, возвращаем функцию, ожидающую второй аргумент
        return function (c) {
            return a + c;
        };
    } else {
        // Если передано ни одного или более двух аргументов, возвращаем undefined
        return undefined;
    }
}

// Пример использования
console.log(sum(2, 3)); // Выведет 5
console.log(sum(2)(3)); // Выведет 5

//-----------------6---------------------

// Написать функции one, plus, two, чтоб при вызове one(plus(two)) я получил 3

function one(arg) {
    // Проверяет, является ли arg функцией.
    // Если да, вызывает arg(1), передавая 1 в качестве аргумента.
    // Если нет, возвращает 1.
    if (typeof arg === 'function') {
        return arg(1);
    }
    return 1;
}
function plus(arg) {
    // Проверяет, является ли arg функцией.
    // Если arg - функция, возвращает новую функцию,
    //которая принимает аргумент num и вызывает arg(num) + 1.
    // Если arg не является функцией, возвращает arg + 1.
    if (typeof arg === 'function') {
        return function (num) {
            return arg(num) + 1;
        };
    }
    return arg + 1;
}
function two(arg) {
    // Проверяет, является ли arg функцией. Если да, вызывает arg(2),
    // передавая 2 в качестве аргумента. Если нет, возвращает 2.
    if (typeof arg === 'function') {
        return arg(2);
    }
    return 2;
}
// Пример использования
console.log(one(plus(two))); // Выведет 3
// Сначала вызывается two, передавая ей plus в качестве аргумента.
// two возвращает новую функцию, которая принимает аргумент num и вызывает plus(num) + 1.
// Теперь вызывается plus с аргументом num (который в данном случае равен 2).
// plus возвращает новую функцию, которая принимает аргумент num и вызывает num + 1.
// Затем эта новая функция вызывается с аргументом 2, возвращая 2 + 1, то есть 3.
// Таким образом, one(plus(two)) возвращает 3

//-----------------7---------------------

// Написать функцию, которая находит в массиве пару чисел, сумма которых равна заданному. Если таких нет - возвращает пустой массив.

const findSum = (arr, targetSum) => {
    const seenNumbers = new Set();

    for (const num of arr) {
        const complement = targetSum - num;

        if (seenNumbers.has(complement)) {
            return [complement, num];
        }

        seenNumbers.add(num);
    }

    return [];
};

// Пример использования
const numbers = [1, 2, 3, 4, 5];
const target = 7;

console.log(findSum(numbers, target));
// используем Set, чтобы хранить числа, которые мы уже видели в массиве.
// Проходим по массиву, и для каждого числа,
// вычисляем его дополнение (разницу между целевой суммой и текущим числом).
// Если это дополнение уже присутствует в хэш-таблице, значит, мы нашли пару чисел,
// сумма которых равна целевой сумме, и возвращаем эту пару. Если не нашли ни одной пары,
// возвращаем пустой массив.

//-----------------8---------------------

//Напишите функцию проверки строки на палиндром

const isPalindrome = (str) => {
    // Приводим строку к нижнему регистру и удаляем все символы, не являющиеся буквами
    const cleanedStr = str.toLowerCase().replace(/[^a-z]/g, '');

    // Сравнивает очищенную строку с её обратным вариантом
    return cleanedStr === cleanedStr.split('').reverse().join('');
};

// Пример использования
console.log(isPalindrome('Kaak'));  // Выведет true
console.log(isPalindrome('Kaadk')); // Выведет false

//-----------------9---------------------

// Как заставить код (2).plus(3).minus(1) работать ? Напишите эти функции

Number.prototype.plus = function (num) {
    return this + num;
};

Number.prototype.minus = function (num) {
    return this - num;
};

// Пример использования
const result = (2).plus(3).minus(1);
console.log(result); // Выведет 4
// добавили методы plus и minus к прототипу объекта Number.
// Теперь можно вызывать эти методы на числовых значениях,
// как показано в примере использования. Однако, помните
// о возможных негативных последствиях изменения прототипов,
// и используйте этот подход осторожно

function createCalculator(value) {
    return {
        plus: function(num) {
            return createCalculator(value + num);
        },
        minus: function(num) {
            return createCalculator(value - num);
        },
        getResult: function() {
            return value;
        }
    };
}

// Пример использования
console.log(createCalculator(2).plus(3).minus(1).getResult()); // Выведет 4
// создаем функцию createCalculator, которая возвращает объект с методами
// plus, minus и getResult. Каждый из этих методов возвращает новый объект,
// созданный с учетом текущего значения.
// Такой подход позволяет создавать цепочку вызовов, наподобие
// createCalculator(2).plus(3).minus(1).getResult(), и получать результат вычислений.
// Этот способ более безопасен, чем изменение прототипов, и более читаем,
// так как явно указывает на создание нового объекта для каждой операции.

class Calculator {
    constructor(value) {
        this.value = value;
    }

    plus(num) {
        this.value += num;
        return this;
    }

    minus(num) {
        this.value -= num;
        return this;
    }

    getResult() {
        return this.value;
    }
}

// Пример использования
const resul = new Calculator(2).plus(3).minus(1).getResult();
console.log(resul); // Выведет 4
// создаем класс Calculator, у которого есть свойство value и методы
// plus, minus, и getResult. Каждый метод изменяет состояние объекта
// и возвращает сам объект, что позволяет вызывать эти методы цепочкой.
// Этот подход также является более структурированным и поддерживаемым,
// чем изменение прототипов объектов, и более понятным, чем использование
// функций для создания цепочек вызовов.

//-----------------10---------------------

// Напишите функцию , которая принимает строку и возвращает массив, который состоит из элементов , в которых каждая следущая буква заглавная. Например:
// Строка: ‘hello’
// Возвращаемое значение: [‘Hello’, ‘hEllo’, ‘heLlo’, ’helLo’, ‘hellO’]

function capitalizeVariations(str) {
    const variations = [];

    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        const capitalized = str.slice(0, i) + char.toUpperCase() + str.slice(i + 1);
        variations.push(capitalized);
    }

    return variations;
}

// Пример использования
const inputString = 'hello';
console.log(capitalizeVariations(inputString));
// создаем пустой массив variations, который будет содержать все вариации с заглавными буквами.
// Затем мы проходим по каждому символу в строке с использованием цикла for.
// Для каждого символа мы создаем новую строку (capitalized),
// в которой текущая буква преобразуется в заглавную.
// Эта новая строка добавляется в массив variations.
// В конце функции мы возвращаем массив variations

//-----------------11---------------------

// Реализовать функцию getByPath, осуществляющую поиск данных в объекте по строковому маршруту в виде последовательности наименований вложенных свойств

function getByPath(obj, path) {
    const keys = path.split('.');

    for (const key of keys) {
        if (obj && obj.hasOwnProperty(key)) {
            obj = obj[key];
        } else {
            return undefined;
        }
    }

    return obj;
}

// Пример использования
const exampleObj = {
    a: {
        b: {
            c: "d"
        }
    },
    e: {
        f: "1"
    }
};

console.log(getByPath(exampleObj, "a.b"));    // {c: 'd'}
console.log(getByPath(exampleObj, "a.b.c"));  // 'd'
console.log(getByPath(exampleObj, "a.x.e"));  // undefined
console.log(getByPath(exampleObj, "e"));      // {f: "1"}
// Функция getByPath принимает объект и строковый путь в виде последовательности
// наименований вложенных свойств, разделенных точками. Затем она разбивает путь
// на массив ключей и проходится по объекту, следуя этим ключам.
// Если на каком-то этапе ключ не найден, функция возвращает undefined.
// В противном случае возвращается значение, соответствующее последнему ключу в пути.

//-----------------12---------------------

const countries = [
    {
        name: 'USA',
        cities: [
            {
                name: 'New York',
                population: 9,
            },
            {
                name: 'Los Angeles',
                population: 4,
            },
            {
                name: 'Chicago',
                population: 3,
            },
        ],
    },
    {
        name: 'Russia',
        cities: [
            {
                name: 'Moscow',
                population: 12,
            },
            {
                name: 'Saint Petersburg',
                population: 5,
            },
        ],
    },
    {
        name: 'China',
        cities: [],
    },
];

// 1. Получить массив названий всех городов
// Ожидаемый результат: ["New York", "Los Angeles", "Chicago", "Moscow", "Saint Petersburg"]
// Используется метод flatMap, чтобы извлечь все города из всех стран.
// Для каждого города с использованием map извлекается его имя (city.name).
function test1() {
    return countries.flatMap(country => country.cities.map(city => city.name));
}

// 2. Получить сумму населения (population) всех городов
// Ожидаемый результат: 33
// Используется flatMap, чтобы объединить все города в единый массив.
// С использованием reduce вычисляется сумма населения всех городов
function test2() {
    return countries.flatMap(country => country.cities)
    .reduce((totalPopulation, city) => totalPopulation + city.population, 0);
}

// 3. Получить название первой страны, в которой есть город с населением больше 10
// Ожидаемый результат: Russia
// Используется find, чтобы найти первую страну, удовлетворяющую условию.
// С использованием some проверяется, есть ли в этой стране хотя бы один город с населением больше 10.
function test3() {
    return countries.find(country => country.cities.some(city => city.population > 10)).name;
}

// 4. Есть ли хотя бы одна страна с пустым массивом городов
// Ожидаемый результат: true
// Используется some, чтобы проверить, есть ли хотя бы одна страна с пустым массивом городов.
function test4() {
    return countries.some(country => country.cities.length === 0);
}

module.exports = { test1, test2, test3, test4 };

// Пример использования
console.log(test1()); // ["New York", "Los Angeles", "Chicago", "Moscow", "Saint Petersburg"]
console.log(test2()); // 33
console.log(test3()); // Russia
console.log(test4()); // true

//-----------------13---------------------

let obj = {
    a: 1,
    b: {
        x: 2,
        y: 3
    },
    c: {
        z: {
            q: 4
        }
    }
};

// Object.prototype.random(): возвращает случайным образом одно из значений объекта.
// Object.prototype.toRandomArray(): возвращает массив случайных значений.

// решение
Object.prototype.random = function () {
    // flattenObject получает массив всех значений во вложенной структуре.
    // Если полученный массив пуст, возвращается значение undefined.
    // В противном случае он выбирает случайное значение из массива с помощью Math.random().
    const values = flattenObject(this);
    if (values.length === 0) {
        return undefined;
    }
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return randomValue;
};

Object.prototype.toRandomArray = function () {
    // flattenObject получает массив всех значений во вложенной структуре.
    // Если полученный массив пуст, он возвращает пустой массив.
    // В противном случае массив перемешивается с помощью функции shuffle
    const values = flattenObject(this);
    return values.length > 0 ? shuffle(values) : [];
};

function flattenObject(obj) {
    // Рекурсивно обходит объект, выталкивая все значения, не относящиеся к объекту,
    // в результирующий массив. Вложенные объекты обрабатываются рекурсивно, чтобы
    // сгладить всю структуру.
    const result = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result.push(...flattenObject(obj[key]));
            } else {
                result.push(obj[key]);
            }
        }
    }
    return result;
}

function shuffle(array) {
    // Перемешивает массив по алгоритму Фишера-Ятса, гарантируя, что каждый элемент
    // с равной вероятностью окажется на любой позиции.
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

console.log(obj.random());
console.log(obj.toRandomArray());
