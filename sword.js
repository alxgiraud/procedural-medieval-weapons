/*global d3Utils, d3, textures*/
var sword = (function () {
    'use strict';

    var blade = {
            height: 200 // TODO: rename, it's not the final height of the blade! A bit messy...
        },
        hilt = {},

        generateClassicalBlade = function (width) {
            var shape = 0,
                shapePosition = 6 + Math.random() * 4,
                startX = 0,
                startY = 80,
                pointSize = 15 + Math.floor(Math.random() * 15 + 1);

            blade.width = 20 + Math.floor(Math.random() * 10);
            shape = Math.floor(Math.random() * blade.width / 2 + 1);
            startX = (width - blade.width) / 2;

            blade.leftEdge = [];
            blade.leftEdge.push({
                x: startX,
                y: startY
            });
            blade.leftEdge.push({
                x: startX - shape,
                y: startY + blade.height / shapePosition
            });
            blade.leftEdge.push({
                x: startX,
                y: startY + blade.height
            });

            blade.rightEdge = [];
            blade.rightEdge.push({
                x: blade.leftEdge[2].x + blade.width,
                y: blade.leftEdge[2].y
            });
            blade.rightEdge.push({
                x: blade.leftEdge[1].x + blade.width + shape * 2,
                y: blade.leftEdge[1].y
            });
            blade.rightEdge.push({
                x: blade.leftEdge[0].x + blade.width,
                y: blade.leftEdge[0].y
            });

            blade.point = [];
            blade.point.push(blade.leftEdge[0]);
            blade.point.push({
                x: blade.leftEdge[0].x + (blade.width / 2),
                y: blade.leftEdge[0].y - pointSize
            });
            blade.point.push(blade.rightEdge[blade.rightEdge.length - 1]);
            blade.point.push({
                x: blade.leftEdge[0].x + (blade.width / 2),
                y: blade.leftEdge[0].y + pointSize
            });

            blade.centralRidge = [];
            blade.centralRidge.push({
                x: blade.point[blade.point.length - 1].x,
                y: blade.point[blade.point.length - 1].y
            });
            blade.centralRidge.push({
                x: blade.point[blade.point.length - 1].x,
                y: blade.rightEdge[0].y
            });
            //Add the first point again for filling purpose (join left, right and center together)
            blade.centralRidge.push(blade.centralRidge[0]);
        },

        generateScimitarBlade = function (width) {
            var startX = 0,
                startY = 0,
                bottomCurveIntensity = Math.random() * 5 + 4,
                leftBottomBladePosition = {
                    x: Math.random() * 10 + 20,
                    y: Math.random() * 70 + 110
                },
                point = {
                    x: Math.random() * 5 + 10,
                    y: Math.random() * 20 + 60
                },
                topCurveIntensity = Math.random() * 5 + 4,
                rightBladeCurve = {
                    x: Math.random() * 10 + 50,
                    y: Math.random() * 20 + 40
                };

            blade.width = 20 + Math.floor(Math.random() * 10);
            startX = (width - blade.width) / 2;
            startY = blade.height + 80;

            blade.leftBottomEdge = [];
            blade.leftBottomEdge.push({
                x: startX,
                y: startY
            });
            blade.leftBottomEdge.push({
                x: startX - leftBottomBladePosition.x / 2 + topCurveIntensity,
                y: startY - leftBottomBladePosition.y / 2
            });
            blade.leftBottomEdge.push({
                x: startX - leftBottomBladePosition.x,
                y: startY - leftBottomBladePosition.y
            });

            blade.leftTopEdge = [];
            blade.leftTopEdge.push(blade.leftBottomEdge[2]);
            blade.leftTopEdge.push({
                x: blade.leftBottomEdge[2].x + point.x / 2 + topCurveIntensity,
                y: blade.leftBottomEdge[2].y - point.y / 2
            });
            blade.leftTopEdge.push({
                x: blade.leftBottomEdge[2].x + point.x,
                y: blade.leftBottomEdge[2].y - point.y
            });

            blade.rightEdge = [];
            blade.rightEdge.push(blade.leftTopEdge[blade.leftTopEdge.length - 1]);
            blade.rightEdge.push({
                x: blade.leftTopEdge[blade.leftTopEdge.length - 1].x + rightBladeCurve.x,
                y: blade.leftTopEdge[blade.leftTopEdge.length - 1].y + rightBladeCurve.y
            });
            blade.rightEdge.push({
                x: (width + blade.width) / 2,
                y: startY
            });

            blade.reflect = [];
            blade.reflect.push({
                x: blade.rightEdge[0].x,
                y: blade.rightEdge[0].y
            });
            blade.reflect.push({
                x: blade.rightEdge[1].x,
                y: blade.rightEdge[1].y
            });
            blade.reflect.push({
                x: blade.rightEdge[2].x,
                y: blade.rightEdge[2].y
            });

        },

        generateTwistedShape = function (width) {
            var startX = 0,
                startY = 0,
                x,
                y,
                step = Math.random() * 3 + 6,
                variance = Math.random() * 3 + 3,
                pointSize = Math.random() * 10 + 20,
                i;

            blade.width = 20 + Math.floor(Math.random() * 10);
            startX = (width - blade.width) / 2;
            startY = blade.height + 80;

            x = startX;

            //left edge
            blade.leftEdge = [];
            blade.leftEdge.push({
                x: startX,
                y: startY
            });
            blade.leftEdge.push({
                x: startX,
                y: startY - 10
            });
            y = startY - 10;
            for (i = 0; i < step; i += 1) {
                variance *= -1;
                y -= (blade.height - pointSize) / step;
                blade.leftEdge.push({
                    x: x - variance,
                    y: y
                });
            }

            blade.leftEdge.push({
                x: width / 2,
                y: blade.leftEdge[blade.leftEdge.length - 1].y - pointSize
            });

            //right edge
            blade.rightEdge = [];
            blade.rightEdge.push(blade.leftEdge[blade.leftEdge.length - 1]);

            for (i = blade.leftEdge.length - 2; i > 0; i -= 1) {
                blade.rightEdge.push({
                    x: blade.leftEdge[i].x + blade.width,
                    y: blade.leftEdge[i].y
                });
            }

            blade.rightEdge.push({
                x: startX + blade.width,
                y: startY
            });

            //central ridge
            blade.centralRidge = [];
            blade.centralRidge.push(blade.leftEdge[blade.leftEdge.length - 1]);

            for (i = blade.leftEdge.length - 2; i > 0; i -= 1) {
                blade.centralRidge.push({
                    x: blade.leftEdge[i].x + blade.width / 2,
                    y: blade.leftEdge[i].y
                });
            }

            blade.centralRidge.push({
                x: startX + blade.width / 2,
                y: startY
            });

            //reflects
            blade.leftReflect = [];
            for (i = 0; i < blade.leftEdge.length; i += 1) {
                blade.leftReflect.push({
                    x: blade.leftEdge[i].x * 1.01,
                    y: blade.leftEdge[i].y
                });
            }
            //minor pixel adjustment
            blade.leftReflect[blade.leftReflect.length - 1].y += 5;
            blade.leftReflect[blade.leftReflect.length - 1].x -= 1;

            blade.rightReflect = [];
            for (i = 0; i < blade.rightEdge.length; i += 1) {
                blade.rightReflect.push({
                    x: blade.rightEdge[i].x * 0.99,
                    y: blade.rightEdge[i].y
                });
            }
            //minor pixel adjustment
            blade.rightReflect[0].y += 5;
            blade.rightReflect[0].x += 1;

        },

        getGripTexture = function () {
            var gripTextures = [
                textures.circles()
                    .size(7)
                    .radius(2.5)
                    .fill('#776b53')
                    .background('#a09277'),
                textures.lines()
                    .orientation('3/8', '7/8')
                    .size(15)
                    .strokeWidth(3)
                    .stroke('#776b53')
                    .background('#a09277'),
                textures.lines()
                    .orientation('1/2')
                    .size(5)
                    .strokeWidth(3)
                    .stroke('#776b53')
                    .background('#a09277'),
                textures.paths()
                    .size(15)
                    .strokeWidth(3)
                    .d('waves')
                    .thicker()
                    .stroke('#776b53')
                    .background('#a09277'),
                textures.paths()
                    .size(15)
                    .strokeWidth(2)
                    .d('crosses')
                    .thicker()
                    .stroke('#776b53')
                    .background('#a09277'),
                textures.paths()
                    .size(8)
                    .strokeWidth(3)
                    .d('hexagons')
                    .thicker()
                    .stroke('#776b53')
                    .background('#a09277')
            ];

            return gripTextures[Math.floor(Math.random() * gripTextures.length)];
        },

        generateHilt = function (width) {
            var sizeCrossGuard = 10,
                startY = blade.height + 80,
                startX = (width - blade.width) / 2,
                crossGuardWTop = 50 + Math.floor(Math.random() * sizeCrossGuard + 1),
                crossGuardWBottom = 50 + Math.floor(Math.random() * sizeCrossGuard + 1),
                crossGuardH = 10 + Math.floor(Math.random() * 5),

                gripW = blade.width + Math.floor(Math.random() * 2 * 4) - 3,
                gripH = 25 + Math.floor(Math.random() * 21),
                shape = 2 + Math.floor(Math.random() * 4),

                colorsJewel = ['#1bcaf0', '#eee58b', '#f67373', '#e52468', '#a148df'];

            hilt.crossGuard = [];
            hilt.crossGuard.push({
                x: startX + blade.width / 2 - crossGuardWTop / 2,
                y: startY
            });
            hilt.crossGuard.push({
                x: startX + blade.width / 2 + crossGuardWTop / 2,
                y: startY
            });
            hilt.crossGuard.push({
                x: startX + blade.width / 2 + crossGuardWBottom / 2,
                y: startY + crossGuardH
            });
            hilt.crossGuard.push({
                x: startX + blade.width / 2 - crossGuardWBottom / 2,
                y: startY + crossGuardH
            });

            hilt.rainGuard = {};
            hilt.rainGuard.y = hilt.crossGuard[0].y;
            hilt.rainGuard.r = 10 + Math.floor(Math.random() * 6);
            hilt.rainGuard.x = (hilt.crossGuard[0].x + hilt.crossGuard[1].x) / 2;

            hilt.grip = [];
            hilt.grip.push({
                x: startX + blade.width / 2 - gripW / 2,
                y: startY + crossGuardH
            });
            hilt.grip.push({
                x: startX + blade.width / 2 + gripW / 2,
                y: startY + crossGuardH
            });
            hilt.grip.push({
                x: startX + blade.width / 2 + gripW / 2 - shape,
                y: startY + crossGuardH + gripH
            });
            hilt.grip.push({
                x: startX + blade.width / 2 - gripW / 2 + shape,
                y: startY + crossGuardH + gripH
            });

            hilt.pommel = {
                x: (hilt.grip[hilt.grip.length - 1].x + hilt.grip[hilt.grip.length - 2].x) / 2,
                y: (hilt.grip[hilt.grip.length - 1].y + hilt.grip[hilt.grip.length - 2].y) / 2,
                r: blade.width - (10 + Math.floor(Math.random() * 3)),
                color: colorsJewel[Math.floor(Math.random() * colorsJewel.length)]
            };
        },

        drawClassicalBlade = function (svg) {
            svg.append('path')
                .datum(blade.leftEdge.concat(blade.rightEdge).concat(blade.centralRidge))
                .attr('d', d3Utils.getClosedLine())
                .style('fill', '#cfd1d2')
                .style('stroke', '#A0A3A5')
                .style('stroke-width', '3px');

            svg.append('path')
                .datum(blade.point)
                .attr('d', d3Utils.getClosedLine())
                .style('fill', '#e2e3e4')
                .style('stroke', '#A0A3A5')
                .style('stroke-width', '3px');
        },

        drawScimitarBlade = function (svg) {
            var concatenatedPaths = '';

            svg.append('path')
                .datum(blade.leftBottomEdge)
                .attr('d', d3Utils.getCurveBasis())
                .attr('class', 'blade');

            svg.append('path')
                .datum(blade.leftTopEdge)
                .attr('d', d3Utils.getCurveBasis())
                .attr('class', 'blade');

            svg.append('path')
                .datum(blade.rightEdge)
                .attr('d', d3Utils.getCurveBasis())
                .attr('class', 'blade');

            svg.selectAll('.blade')
                .each(function (d, i) {
                    var currentPath = d3.select(this).attr('d');
                    if (i > 0) {
                        currentPath = (currentPath.indexOf('M') === 0) ? 'L' + currentPath.substring(1) : currentPath;
                    }
                    concatenatedPaths += currentPath;
                });
            d3.selectAll('.blade').remove();

            svg.append('path')
                .attr('d', concatenatedPaths)
                .style('fill', '#cfd1d2');
            svg.append('path')
                .datum(blade.reflect)
                .attr('d', d3Utils.getCurvedLine())
                .style('fill', 'none')
                .style('stroke', '#e2e3e4')
                .style('stroke-width', '6px');
            svg.append('path')
                .attr('d', concatenatedPaths)
                .style('fill', 'none')
                .style('stroke', '#A0A3A5')
                .style('stroke-width', '3px');

        },

        drawTwistedBlase = function (svg) {
            var concatenatedPaths = '';
            svg.append('path')
                .datum(blade.leftEdge)
                .attr('d', d3Utils.getCardinal(0.1))
                .attr('class', 'blade');

            svg.append('path')
                .datum(blade.rightEdge)
                .attr('d', d3Utils.getCardinal(0.1))
                .attr('class', 'blade');

            svg.selectAll('.blade')
                .each(function (d, i) {
                    var currentPath = d3.select(this).attr('d');
                    if (i > 0) {
                        currentPath = (currentPath.indexOf('M') === 0) ? 'L' + currentPath.substring(1) : currentPath;
                    }
                    concatenatedPaths += currentPath;
                });
            d3.selectAll('.blade').remove();

            svg.append('path')
                .attr('d', concatenatedPaths)
                .style('fill', '#cfd1d2');
            svg.append('path')
                .datum(blade.leftReflect)
                .attr('d', d3Utils.getCardinal(0.1))
                .style('fill', 'none')
                .style('stroke', '#e2e3e4')
                .style('stroke-width', '6px');
            svg.append('path')
                .datum(blade.rightReflect)
                .attr('d', d3Utils.getCardinal(0.1))
                .style('fill', 'none')
                .style('stroke', '#e2e3e4')
                .style('stroke-width', '6px');
            svg.append('path')
                .attr('d', concatenatedPaths)
                .style('fill', 'none')
                .style('stroke', '#A0A3A5')
                .style('stroke-width', '3px');

            svg.append('path')
                .datum(blade.centralRidge)
                .attr('d', d3Utils.getCardinal(0.1))
                .attr('class', 'blade')
                .style('fill', 'none')
                .style('stroke', '#A0A3A5')
                .style('stroke-width', '3px');

        },

        drawHilt = function (svg) {
            var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(hilt.rainGuard.r)
                .startAngle(-90 * (Math.PI / 180))
                .endAngle(90 * (Math.PI / 180)),

                gripTexture = getGripTexture();

            svg.append('path')
                .attr('d', arc)
                .attr('transform', 'translate(' + hilt.rainGuard.x + ',' + hilt.rainGuard.y + ')')
                .style('fill', '#775953')
                .style('stroke', '#3B291E')
                .style('stroke-width', '3px');

            svg.call(gripTexture);
            svg.append('path')
                .datum(hilt.grip)
                .attr('d', d3Utils.getClosedLine())
                .style('fill', gripTexture.url())
                .style('stroke', '#3B291E')
                .style('stroke-width', '3px');

            svg.append('path')
                .datum(hilt.crossGuard)
                .attr('d', d3Utils.getCardinalClosedLine(Math.random() / 2 + 0.5))
                .style('fill', '#776B53')
                .style('stroke', '#3B291E')
                .style('stroke-width', '3px');


            svg.append('circle')
                .attr('cx', hilt.pommel.x)
                .attr('cy', hilt.pommel.y)
                .attr('r', hilt.pommel.r)
                .style('fill', '#776B53')
                .style('stroke', '#3B291E')
                .style('stroke-width', '3px');

            //Jewel in pommel
            svg.append('circle')
                .attr('cx', hilt.pommel.x)
                .attr('cy', hilt.pommel.y)
                .attr('r', hilt.pommel.r / 2)
                .style('fill', hilt.pommel.color)
                .style('stroke', '#3B291E')
                .style('stroke-width', '3px');
        };

    return {
        draw: function (svg) {
            var width = parseInt(svg.style('width'), 10),
                bladeType = Math.floor(Math.random() * 3);

            if (bladeType < 1) {
                generateClassicalBlade(width);
                drawClassicalBlade(svg);
            } else if (bladeType < 2) {
                generateScimitarBlade(width);
                drawScimitarBlade(svg);
            } else if (bladeType < 3) {
                generateTwistedShape(width);
                drawTwistedBlase(svg);
            }

            generateHilt(width);
            drawHilt(svg);
        }
    };
}());
