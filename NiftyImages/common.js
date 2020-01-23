"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color = require('chartjs-color');
var NiftyUtils;
(function (NiftyUtils) {
    /**
 *
 * @param val
 */
    function isBlank(val) {
        return (!val || val.length === 0 || !(val + '').trim());
    }
    NiftyUtils.isBlank = isBlank;
    function isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    /**
    * Copy the values of all of the enumerable own properties from one or more source objects to a
    * target object. Returns the target object.
    * @param target The target object to copy to.
    * @param source The source object from which to copy properties.
    */
    function merge(target, source) {
        // return Object.assign<any, T, any>({}, defaults, options);
        let output = Object.assign({}, target);
        if (isObject(target) && isObject(source)) {
            Object.keys(source).forEach(key => {
                if (isObject(source[key])) {
                    if (!(key in target))
                        Object.assign(output, { [key]: source[key] });
                    else
                        output[key] = merge(target[key], source[key]);
                }
                else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    }
    NiftyUtils.merge = merge;
    function isNumber(x) {
        if (typeof x === "number")
            return true;
        var v = parseInt(x + '', 10);
        return !isNaN(v);
    }
    NiftyUtils.isNumber = isNumber;
    function isBoolean(x) {
        return typeof x === 'boolean';
    }
    NiftyUtils.isBoolean = isBoolean;
    function isColor(x) {
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
    NiftyUtils.isColor = isColor;
    function getColor(x, defaultColor) {
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
        return (defaultColor !== null && defaultColor !== void 0 ? defaultColor : '');
    }
    NiftyUtils.getColor = getColor;
    function deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    NiftyUtils.deepCopy = deepCopy;
})(NiftyUtils = exports.NiftyUtils || (exports.NiftyUtils = {}));
//# sourceMappingURL=common.js.map