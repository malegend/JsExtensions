/**
 * Projects each element of a sequence into a new form.
 * @param func {(a: T) => T} A transform function to apply to each element.
 * @returns {T[]} An Array whose elements are the result of invoking the transform function on each element of source.
 */
Array.prototype.select = function (func) {
    let me = this;
    if (!Array.isArray(me)) return me;
    let out = new Array(me.length);
    for (let i = 0; i < me.length; i++) {
        out[i] = func(me[i]);
    }
    return out;
};

/**
 * Filters a sequence of values based on a predicate.
 * @param func {(a: T) => boolean} A function to test each element for a condition.
 * @returns {T[]} An Array that contains elements from the input sequence that satisfy the condition.
 */
Array.prototype.where = function (func) {
    let me = this;
    if (!Array.isArray(me)) return me;
    let out = [];
    for (let i = 0; i < me.length; i++) {
        if (func(me[i]))
            out.push(me[i]);
    }
    return out;
};

/**
 * Sorts the elements of a sequence in ascending order according to a key.
 * @param func {(a: T, b: T) => number} A function to extract a key from an element.
 * @returns {T[]} An Array whose elements are sorted according to a key.
 */
Array.prototype.orderBy = function (func) {
    let me = this;
    if (!Array.isArray(me)) return me;
    return me.sort(func)
};

/**
 * Groups the elements of a sequence according to a specified key selector function
 * and creates a result value from each group and its key. Key values are compared
 * by using a specified comparer, and the elements of each group are projected by
 * using a specified function.
 * @param func {(a:T)=>any} A function to extract the key for each element.
 * @returns {T[]}
 */
Array.prototype.groupBy = function (func) {
    let me = this;
    if (!Array.isArray(me)) return me;
    let out = [];
    for (let a of me) {
        let gp = func(a);
        let gk = JSON.stringify(gp);
        out[gk] = out[gk] || { key: gp, items: [] };
        out[gk].items.push(a);
    }
    return out;
};

/**
 * Remove duplicate elements from the Array
 * @returns {T[]}
 */
Array.prototype.unique = function () {
    let arr = this;
    if (!Array.isArray(arr) || arr.length === 0) return arr;

    return [...new Set(arr)];
};

/**
 * Returns the first element of a sequence, or a undefined value if the sequence contains no elements.
 * @param func {(a: T) => boolean}  A function to test each element for a condition. If func is undefined, then return the first element of the sequence.
 * @returns {T} the first element of a sequence or undefined.
 */
Array.prototype.first = function (func) {
    let arr = this;
    if (!Array.isArray(arr) || arr.length === 0) return void 0;

    if (typeof func !== "function") return arr[0];

    for (let a of arr) {
        if (func(a)) return a;
    }
    return void 0;
};

/**
 * Returns the last element of a sequence, or a undefined value if the sequence contains no elements.
 * @param func {(a: T) => boolean}  A function to test each element for a condition. If func is undefined, then return the last element of the sequence.
 * @returns {T} the last element of a sequence or undefined.
 */
Array.prototype.last = function (func) {
    let arr = this;
    if (!Array.isArray(arr) || arr.length === 0) return void 0;
    if (typeof func !== "function") return arr[arr.length - 1];
    let beg = arr.length - 1;
    for (let i = beg; i >= 0; i--) {
        let a = arr[i];
        if (func(a)) return a;
    }
    return void 0;
};

/**
 * Take a random element from the Array.
 * @param ignores {[]}  Ignored elements.
 * @returns {T}
 */
Array.prototype.random = function (ignores) {
    let items = this;
    if (!Array.isArray(items)) return void 0;
    let ig = ignores || [];
    if (items.length == ig.length) return void 0;// If lenght of "ignored elements" equals Array.length then return undefined;

    while (true) {
        let idx = Math.floor(Math.random() * items.length);
        let tm = items[idx];
        if (!ig.includes(tm))
            return tm;
    }
};

/**
 * Take specified number of randomly elements from the sequence.
 * @param count {number}
 * @returns {T[]}
 */
Array.prototype.takeItems = function (count) {
    if (!Array.isArray(this) || this.length == 0) return this;
    let items = this;
    let idxs = new Array(count);

    let mxs = items.length;
    for (let i = 0; i < Math.max(mxs, count); i++) {
        idxs[i] = i % mxs;
    }
    let idxt = [];
    let cnt = 0;

    let qt = 0;
    while (cnt < count) {
        let qdx = Math.floor(Math.random() * mxs);
        if (idxt.indexOf(qdx, qt) < 0) {
            idxt.push(qdx);
            if (++cnt % mxs === 0) qt += mxs;
        }
    }

    let out = new Array(count);
    for (let i = 0; i < count; i++) {
        out[i] = items[idxs[idxt[i]]];
    }
    return out;
}
