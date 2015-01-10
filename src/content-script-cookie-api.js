/*
 * https://github.com/syoungblut
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global, undefined) {
    'use strict';

    var factory = function (window) {
        if (typeof window.document !== 'object') {
            throw new Error('GitHubWitespaceCookie.js requires a `window` with a `document` object');
        }
        
        var GitHubWitespaceCookie = {
        };

        // Allows for setter injection in unit tests
        GitHubWitespaceCookie._document = window.document;
        GitHubWitespaceCookie.isEnabled = function() {
          return Cookies.get("b2a-ghws") === "true";
        };
        GitHubWitespaceCookie.enable = function() {
          Cookies.set("b2a-ghws", "true", { expires: new Date(2037, 1, 19) });
        };
        GitHubWitespaceCookie.disable = function() {
          Cookies.expire("b2a-ghws");
        };


        return GitHubWitespaceCookie;
    };

    var cookiesExport = typeof global.document === 'object' ? factory(global) : factory;

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () { return cookiesExport; });
    // CommonJS/Node.js support
    } else if (typeof exports === 'object') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module === 'object' && typeof module.exports === 'object') {
            exports = module.exports = cookiesExport;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.GitHubWitespaceCookie = cookiesExport;
    } else {
        global.GitHubWitespaceCookie = cookiesExport;
    }
})(typeof window === 'undefined' ? this : window);
