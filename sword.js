/*global d3Utils, d3, textures*/
var sword = (function () {
    'use strict';

    var blade = {
            leftEdge: [],
            rightEdge: [],
            point: [],
            centralRidge: [],
            width: 0
        },

        hilt = {
            rainGuard: {
                x: 0,
                y: 0,
                r: 0
            },
            crossGuard: [],
            grip: [],
            pommel: {}
        },

        generateBlade = function (width) {
            var bladeH = 175 + Math.floor(Math.random() * 50),
                containerW = 150,
                shape = 0,
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
                y: startY + bladeH / shapePosition
            });
            blade.leftEdge.push({
                x: startX,
                y: startY + bladeH
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
        
        generateHilt = function () {
            var sizeCrossGuard = 10,
                crossGuardWTop = 50 + Math.floor(Math.random() * sizeCrossGuard + 1),
                crossGuardWBottom = 50 + Math.floor(Math.random() * sizeCrossGuard + 1),
                crossGuardH = 10 + Math.floor(Math.random() * 5),

                gripW = blade.width + Math.floor(Math.random() * 2 * 4) - 3,
                gripH = 25 + Math.floor(Math.random() * 21),
                shape = 2 + Math.floor(Math.random() * 4),

                colorsJewel = ['#1bcaf0', '#eee58b', '#f67373', '#e52468', '#a148df'];

            hilt.crossGuard = [];
            hilt.crossGuard.push({
                x: blade.leftEdge[blade.leftEdge.length - 1].x + blade.width / 2 - crossGuardWTop / 2,
                y: blade.leftEdge[blade.leftEdge.length - 1].y
            });
            hilt.crossGuard.push({
                x: blade.leftEdge[blade.leftEdge.length - 1].x + blade.width / 2 + crossGuardWTop / 2,
                y: blade.leftEdge[blade.leftEdge.length - 1].y
            });
            hilt.crossGuard.push({
                x: blade.leftEdge[blade.leftEdge.length - 1].x + blade.width / 2 + crossGuardWBottom / 2,
                y: blade.leftEdge[blade.leftEdge.length - 1].y + crossGuardH
            });
            hilt.crossGuard.push({
                x: blade.leftEdge[blade.leftEdge.length - 1].x + blade.width / 2 - crossGuardWBottom / 2,
                y: blade.leftEdge[blade.leftEdge.length - 1].y + crossGuardH
            });

            hilt.rainGuard.y = hilt.crossGuard[0].y;
            hilt.rainGuard.r = 10 + Math.floor(Math.random() * 6);
            hilt.rainGuard.x = (hilt.crossGuard[0].x + hilt.crossGuard[1].x) / 2;

            hilt.grip = [];
            hilt.grip.push({
                x: blade.leftEdge[blade.leftEdge.length - 1].x + blade.width / 2 - gripW / 2,
                y: blade.leftEdge[blade.leftEdge.length - 1].y + crossGuardH
            });
            hilt.grip.push({
                x: blade.leftEdge[blade.leftEdge.length - 1].x + blade.width / 2 + gripW / 2,
                y: blade.leftEdge[blade.leftEdge.length - 1].y + crossGuardH
            });
            hilt.grip.push({
                x: blade.leftEdge[blade.leftEdge.length - 1].x + blade.width / 2 + gripW / 2 - shape,
                y: blade.leftEdge[blade.leftEdge.length - 1].y + crossGuardH + gripH
            });
            hilt.grip.push({
                x: blade.leftEdge[blade.leftEdge.length - 1].x + blade.width / 2 - gripW / 2 + shape,
                y: blade.leftEdge[blade.leftEdge.length - 1].y + crossGuardH + gripH
            });

            hilt.pommel = {
                x: (hilt.grip[hilt.grip.length - 1].x + hilt.grip[hilt.grip.length - 2].x) / 2,
                y: (hilt.grip[hilt.grip.length - 1].y + hilt.grip[hilt.grip.length - 2].y) / 2,
                r: blade.width - (10 + Math.floor(Math.random() * 3)),
                color: colorsJewel[Math.floor(Math.random() * colorsJewel.length)]
            };
        },
        
        drawSword = function (svg) {
            var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(hilt.rainGuard.r)
                .startAngle(-90 * (Math.PI / 180))
                .endAngle(90 * (Math.PI / 180)),

                gripTexture = getGripTexture();

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
            var width = parseInt(svg.style('width'), 10);
            generateBlade(width);
            generateHilt();
            drawSword(svg);
        }
    };
}());
