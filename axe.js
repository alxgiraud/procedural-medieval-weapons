/*global d3Utils, d3, textures*/
var axe = (function () {
    'use strict';

    var blade = {
            side: {
                edge: [],
                edgeReflect: [],
                topCurve: [],
                bottomCurve: []
            },
            centralSupport: []
        },
        hilt = {
            mainStick: [],
            topGuard: [],
            grip: [],
            bottomGuard: []
        },

        generateBlade = function (width) {

            var startX = width / 2,
                startY = 110,
                centralSupportW = Math.random() * 4 + 7,
                centralSupportH = Math.random() * 10 + 15,

                bladeW = Math.random() * 30 + 70,
                bladeH = Math.random() * 30 + 40,
                shape = Math.random() * 30 + 30,
                intensity = Math.random() * 5 + 2,

                topCurveIntensity = Math.random() * 21,
                centralPosition = 5;

            blade.centralSupport = [];
            blade.centralSupport.push({
                x: startX - centralSupportW,
                y: startY - centralSupportH
            });
            blade.centralSupport.push({
                x: startX + centralSupportW,
                y: startY - centralSupportH
            });
            blade.centralSupport.push({
                x: startX + centralSupportW,
                y: startY + centralSupportH
            });
            blade.centralSupport.push({
                x: startX - centralSupportW,
                y: startY + centralSupportH
            });

            blade.side.edge = [];
            blade.side.edge.push({
                x: startX - bladeW + shape,
                y: startY + bladeH
            });
            blade.side.edge.push({
                x: startX - bladeW + shape / intensity,
                y: startY + bladeH
            });
            blade.side.edge.push({
                x: startX - bladeW,
                y: startY
            });
            blade.side.edge.push({
                x: startX - bladeW + shape / intensity,
                y: startY - bladeH
            });
            blade.side.edge.push({
                x: startX - bladeW + shape,
                y: startY - bladeH
            });

            blade.side.edgeReflect = [];
            blade.side.edgeReflect.push(blade.side.edge[0]);
            blade.side.edgeReflect.push({
                x: blade.side.edge[1].x * 1.05,
                y: blade.side.edge[1].y
            });
            blade.side.edgeReflect.push({
                x: blade.side.edge[2].x * 1.05,
                y: blade.side.edge[2].y
            });
            blade.side.edgeReflect.push({
                x: blade.side.edge[3].x * 1.05,
                y: blade.side.edge[3].y
            });
            blade.side.edgeReflect.push(blade.side.edge[4]);


            blade.side.topCurve = [];
            blade.side.topCurve.push({
                x: blade.side.edge[blade.side.edge.length - 1].x,
                y: blade.side.edge[blade.side.edge.length - 1].y
            });
            blade.side.topCurve.push({
                x: blade.side.edge[blade.side.edge.length - 1].x - topCurveIntensity,
                y: blade.centralSupport[0].y + centralPosition
            });
            blade.side.topCurve.push({
                x: blade.centralSupport[0].x,
                y: blade.centralSupport[0].y + centralPosition
            });

            blade.side.bottomCurve = [];
            blade.side.bottomCurve.push({
                x: blade.centralSupport[blade.centralSupport.length - 1].x,
                y: blade.centralSupport[blade.centralSupport.length - 1].y - centralPosition
            });

            blade.side.bottomCurve.push({
                x: blade.side.edge[0].x - topCurveIntensity,
                y: blade.centralSupport[blade.centralSupport.length - 1].y - centralPosition
            });

            blade.side.bottomCurve.push({
                x: blade.side.edge[0].x,
                y: blade.side.edge[0].y
            });
        },

        generateHilt = function () {
            var stickW = Math.random() * 5 + 8,
                startX = (blade.centralSupport[0].x + blade.centralSupport[1].x) / 2,
                startY = blade.centralSupport[0].y - (Math.random() * 6 + 3),
                stickH = Math.random() * 80 + 200,

                guardW = stickW + Math.random() * 5 + 5,
                guardH = Math.random() * 7 + 5,
                gripH = startY + Math.random() * 40,
                bottomDisplayed = Math.random() * 5,

                gripWVariance = Math.random() * 2 + 2;

            hilt.mainStick = [];
            hilt.mainStick.push({
                x: startX - stickW / 2,
                y: startY
            });
            hilt.mainStick.push({
                x: startX + stickW / 2,
                y: startY
            });
            hilt.mainStick.push({
                x: startX + stickW / 2,
                y: startY + stickH
            });
            hilt.mainStick.push({
                x: startX - stickW / 2,
                y: startY + stickH
            });

            hilt.topGuard = [];
            hilt.topGuard.push({
                x: (hilt.mainStick[0].x + hilt.mainStick[1].x) / 2 - guardW / 2,
                y: hilt.mainStick[0].y + stickH - gripH - guardH * 2
            });
            hilt.topGuard.push({
                x: guardW / 2 + (hilt.mainStick[0].x + hilt.mainStick[1].x) / 2,
                y: hilt.mainStick[1].y + stickH - gripH - guardH * 2
            });
            hilt.topGuard.push({
                x: guardW / 2 + (hilt.mainStick[0].x + hilt.mainStick[1].x) / 2,
                y: hilt.topGuard[0].y + guardH
            });
            hilt.topGuard.push({
                x: (hilt.mainStick[0].x + hilt.mainStick[1].x) / 2 - guardW / 2,
                y: hilt.topGuard[1].y + guardH
            });

            hilt.bottomGuard = [];
            hilt.bottomGuard.push({
                x: (hilt.mainStick[0].x + hilt.mainStick[1].x) / 2 - guardW / 2,
                y: hilt.mainStick[0].y + stickH - guardH - bottomDisplayed
            });
            hilt.bottomGuard.push({
                x: guardW / 2 + (hilt.mainStick[0].x + hilt.mainStick[1].x) / 2,
                y: hilt.mainStick[1].y + stickH - guardH - bottomDisplayed
            });
            hilt.bottomGuard.push({
                x: guardW / 2 + (hilt.mainStick[0].x + hilt.mainStick[1].x) / 2,
                y: hilt.bottomGuard[0].y + guardH
            });
            hilt.bottomGuard.push({
                x: (hilt.mainStick[0].x + hilt.mainStick[1].x) / 2 - guardW / 2,
                y: hilt.bottomGuard[1].y + guardH
            });

            hilt.grip = [];
            hilt.grip.push({
                x: hilt.topGuard[2].x - gripWVariance,
                y: hilt.topGuard[2].y
            });
            hilt.grip.push({
                x: hilt.bottomGuard[2].x - gripWVariance,
                y: hilt.bottomGuard[2].y
            });
            hilt.grip.push({
                x: hilt.bottomGuard[3].x + gripWVariance,
                y: hilt.bottomGuard[3].y
            });
            hilt.grip.push({
                x: hilt.topGuard[3].x + gripWVariance,
                y: hilt.topGuard[3].y
            });
        },

        getGripTexture = function () {
            var gripTextures = [
                textures.circles()
                    .size(10)
                    .radius(3.5)
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

        drawAxe = function (svg) {

            var hiltGroup = svg.append('g'),
                leftSide = svg.append('g'),

                gripTexture = getGripTexture(),
                stickTension = Math.random() / 2 + 0.25,
                guardTension = Math.random() / 2 + 0.25,
                supportTension = Math.random() / 2 + 0.25,

                concatenatedPaths = '',

                rightSide = svg.append('g');


            hiltGroup.append('path')
                .datum(hilt.mainStick)
                .attr('d', d3Utils.getCardinalClosedLine(stickTension))
                .style('fill', '#775953')
                .style('stroke', '#3B291E')
                .style('stroke-width', '3px');

            hiltGroup.call(gripTexture);
            hiltGroup.append('path')
                .datum(hilt.grip)
                .attr('d', d3Utils.getClosedLine())
                .style('fill', gripTexture.url())
                .style('stroke', '#3B291E')
                .style('stroke-width', '3px');

            hiltGroup.append('path')
                .datum(hilt.topGuard)
                .attr('d', d3Utils.getCardinalClosedLine(guardTension))
                .style('fill', '#776B53')
                .style('stroke', '#3B291E')
                .style('stroke-width', '3px');

            hiltGroup.append('path')
                .datum(hilt.bottomGuard)
                .attr('d', d3Utils.getCardinalClosedLine(guardTension))
                .style('fill', '#776B53')
                .style('stroke', '#3B291E')
                .style('stroke-width', '3px');

            leftSide.append('path')
                .datum(blade.side.edge)
                .attr('d', d3Utils.getCurvedLine())
                .attr('class', 'leftPath');

            leftSide.append('path')
                .datum(blade.side.topCurve)
                .attr('d', d3Utils.getCurvedLine())
                .attr('class', 'leftPath');

            leftSide.append('path')
                .datum(blade.side.bottomCurve)
                .attr('d', d3Utils.getCurvedLine())
                .attr('class', 'leftPath');

            svg.selectAll('.leftPath')
                .each(function (d, i) {
                    var currentPath = d3.select(this).attr('d');
                    if (i > 0) {
                        currentPath = (currentPath.indexOf('M') === 0) ? 'L' + currentPath.substring(1) : currentPath;
                    }
                    concatenatedPaths += currentPath;
                });
            d3.selectAll('.leftPath').remove();

            leftSide.append('path')
                .attr('d', concatenatedPaths)
                .style('fill', '#cfd1d2');
            leftSide.append('path')
                .datum(blade.side.edgeReflect)
                .attr('d', d3Utils.getCurvedLine())
                .style('fill', 'none')
                .style('stroke', '#e2e3e4')
                .style('stroke-width', '5px');
            leftSide.append('path')
                .attr('d', concatenatedPaths)
                .style('fill', 'none')
                .style('stroke', '#A0A3A5')
                .style('stroke-width', '3px');


            rightSide.append('path')
                .attr('d', concatenatedPaths)
                .style('fill', '#cfd1d2');
            rightSide.append('path')
                .datum(blade.side.edgeReflect)
                .attr('d', d3Utils.getCurvedLine())
                .style('fill', 'none')
                .style('stroke', '#e2e3e4')
                .style('stroke-width', '5px');
            rightSide.append('path')
                .attr('d', concatenatedPaths)
                .style('fill', 'none')
                .style('stroke', '#A0A3A5')
                .style('stroke-width', '3px');

            rightSide.attr('transform', 'scale(-1, 1) translate(-' + parseInt(svg.style('width'), 10) + ', 0)');

            //central support
            svg.append('path')
                .datum(blade.centralSupport)
                .attr('d', d3Utils.getCardinalClosedLine(supportTension))
                .style('fill', '#797d80')
                .style('stroke', '#545759')
                .style('stroke-width', '3px');
        };

    return {
        draw: function (svg) {
            var width = parseInt(svg.style('width'), 10);
            generateBlade(width);
            generateHilt();
            drawAxe(svg);
        }
    };

}());
