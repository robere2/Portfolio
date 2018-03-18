/*!
 * Font Awesome Pro 5.0.8 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Commercial License)
 */
(function () {
    'use strict';

    var _WINDOW = {};
    try {
        if (typeof window !== 'undefined') _WINDOW = window;

    } catch (e) {}

    var _ref = _WINDOW.navigator || {};
    var _ref$userAgent = _ref.userAgent;
    var userAgent = _ref$userAgent === undefined ? '' : _ref$userAgent;

    var WINDOW = _WINDOW;





    var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

    var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';







    var PRODUCTION = function () {
        try {
            return "production" === 'production';
        } catch (e) {
            return false;
        }
    }();

    var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);



    var RESERVED_CLASSES = ['xs', 'sm', 'lg', 'fw', 'ul', 'li', 'border', 'pull-left', 'pull-right', 'spin', 'pulse', 'rotate-90', 'rotate-180', 'rotate-270', 'flip-horizontal', 'flip-vertical', 'stack', 'stack-1x', 'stack-2x', 'inverse', 'layers', 'layers-text', 'layers-counter'].concat(oneToTen.map(function (n) {
        return n + 'x';
    })).concat(oneToTwenty.map(function (n) {
        return 'w-' + n;
    }));

    function bunker(fn) {
        try {
            fn();
        } catch (e) {
            if (!PRODUCTION) {
                throw e;
            }
        }
    }

    var w = WINDOW || {};

    if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
    if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
    if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
    if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];

    var namespace = w[NAMESPACE_IDENTIFIER];

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function define(prefix, icons) {
        var normalized = Object.keys(icons).reduce(function (acc, iconName) {
            var icon = icons[iconName];
            var expanded = !!icon.icon;

            if (expanded) {
                acc[icon.iconName] = icon.icon;
            } else {
                acc[iconName] = icon;
            }
            return acc;
        }, {});

        if (typeof namespace.hooks.addPack === 'function') {
            namespace.hooks.addPack(prefix, normalized);
        } else {
            namespace.styles[prefix] = _extends({}, namespace.styles[prefix] || {}, normalized);
        }

        /**
         * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
         * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
         * for `fas` so we'll easy the upgrade process for our users by automatically defining
         * this as well.
         */
        if (prefix === 'fas') {
            define('fa', icons);
        }
    }

    var icons = {
        "hypixel": [170, 320, [], "f96e", "M42,244l-13,6s32,78,63,92V175h12V290s41-10,63-63l-11-5V103s2-66,31-93c0,0-36-11-82,12l1,104v6H93L92,25S36,47,14,74c0,0,16,4,27,18Z"],
        "quickplay": [300, 370, [], "f98e", "m85.6 36.025c-20.307 1.52-28.227 8.271-30.236 25.775-0.394 3.431-0.391 224.61 3e-3 228 1.701 14.644 7.289 21.741 19.289 24.5 4.555 1.047-0.071 0.978 72.935 1.093l67.49 0.107 12.953 29.877c7.124 16.432 12.987 29.91 13.027 29.951 0.041 0.041 8.673 0.051 19.182 0.023l19.107-0.051-12.957-29.9-12.956-29.9 7.431-0.056c6.749-0.05 8.204 2e-3 15.832 0.573 33.118 2.48 50.294-5.41 54.194-24.897 0.867-4.33 0.905-5.727 0.905-33.62l1e-3 -26.599-18.8 18.799-18.8 18.799v6.651 6.651l-28.017-0.05-28.017-0.051-4.211-9.15c-2.316-5.033-4.311-9.15-4.434-9.15-0.122 0-4.362 4.14-9.421 9.2l-9.198 9.2h-59.151-59.151v-106.2-106.2h100.8 100.8v4.95 4.951l18.8 18.799 18.8 18.799-2e-3 -25.399c-2e-3 -28.809-0.098-31.32-1.42-37.1-2.722-11.905-8.631-16.143-25.294-18.141-3.107-0.372-214.62-0.598-219.48-0.234m45.097 41.135c-1.883 0.651-2.801 1.412-7.81 6.474-5.869 5.931-6.101 6.284-6.249 9.503-0.109 2.376 0.382 4.113 1.639 5.789 0.485 0.646 17.495 17.779 37.801 38.073l36.921 36.9-37.37 37.4c-23.891 23.912-37.553 37.727-37.88 38.304-1.352 2.391-1.537 5.745-0.451 8.197 0.888 2.005 10.1 11.276 12.275 12.354 2.869 1.422 6.599 1.083 9.153-0.831 2.946-2.208 90.578-90.35 91.192-91.723 0.867-1.936 0.867-5.464 0-7.4-0.649-1.451-89.122-90.35-91.497-91.938-2.129-1.424-5.431-1.895-7.724-1.102m70 0c-1.883 0.651-2.801 1.412-7.81 6.474-5.869 5.931-6.101 6.284-6.249 9.503-0.109 2.376 0.382 4.113 1.639 5.789 0.485 0.646 17.495 17.779 37.801 38.073l36.921 36.9-37.37 37.4c-23.891 23.912-37.553 37.727-37.88 38.304-1.352 2.391-1.537 5.745-0.451 8.197 0.888 2.005 10.1 11.276 12.275 12.354 2.869 1.422 6.599 1.083 9.153-0.831 2.946-2.208 90.578-90.35 91.192-91.723 0.867-1.936 0.867-5.464 0-7.4-0.649-1.451-89.122-90.35-91.497-91.938-2.129-1.424-5.431-1.895-7.724-1.102m70 0c-1.883 0.651-2.801 1.412-7.81 6.474-5.869 5.931-6.101 6.284-6.249 9.503-0.109 2.376 0.382 4.113 1.639 5.789 0.485 0.646 17.495 17.779 37.801 38.073l36.921 36.9-37.37 37.4c-23.891 23.912-37.553 37.727-37.88 38.304-1.352 2.391-1.537 5.745-0.451 8.197 0.888 2.005 10.1 11.276 12.275 12.354 2.869 1.422 6.599 1.083 9.153-0.831 2.946-2.208 90.578-90.35 91.192-91.723 0.867-1.936 0.867-5.464 0-7.4-0.649-1.451-89.122-90.35-91.497-91.938-2.129-1.424-5.431-1.895-7.724-1.102"]
    };

    bunker(function () {
        define('fac', icons);
    });

}());
