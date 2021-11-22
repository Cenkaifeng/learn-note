function appendParamToUrl(url: string, params: { [key: string]: string | number }): string {
    const arr = Object.entries(params);
    if (arr.length) {
        let res = url.indexOf('?') !== -1 ? url + '&' : url + '?';
        res += arr
            .reduce((pre, cur) => {
                return `${pre}&${cur[0]}=${encodeURIComponent(String(cur[1]))}`;
            }, '')
            .slice(1);
        return res;
    }
    return url;
}