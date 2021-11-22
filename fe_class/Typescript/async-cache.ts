const cacheMap = new Map();
export function EnableCache(target: any, name: string, descriptor: PropertyDescriptor) {
    const val = descriptor.value;
    descriptor.value = async function (...args: any) {
        const cacheKey = name + JSON.stringify(args);
        if (!cacheMap.get(cacheKey)) {
            const cacheValue = Promise.resolve(val.apply(this, args)).catch( _ => {
                cacheMap.set(cacheKey, null);
            });

            cacheMap.set(cacheKey, cacheValue);
        }
        return cacheMap.get(cacheKey);
    };
    
    return descriptor;
}

// 用法

class Test{

    @EnableCache
    public getInfo() {
        return axios.get('/info');
    }
}