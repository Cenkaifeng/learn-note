function onInput(event) {
    const value = event.target.value;
    if (value) {
        console.log(value)
    }
}

function debounce(fn, delay) {
    let timout = null;
    return function() {
        if ( timout !== null) {
            clearTimeout(timout)
        }
        timout =setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
    }
}

const debounceOnInput = debounce(onInput, 300)