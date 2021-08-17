
const seen = new WeakSet();

function sizeOfObject(object) {
    if (object === null) {
        return 0;
    }

    let bytes = 0;

    const properties = Object.keys(object);
    for (let i = 0; i < properties.length; i++) {
        const key = properties[i];

        if (typeof object[key] === 'object' && object[key] !== null) {// 判断对象是否有重复引用同一个
            if(seen.has(object[key])) {
                continue;
            }
            seen.add(object[key]);
        }
        bytes += calculator(key);
        bytes += calculator(object[key])
    }

    return bytes;
}

function calculator(object) {
    const objectType= typeof object;
    
    switch(objectType) {
        case 'string': {
            return object.length * 2;
        }
        case 'boolean': {
            return 4;
        }
        case 'number': {
            return 8;
        }
        case 'object': {
            if (Array.isArray(object)) {
                return object.map(calculator).reduce(function(acc, curr) {
                    return acc + curr;
                }, 0)
            } else {
                return sizeOfObject(object)
            }    
        }
        default: 
                return 0;
    }
}

const testData = {
    a: 111,
    b: 'cccc',
    2222: false,
}


console.log(calculator(testData));

