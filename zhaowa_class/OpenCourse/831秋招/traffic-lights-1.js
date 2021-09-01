
const TRAFFIC_LIGHT_CONFIG = {
    'GREEN': 3000,
    'YELLOW': 1000,
    'RED': 2000
}

async function changeColor(color, duration) {
    document.getElementsById('traffic-light').style.background = color;
    await delay(TRAFFIC_LIGHT_CONFIG[color])
}
function delay(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}
async function run() {
    // // while(true) {
    //     await changeColor('green', 3000)
    //     await changeColor('yellow',1000)
    //     await changeColor('red', 2000)
    // // }
    

    for ( let key in TRAFFIC_LIGHT_CONFIG) {
        await changeColor(key);
    }
    run();
 }

 run();

