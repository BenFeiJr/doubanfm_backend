/**
 * api
 * song get 获取
 * song put 修改 type=like/dislike
 */

const https = require('https');

class Song {
    constructor () {
        this._config = {
            host: 'fm.douban.com',
            path: '/j/v2/playlist',
            params: {
                channel: '-10',
                kbps: '128',
                client: 's:mainsite|y:3.0',
                app_name: 'radio_website',
                version: '100'

            }
        };
    }

    _request (params = {}) {
        return new Promise ((resolve, reject) => {
            const paramsString = Object.keys(Object.assign(params, this._config.params)).map((key) => {
                return `${key}=${params[key]}`;
            }).join('&');

            const doubanReq = https.request({
                host: this._config.host,
                path: `${this._config.path}?${paramsString}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
                }
            }, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    resolve(chunk);
                });
                res.on('end', () => {
                    console.log('请求结束')
                });
            });
            
            doubanReq.on('error', (e) => {
                console.error(e.message);
                reject(e.message);
            });
            
            doubanReq.end();
        })
    }

    get () {
        return this._request({ type: 'n' });
    }

    like () {
        return this._request({ type: 'n' });
    }

    dislike () {
        return this._request({ type: 'n' });
    }
}

module.exports = Song;

