import {
    Context,
    extend,
    OnionMiddleware,
    RequestInterceptor,
    RequestMethod,
    RequestOptionsInit,
    ResponseInterceptor
} from "umi-request";

const mapKey2RequestMethodInstance: Map<string, RequestMethod> = new Map<string, RequestMethod>();

interface RequestConfig extends RequestOptionsInit {
    errorConfig?: {
        errorPage?: string;
        adaptor?: (resData: any, ctx: Context) => any, // ErrorInfoStructure;
    };
    middlewares?: OnionMiddleware[];
    requestInterceptors?: RequestInterceptor[];
    responseInterceptors?: ResponseInterceptor[];
}

// 服务key
const getRequestMethod = (key: string) => {
    if (mapKey2RequestMethodInstance.has(key)) {
        return mapKey2RequestMethodInstance.get(key);
    }

    // @ts-ignore
    const requestConfig: RequestConfig = {}

    const requestMethodInstance = extend({
        prefix: "http://uac.test"
        // errorHandler: (error: RequestError) => {
        //     // @ts-ignore
        //     if (error?.request?.options?.skipErrorHandler) {
        //         throw error;
        //     }
        //     let errorInfo: ErrorInfoStructure | undefined;
        //     if (error.name === 'ResponseError' && error.data && error.request) {
        //         const ctx: Context = {
        //             req: error.request,
        //             res: error.response,
        //         };
        //         errorInfo = errorAdaptor(error.data, ctx);
        //         error.message = errorInfo?.errorMessage || error.message;
        //         error.data = error.data;
        //         error.info = errorInfo;
        //     }
        //     errorInfo = error.info;
        //
        //     if (errorInfo) {
        //         const errorMessage = errorInfo?.errorMessage;
        //         const errorCode = errorInfo?.errorCode;
        //         const errorPage =
        //             requestConfig.errorConfig?.errorPage || DEFAULT_ERROR_PAGE;
        //
        //         switch (errorInfo?.showType) {
        //             case ErrorShowType.SILENT:
        //                 // do nothing
        //                 break;
        //             case ErrorShowType.WARN_MESSAGE:
        //                 message.warn(errorMessage);
        //                 break;
        //             case ErrorShowType.ERROR_MESSAGE:
        //                 message.error(errorMessage);
        //                 break;
        //             case ErrorShowType.NOTIFICATION:
        //                 notification.open({
        //                     message: errorMessage,
        //                 });
        //                 break;
        //             case ErrorShowType.REDIRECT:
        //                 // @ts-ignore
        //                 history.push({
        //                     pathname: errorPage,
        //                     query: { errorCode, errorMessage },
        //                 });
        //                 // redirect to error page
        //                 break;
        //             default:
        //                 message.error(errorMessage);
        //                 break;
        //         }
        //     } else {
        //         message.error(error.message || 'Request error, please retry.');
        //     }
        //     throw error;
        // },
        // ...requestConfig,
    });

    // 中间件统一错误处理
    // 后端返回格式 { success: boolean, data: any }
    // 按照项目具体情况修改该部分逻辑
    requestMethodInstance.use(async (ctx, next) => {
        await next();
        if (ctx.res.code == 0) {
            ctx.res = ctx.res.data
        } else {
            // error
        }

        // const {req, res} = ctx;
        // // @ts-ignore
        // if (req.options?.skipErrorHandler) {
        //     return;
        // }
        // const {options} = req;
        // const {getResponse} = options;
        // const resData = getResponse ? res.data : res;
        // const errorInfo = errorAdaptor(resData, ctx);
        // if (errorInfo.success === false) {
        //     // 抛出错误到 errorHandler 中处理
        //     const error: RequestError = new Error(errorInfo.errorMessage);
        //     error.name = 'BizError';
        //     error.data = resData;
        //     error.info = errorInfo;
        //     throw error;
        // }
    });

    // Add user custom middlewares
    const customMiddlewares = requestConfig.middlewares || [];
    customMiddlewares.forEach((mw: OnionMiddleware) => {
        requestMethodInstance.use(mw);
    });

    // Add user custom interceptors
    const requestInterceptors = requestConfig.requestInterceptors || [];
    const responseInterceptors = requestConfig.responseInterceptors || [];
    requestInterceptors.map((ri: RequestInterceptor) => {
        requestMethodInstance.interceptors.request.use(ri);
    });

    requestMethodInstance.interceptors.response.use((response: Response, options: RequestOptionsInit) => {
        return response;
    })
    responseInterceptors.map((ri: ResponseInterceptor) => {
        requestMethodInstance.interceptors.response.use(ri);
    });

    mapKey2RequestMethodInstance.set(key, requestMethodInstance)
    return requestMethodInstance;
}

export {getRequestMethod, RequestConfig};
