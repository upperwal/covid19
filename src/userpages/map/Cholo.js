import React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

import './Cholo.scss'

import districtTopoJson from './district_topojson.json'

class Cholo extends React.Component {

    constructor(props) {
        super(props)
        this.svgRef = React.createRef();
    }

    plot() {
        
        let svg = d3.select(this.refs.svgRef)

        let node = svg.node().getBoundingClientRect()

        let mapData = this.props.mapData;
        let max = this.props.range.max

        var projection = d3.geoMercator()
            .center([81.966182,22.115736])
            .translate([node.width/2, node.height/2])
            .scale(900);
    
        var path = d3.geoPath().projection(projection);

        /* var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip'); */

        let self = this

        svg.append('g')
            .attr('class', 'district')
            .selectAll('path')
            .data(topojson.feature(districtTopoJson, districtTopoJson.objects.district_geojson).features)
            .enter()
            .append('path')
            .attr('class', function(d) {
                let districtName = d.properties.dtname.toLowerCase()
                if(!(districtName in mapData)) {
                    return "r0-9"
                }
                let classNum = Math.ceil(mapData[districtName]/max*8)
                console.log(mapData[districtName], classNum, mapData[districtName]/max*8, max)
                return "r" + classNum + "-9";  
                //console.log(classNum + ': ' + districtName, mapData[districtName], max)
                //return 'gray-fill'
                //return "r" + '5' + "-9";  
            })
            .attr('d', path)
            .on('mousemove', function(d) {
                // let districtName = d.properties.dtname.toLowerCase()
                /* var mouse = d3.mouse(svg.node()).map(function(d) {
                    return parseInt(d);
                }); */
                d3.select(this).classed('highlighted-gray', true)
                /* tooltip.classed('hidden', false)
                    .attr('style', 'left:' + (mouse[0]) +
                            'px; top:' + (mouse[1]+110) + 'px')
                    .html(districtName + ': ' + (mapData[districtName] || 0)); */
                self.props.onHoverRegion(d)
            })
            .on('mouseout', function() {
                /* tooltip.classed('hidden', true); */
                d3.select(this).classed('highlighted-gray', false)
            })
        
        //console.log(topojson.mesh(districtTopoJson, districtTopoJson.objects.district_geojson).coordinates)
        /* svg.append('g')
            .attr('class', 'bo')
            .selectAll('path')
            .data([10,20,30])
            .attr('stroke', '#000')
            .attr('fill', 'none')
            .attr('stroke-width', 2)
            .attr(
                'd',
                path(topojson.mesh(districtTopoJson, districtTopoJson.objects.district_geojson))
            ); */
        
        svg.append("path")
            .datum(topojson.mesh(districtTopoJson, districtTopoJson.objects.district_geojson))
            .attr("class", "border")
            .attr("d", path);
    }

    componentDidMount() {
        this.plot()
    }

    render() {
        // const { t } = this.props;

        /* let center = [24.115736, 77.979682] */

        console.log('Cholo')
        
        return (
            <>
                <svg ref="svgRef" width="100%" height="600"></svg>
            </>
        );
    }
}
export default Cholo
