/*global d3, d3Utils, textures, sword, axe, crossbow*/
(function () {
    'use strict';

    var width = 300,
        height = 420,

        svgSword = d3.select('#swordContainer')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('id', 'sword'),

        svgAxe = d3.select('#axeContainer')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('id', 'axe'),
        
        svgCrossbow = d3.select('#crossbowContainer')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('id', 'crossbow'),

        actions = {
            refresh: function (svg) {
                svg.selectAll('*').remove();
                actions.addBorders(svg);
                if (svg.attr('id') === 'sword') {
                    sword.draw(svg);
                } else if (svg.attr('id') === 'axe') {
                    axe.draw(svg);
                } else if (svg.attr('id') === 'crossbow') {
                    crossbow.draw(svg);
                }
            },

            addBorders: function (svg) {
                var border = [{
                        x: 5,
                        y: 5
                    }, {
                        x: width - 5,
                        y: 5
                    }, {
                        x: width - 5,
                        y: height - 5
                    }, {
                        x: 5,
                        y: height - 5
                    }],
                    subBorder = [{
                        x: 10,
                        y: 10
                    }, {
                        x: width - 10,
                        y: 10
                    }, {
                        x: width - 10,
                        y: height - 10
                    }, {
                        x: 10,
                        y: height - 10
                    }],

                    backgroundTexture = textures.paths()
                        .size(100)
                        .strokeWidth(5)
                        .d('woven')
                        .stroke('#fceed4')
                        .background('#fdf5e6');

                svg.call(backgroundTexture);
                svg.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', width)
                    .attr('height', height)
                    .style('fill', backgroundTexture.url());

                svg.append('path')
                    .datum(border)
                    .attr('d', d3Utils.getClosedLine())
                    .style('fill', 'none')
                    .style('stroke', '#3B291E')
                    .style('stroke-width', '10px');
                svg.append('path')
                    .datum(subBorder)
                    .attr('d', d3Utils.getClosedLine())
                    .style('fill', 'none')
                    .style('stroke', '#776B53')
                    .style('stroke-width', '7px');

                svg.append('circle')
                    .attr('class', 'refresh-btn')
                    .attr('cx', (width - 40))
                    .attr('cy', (height - 40))
                    .attr('r', 18)
                    .style('fill', '#a09277')
                    .style('stroke', '#3B291E')
                    .style('stroke-width', '3px');

                // Refresh icon
                svg.append('path')
                    .attr('class', 'refresh-btn')
                    .attr('d', 'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z')
                    .attr('transform', 'translate(' + (width - 53) + ',' + (height - 53) + ') scale(1.1, 1.1)')
                    .style('fill', '#3B291E');

                svg.selectAll('.refresh-btn').on('click', function () {
                    actions.refresh(svg);
                });
            }
        };

    actions.addBorders(svgSword);
    actions.addBorders(svgAxe);
    actions.addBorders(svgCrossbow);

    sword.draw(svgSword);
    axe.draw(svgAxe);
    crossbow.draw(svgCrossbow);

}());
