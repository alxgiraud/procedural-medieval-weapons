/*global d3Utils, d3, textures*/
var crossbow = (function () {
    'use strict';

    var bow = [],
        stock = [],
        string = [],
        arrow = {
            shaft: [],
            head: [],
            fletchings: []
        },

        generateBow = function (width) {
            var startX = width / 2,
                startY = 90,

                bowW = (Math.random() * 60 + 70) * 2,
                bowH = (Math.random() * 50 + 20) * 2,

                thickness = Math.random() * 4 + 5,
                gapThickness = 5,

                topCurve = Math.random() * 20 + 30,
                bottomCurve = Math.random() * 40;

            bow = [];

            //top left
            bow.push({
                x: startX,
                y: startY
            });
            bow.push({
                x: startX - topCurve,
                y: startY
            });
            bow.push({
                x: startX - bowW / 2 + bottomCurve,
                y: startY + bowH / 2
            });
            bow.push({
                x: startX - bowW / 2,
                y: startY + bowH / 2
            });


            //bottom left
            bow.push({
                x: startX - bowW / 2,
                y: startY + bowH / 2 + thickness
            });
            bow.push({
                x: startX - bowW / 2 + bottomCurve + gapThickness,
                y: startY + bowH / 2 + thickness
            });
            bow.push({
                x: startX - topCurve + gapThickness,
                y: startY + thickness
            });
            bow.push({
                x: startX,
                y: startY + thickness
            });

            //bottom right
            bow.push({
                x: startX + topCurve - gapThickness,
                y: startY + thickness
            });
            bow.push({
                x: startX + bowW / 2 - bottomCurve - gapThickness,
                y: startY + bowH / 2 + thickness
            });
            bow.push({
                x: startX + bowW / 2,
                y: startY + bowH / 2 + thickness
            });

            //top right
            bow.push({
                x: startX + bowW / 2,
                y: startY + bowH / 2
            });
            bow.push({
                x: startX + bowW / 2 - bottomCurve,
                y: startY + bowH / 2
            });
            bow.push({
                x: startX + topCurve,
                y: startY
            });

        },

        generateStock = function () {
            var startX = bow[0].x,
                startY = bow[0].y + 5,

                stockW = Math.random() * 8 + 12,
                stockH = Math.random() * 40 + 200,

                curveIntensity = Math.random() + 0.5,

                topCurvePosition = Math.random() * 0.1 * stockH + 0.1 * stockH,
                midCurvePosition = Math.random() * 0.1 * stockH + 0.3 * stockH,
                bottomCurvePosition = Math.random() * 0.1 * stockH + 0.6 * stockH;

            stock = [];
            //left side
            stock.push({
                x: startX - stockW / 2,
                y: startY
            });
            stock.push({
                x: startX - stockW / 2 + curveIntensity,
                y: startY + topCurvePosition
            });
            stock.push({
                x: startX - stockW / 2 - curveIntensity,
                y: startY + midCurvePosition
            });
            stock.push({
                x: startX - stockW / 2 + curveIntensity,
                y: startY + bottomCurvePosition
            });
            stock.push({
                x: startX - stockW / 2 + curveIntensity,
                y: startY + stockH
            });

            //right side
            stock.push({
                x: startX - stockW / 2 - curveIntensity + stockW,
                y: startY + stockH
            });

            stock.push({
                x: startX - stockW / 2 - curveIntensity + stockW,
                y: startY + bottomCurvePosition
            });

            stock.push({
                x: startX - stockW / 2 + curveIntensity + stockW,
                y: startY + midCurvePosition
            });

            stock.push({
                x: startX - stockW / 2 - curveIntensity + stockW,
                y: startY + topCurvePosition
            });
            stock.push({
                x: startX - stockW / 2 + stockW,
                y: startY
            });
        },

        generateString = function () {
            string = [];
            string.push({
                x: bow[4].x + 3,
                y: bow[4].y - 3
            });
            string.push({
                x: bow[0].x,
                y: stock[3].y
            });
            string.push({
                x: bow[10].x - 3,
                y: bow[10].y - 3
            });
        },

        generateArrow = function () {
            var shaftH = bow[0].y - (Math.random() * 15 + 5),

                headW = Math.random() * 5 + 15,
                headShape = Math.random() * 5 + 5,
                headH = headShape + (Math.random() * 10 + 5),

                fletchingsW = Math.random() * 5 + 10,
                fletchingsShape = Math.random() * 2 + 3,
                fletchingsH = fletchingsShape + Math.random() * 10 + 10;

            arrow.shaft = [];
            arrow.shaft.push({
                x: string[1].x,
                y: string[1].y
            });
            arrow.shaft.push({
                x: string[1].x,
                y: shaftH
            });

            arrow.head = [];
            arrow.head.push({
                x: arrow.shaft[1].x,
                y: arrow.shaft[1].y
            });
            arrow.head.push({
                x: arrow.shaft[1].x - headW / 2,
                y: arrow.shaft[1].y + headShape
            });
            arrow.head.push({
                x: arrow.shaft[1].x,
                y: arrow.shaft[1].y - headH
            });
            arrow.head.push({
                x: arrow.shaft[1].x + headW / 2,
                y: arrow.shaft[1].y + headShape
            });

            arrow.fletchings = [];
            //left
            arrow.fletchings.push({
                x: arrow.shaft[0].x,
                y: arrow.shaft[0].y
            });
            arrow.fletchings.push({
                x: arrow.shaft[0].x - fletchingsW / 2,
                y: arrow.shaft[0].y + fletchingsShape
            });
            arrow.fletchings.push({
                x: arrow.shaft[0].x - fletchingsW / 2,
                y: arrow.shaft[0].y - fletchingsH
            });
            arrow.fletchings.push({
                x: arrow.shaft[0].x,
                y: arrow.shaft[0].y - fletchingsH - fletchingsShape
            });

            //right
            arrow.fletchings.push({
                x: arrow.shaft[0].x + fletchingsW / 2,
                y: arrow.shaft[0].y - fletchingsH
            });
            arrow.fletchings.push({
                x: arrow.shaft[0].x + fletchingsW / 2,
                y: arrow.shaft[0].y + fletchingsShape
            });

            arrow.fletchings.push({
                x: arrow.shaft[0].x,
                y: arrow.shaft[0].y
            });
            arrow.fletchings.push({
                x: arrow.shaft[0].x,
                y: arrow.shaft[0].y - fletchingsH - fletchingsShape
            });
        },

        drawCrossbow = function (svg) {
            var arrowTexture = textures.lines()
                .orientation('3/8')
                .size(7)
                .strokeWidth(Math.random() + 1)
                .stroke('#a0a3a5')
                .background('#797d80');

            svg.append('path')
                .datum(stock)
                .attr('d', d3Utils.getCardinal(Math.random()))
                .style('fill', '#a09277')
                .style('stroke', '#3B291E')
                .style('stroke-width', '3px');

            svg.append('path')
                .datum(string)
                .attr('d', d3Utils.getCardinal(0.8))
                .style('fill', 'transparent')
                .style('stroke', '#545759')
                .style('stroke-width', '3px');

            svg.append('path')
                .datum(bow)
                .attr('d', d3Utils.getCurveBasis())
                .style('fill', '#776B53')
                .style('stroke', '#3B291E')
                .style('stroke-width', '3px');

            svg.append('path')
                .datum(arrow.shaft)
                .attr('d', d3Utils.getClosedLine())
                .style('stroke', '#3B291E')
                .style('shape-rendering', 'crispEdges')
                .style('stroke-width', '5px');

            svg.append('path')
                .datum(arrow.head)
                .attr('d', d3Utils.getClosedLine())
                .style('fill', '#797d80')
                .style('stroke', '#3b3d3f')
                .style('stroke-width', '2px');

            svg.call(arrowTexture);
            svg.append('path')
                .datum(arrow.fletchings)
                .attr('d', d3Utils.getClosedLine())
                .style('fill', arrowTexture.url())
                .style('stroke', '#3b3d3f')
                .style('stroke-width', '2px');

        };

    return {
        draw: function (svg) {
            var width = parseInt(svg.style('width'), 10);
            generateBow(width);
            generateStock();
            generateString();
            generateArrow();
            drawCrossbow(svg);
        }
    };

}());
