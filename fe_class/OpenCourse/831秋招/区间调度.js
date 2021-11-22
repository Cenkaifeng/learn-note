function intervalSchedule(intvs) {
    if (intvs.length === 0) {
        return 0 ;
    }

    const sortArray = intvs.sort((a, b) => a[1] - b[1]);

    let count = 1; //有几个区间互不相交
    let XEnd= sortArray[0][1];

    for (let item of intvs) {
        const start = item[0]; //

        if (start >= XEnd) {
            count++;
            XEnd = item[1]
        }
    }

    return count;
}