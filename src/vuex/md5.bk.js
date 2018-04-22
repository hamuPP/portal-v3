/**
 * Created by ty on 18/3/7.
 */
class MD5 {
    constructor() {
        this.hexcase = 0;
        /* hex output format. 0 - lowercase; 1 - uppercase  */
        this.b64pad = '';
        /* base-64 pad character. "=" for strict RFC compliance */
        this.chrsz = 8;
        /* bits per input character. 8 - ASCII; 16 - Unicode  */
    }

    hexMd5(s) {
        let that = this;
        return that.binl2hex(that.coreMd5(that.str2binl(s), s.length * that.chrsz));
    }

    binl2hex(binarray) {
        let that = this;

        let hexTab = that.hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
        let str = '';
        for (let i = 0; i < binarray.length * 4; i++) {
            str += hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    }

    coreMd5(x, len) {
        let that = this;

        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        let a = 1732584193;
        let b = -271733879;
        let c = -1732584194;
        let d = 271733878;
        for (let i = 0; i < x.length; i += 16) {
            let olda = a;
            let oldb = b;
            let oldc = c;
            let oldd = d;
            a = that.md5Ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = that.md5Ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = that.md5Ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = that.md5Ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = that.md5Ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = that.md5Ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = that.md5Ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = that.md5Ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = that.md5Ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = that.md5Ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = that.md5Ff(c, d, a, b, x[i + 10], 17, -42063);
            b = that.md5Ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = that.md5Ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = that.md5Ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = that.md5Ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = that.md5Ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = that.md5Gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = that.md5Gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = that.md5Gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = that.md5Gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = that.md5Gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = that.md5Gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = that.md5Gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = that.md5Gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = that.md5Gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = that.md5Gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = that.md5Gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = that.md5Gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = that.md5Gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = that.md5Gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = that.md5Gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = that.md5Gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = that.md5Hh(a, b, c, d, x[i + 5], 4, -378558);
            d = that.md5Hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = that.md5Hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = that.md5Hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = that.md5Hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = that.md5Hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = that.md5Hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = that.md5Hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = that.md5Hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = that.md5Hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = that.md5Hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = that.md5Hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = that.md5Hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = that.md5Hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = that.md5Hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = that.md5Hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = that.md5Ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = that.md5Ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = that.md5Ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = that.md5Ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = that.md5Ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = that.md5Ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = that.md5Ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = that.md5Ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = that.md5Ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = that.md5Ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = that.md5Ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = that.md5Ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = that.md5Ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = that.md5Ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = that.md5Ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = that.md5Ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = that.safeAdd(a, olda);
            b = that.safeAdd(b, oldb);
            c = that.safeAdd(c, oldc);
            d = that.safeAdd(d, oldd);
        }
        return [a, b, c, d];
    }

    str2binl(str) {
        let that = this;

        let bin = [];
        let mask = (1 << that.chrsz) - 1;
        for (let i = 0; i < str.length * that.chrsz; i += that.chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / that.chrsz) & mask) << (i % 32);
            return bin;
        }
    }

    md5Ff(a, b, c, d, x, s, t) {
        let that = this;
        return that.md5Cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    md5Gg(a, b, c, d, x, s, t) {
        let that = this;
        return that.md5Cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    md5Cmn(q, a, b, x, s, t) {
        let that = this;
        return that.safeAdd(that.bitRol(that.safeAdd(that.safeAdd(a, q), that.safeAdd(x, t)), s), b);
    }

    safeAdd(x, y) {
        let lsw = (x & 0xFFFF) + (y & 0xFFFF);
        let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    bitRol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    md5Hh(a, b, c, d, x, s, t) {
        let that = this;
        return that.md5Cmn(b ^ c ^ d, a, b, x, s, t);
    }

    md5Ii(a, b, c, d, x, s, t) {
        let that = this;
        return that.md5Cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
}

export default MD5;