let cookie = [];
module.exports = {
    '/api/*': {
        target: "http://dev.hamdamapi.ir",
        secure: true,
        logLevel: "debug",
        changeOrigin: true,
        withCredentials: true,
        cookieDomainRewrite:{
            "https://dev.accounts.idall.pro":"localhost"
        },
        // onProxyReq: (proxyReq, req) => {
        //     if (cookie.length > 0) {
        //         // let joined = cookie.join('; ');
        //         proxyReq.setHeader('Cookie', cookie);
        //     }
        // },
        // onProxyRes: (proxyRes) => {
        //     Object.keys(proxyRes.headers).forEach((key) => {
        //         if (key === 'set-cookie') {
        //             cookie = proxyRes.headers[key][0].split('; ')[0];
        //             // proxyRes.setHeader('foo', 'bar');
        //             //const cookieValue = proxyRes.headers[key];
        //             // cookie.push(cookieValue);
        //             //const cookieTokens = split(proxyRes.headers[key], ',');
        //             //cookie = cookieTokens.filter(element => element.includes('idall.auth')).join(';');
        //         }
        //     })
        // }

    }
};
