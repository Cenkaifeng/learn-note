import Router, { RoutePath } from '../router';

export type BaseRouteType = Dictionary<string>; // {string: string}

export interface IndexParam extends BaseRouteType {
    name: string;
}

export interface AboutParam extends BaseRouteType {
    testName: string;
}

export interface UserParam extends BaseRouteType {
    userId: string;
}

// 通过映射把接口和路由关联起来

export interface ParamMap {
    [RoutePath.Index]: IndexParam;
    [RoutePath.About]: AboutParam;
    [RoutePath.User]: UserParam;
}

export class RouterHelper {
    public static replace<T extends RoutePath>(routePath: T, params: ParamMap[T]) {
        Router.reaplace({
            path: routePath,
            query: params
        })
    }
    public static push<T extends RoutePath>(routePath: T, params: ParamMap[T]) {
        Router.push({
            path: routePath,
            query: params
        })
    }
}