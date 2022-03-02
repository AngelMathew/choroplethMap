import React, {useState, useEffect} from 'react';
import * as d3 from "d3";

import './ColorLegend.css';


const ColorLegend=(selection,props)=>{
    console.log(props.colors)
const colorScale=props.colors
const ls_w = 20,
		ls_h = 20;
const x = d3.scaleLinear()
.domain([2.6, 75.1])
.rangeRound([600, 860]);
const rect=selection.selectAll('rect')
.data(colorScale.range().map(function(d) {
    d = colorScale.invertExtent(d);
    if (d[0] == null) d[0] = x.domain()[0];
    if (d[1] == null) d[1] = x.domain()[1];
    return d;
}))
// .enter().append('rect').attr('width', 10).attr('height', 20);
// const n = props.color.domain().length; 
rect.enter().append('g')
.append("rect")
.attr("x", 20)
.attr("y", function(d, i) {
    return 30 - (i * ls_h) - 2 * ls_h;
})
.attr("width", ls_w)
.attr("height", ls_h)
.style("fill", function(d) {
    return colorScale(d[0]);
})
.style("opacity", 0.8);
    return (
      {rect}
    )

}

export default ColorLegend;