/*global d3*/
var d3Utils = (function () {
    'use strict';

    return {
        getCurvedLine: function () {
            return d3.line()
                .curve(d3.curveBundle)
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                });
        },

        getClosedLine: function () {
            return d3.line()
                .curve(d3.curveLinearClosed)
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                });
        },

        getCardinalClosedLine: function (tension) {
            return d3.line()
                .curve(d3.curveCardinalClosed.tension(tension))
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                });
        },

        getCardinal: function (tension) {
            return d3.line()
                .curve(d3.curveCardinal.tension(tension))
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                });
        },

        getCurveBasis: function () {
            return d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                });
        },

        getCurveBasisClosed: function () {
            return d3.line()
                .curve(d3.curveBasisClosed)
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                });
        }
    };

}());
