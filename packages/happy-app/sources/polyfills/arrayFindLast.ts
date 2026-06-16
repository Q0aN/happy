/**
 * Polyfill Array.prototype.findLast / findLastIndex for older Android
 * browsers and WebViews. Some dependencies assume these ES2023 APIs exist
 * and crash during app bootstrap when they do not.
 *
 * Imported first from index.ts so it runs before any module evaluates.
 */

type FindLastPredicate<T> = (value: T, index: number, array: T[]) => unknown;

if (!Array.prototype.findLast) {
    Object.defineProperty(Array.prototype, 'findLast', {
        value: function <T>(this: T[], predicate: FindLastPredicate<T>, thisArg?: unknown): T | undefined {
            if (this == null) {
                throw new TypeError('Array.prototype.findLast called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i];
                if (predicate.call(thisArg, value, i, this)) {
                    return value;
                }
            }
            return undefined;
        },
        writable: true,
        configurable: true,
    });
}

if (!Array.prototype.findLastIndex) {
    Object.defineProperty(Array.prototype, 'findLastIndex', {
        value: function <T>(this: T[], predicate: FindLastPredicate<T>, thisArg?: unknown): number {
            if (this == null) {
                throw new TypeError('Array.prototype.findLastIndex called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            for (let i = this.length - 1; i >= 0; i--) {
                if (predicate.call(thisArg, this[i], i, this)) {
                    return i;
                }
            }
            return -1;
        },
        writable: true,
        configurable: true,
    });
}
