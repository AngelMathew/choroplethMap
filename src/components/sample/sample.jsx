import React, {useRef, useEffect} from 'react';
import * as d3 from "d3";

const Sample=()=>{
    let color = d3.scaleOrdinal(d3.schemeCategory10);
    useEffect(()=>{
        const circleData=[20,10,30]
        const svg=d3.select('#home')
                    .append('svg')
                    .attr('width', 1000)
                    .attr('height', 1000)
        svg.selectAll('circle')
            .data(circleData)
            .enter()
            .append('circle')
            .attr("cx", (d)=>{return d*14})
            .attr("cy", 50)
            .attr("r", (d)=>{return d})
            .style('fill',d=>color(d))
                

    })
    


    return(
        <>
        <div id="home">
           
        </div>
       
         
          </>
    )
}

export default Sample;