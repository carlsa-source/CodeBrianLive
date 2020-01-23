
var Color = require('chartjs-color');

export namespace NiftyUtils {

    /**
 * 
 * @param val
 */
    export function isBlank(val: any): boolean {

        return (!val || val.length === 0 || !(val + '').trim());

    }

    function isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

/**
* Copy the values of all of the enumerable own properties from one or more source objects to a
* target object. Returns the target object.
* @param target The target object to copy to.
* @param source The source object from which to copy properties.
*/
    export function merge<T>(target: T, source: any): T {

        // return Object.assign<any, T, any>({}, defaults, options);

        let output = Object.assign({}, target);
        if (isObject(target) && isObject(source)) {
            Object.keys(source).forEach(key => {
                if (isObject(source[key])) {
                    if (!(key in target))
                        Object.assign(output, { [key]: source[key] });
                    else
                        output[key] = merge<T>(target[key], source[key]);
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;

    }


    export function isNumber(x: any): x is number {

        if (typeof x === "number")
            return true;

        var v = parseInt(x + '', 10);

        return !isNaN(v);

    }

    export function isBoolean(x: any): x is boolean {
        return typeof x === 'boolean';
    }

    export function isColor(x: any): boolean {

        var val = x + '';

        if (isBlank(val)) {
            return false;
        }

        var c = Color(val + '');

        if (c.isValid()) {
            return true;
        }

        // Not a valid rgb, or Hex

        if (val.indexOf('#') < 0) {
            c = Color('#' + val);
        }

        return c.isValid();

    }

    export function getColor(x: any, defaultColor?: string): string {

        var val = x + '';

        var c = Color(val);

        if (c.isValid()) {
            return c.rgbString();
        }

        if (val.indexOf('#') < 0) {
            c = Color('#' + val);
        }

        if (c.isValid()) {
            return c.rgbString();
        }

        return defaultColor ?? '';

    }

    export function deepCopy<T>(obj): T {
        
        return JSON.parse(JSON.stringify(obj)) as T;

    }

}
