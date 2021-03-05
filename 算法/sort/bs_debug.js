let arr = [1, 15, 37, 22 ,91, 76, 29, 35, 18, 64, 27, 85, 52];

function bs() {
    for(let i = 0; i < arr.length; i++) {
        for( let j = 0; j < arr.length - 1; j++) {
            if ( i !== j) {
                if (arr[i] < arr[j]) {
                    // let tp = arr[i];
                    // arr[i] = arr[j];
                    // arr[j] = tp;
                    arr[i] = arr[i] ^ arr[j];
                    arr[j] = arr[j] ^ arr[i];
                    arr[i] = arr[i] ^ arr[j];
                }
            }
        }
    }
}

bs();
console.log(arr);