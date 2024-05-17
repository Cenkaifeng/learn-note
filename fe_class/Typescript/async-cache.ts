const cacheMap = new Map();
/**
 * 启用缓存装饰器
 *
 * @param target 目标对象
 * @param name 目标对象的属性名
 * @param descriptor 目标对象的属性描述符
 * @returns 返回修改后的属性描述符
 */
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