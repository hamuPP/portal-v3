/**
 * Created by ty on 18/4/21.
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

    b64Md5(s) {
        let that = this;
        return that.binl2b64(that.coreMd5(that.str2binl(s), s.length * that.chrsz));
    }

    strMd5(s) {
        let that = this;
        return that.binl2str(that.coreMd5(that.str2binl(s), s.length * that.chrsz));
    }

    hexHmacMd5(key, data) {
        let that = this;
        return that.binl2hex(that.coreHmacMd5(key, data));
    }

    b64HmacMd5(key, data) {
        let that = this;
        return that.binl2b64(that.coreHmacMd5(key, data));
    }

    strHmacMd5(key, data) {
        let that = this;
        return that.binl2str(that.coreHmacMd5(key, data));
    }

    /*
     * Perform a simple self-test to see if the VM is working
     */
    md5VmTest() {
        let that = this;
        return that.hexMd5('abc') === '900150983cd24fb0d6963f7d28e17f72';
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length
     */
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

    md5Cmn(q, a, b, x, s, t) {
        let that = this;
        return that.safeAdd(that.bitRol(that.safeAdd(that.safeAdd(a, q), that.safeAdd(x, t)), s), b);
    }

    md5Ff(a, b, c, d, x, s, t) {
        let that = this;
        return that.md5Cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    md5Gg(a, b, c, d, x, s, t) {
        let that = this;
        return that.md5Cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    md5Hh(a, b, c, d, x, s, t) {
        let that = this;
        return that.md5Cmn(b ^ c ^ d, a, b, x, s, t);
    }

    md5Ii(a, b, c, d, x, s, t) {
        let that = this;
        return that.md5Cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
     * Calculate the HMAC-MD5, of a key and some data
     */
    coreHmacMd5(key, data) {
        let that = this;
        let bkey = that.str2binl(key);
        let chrsz = that.chrsz;
        if (bkey.length > 16) bkey = that.coreMd5(bkey, key.length * chrsz);
        let ipad = Array(16);
        let opad = Array(16);
        for (let i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        let hash = that.coreMd5(ipad.concat(that.str2binl(data)), 512 + data.length * chrsz);
        return that.coreMd5(opad.concat(hash), 512 + 128);
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    safeAdd(x, y) {
        let that = this;
        let lsw = (x & 0xFFFF) + (y & 0xFFFF);
        let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    bitRol(num, cnt) {
        let that = this;
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
     * Convert a string to an array of little-endian words
     * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
     */
    str2binl(str) {
        let that = this;
        let bin = [];
        let mask = (1 << that.chrsz) - 1;
        for (let i = 0; i < str.length * that.chrsz; i += that.chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / that.chrsz) & mask) << (i % 32);
        }
        return bin;
    }

    /*
     * Convert an array of little-endian words to a string
     */
    binl2str(bin) {
        let that = this;
        let chrsz = that.chrsz;
        let str = '';
        let mask = (1 << chrsz) - 1;
        for (let i = 0; i < bin.length * 32; i += chrsz) {
            str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
        }
        return str;
    }

    /*
     * Convert an array of little-endian words to a hex string.
     */
    binl2hex(binarray) {
        let that = this;
        let hexTab = that.hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
        let str = '';
        for (let i = 0; i < binarray.length * 4; i++) {
            str += that.hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                that.hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    }

    /*
     * Convert an array of little-endian words to a base-64 string
     */
    binl2b64(binarray) {
        let that = this;
        let tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let str = '';
        for (let i = 0; i < binarray.length * 4; i += 3) {
            let triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) |
                (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) |
                ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
            for (let j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > binarray.length * 32) str += that.b64pad;
                else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
            }
        }
        return str;
    }
}

export default MD5;