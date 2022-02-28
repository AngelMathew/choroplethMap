import React, {useState, useEffect} from 'react';
import * as d3 from "d3";
// import * as topojson from "topojson";
import { feature } from 'topojson';
import './Worldmap.css';


const Worldmap=()=>{

    const width=900
    const height=600
    const [data,setData]=useState([])
    
    

    const drawMap=()=>{
        const svg = d3.select('#map')
                    .append('svg')
                    .attr('width', width).attr('height', height);
        // Projection
        const projection = 
                        d3.geoMercator()
                        // d3.geoEquirectangular() 
                        // d3.geoAzimuthalEqualArea()
                            // .scale(140)
                            .translate([width / 2, height / 1.4]);
        // Geographic path
        const path = d3.geoPath(projection);
    
        // To set colors to different countries
        // let color = d3.scaleOrdinal(d3.schemeOrRd[5]);
        let color = d3.scaleOrdinal(d3.schemeCategory10);
    
        // Create tooltip
        const tooltip=d3.select('#map')
                        .append('div').attr("class", "tooltip")
                        .style('opacity', 0)
                        .style("background-color", "white")
                        .style("border-radius", "5px")
                        .style("padding", "5px")
                        .style('position','absolute')

        // Three function that change the tooltip when user hover 
        const mouseOverHandler=()=> {
            tooltip.style("opacity", 1)
          }
    
        const mouseMoveHandler = (event,d)=> {
            console.log(d)
            tooltip
              .html(d.properties.admin+'<br>'+d.properties.economy)
              .style(
                'transform',
                `translate(${(event.x)}px,${(event.y)}px)`)
          }
          
        const mouseOutHandler=()=> {
            tooltip.style("opacity", 0)
          }
        
        // Draw the map
        const g=svg.append('g')
                const countryMap=g.selectAll('path').data(data)
                .enter()
                .append('path')
                countryMap.attr("class", function(d){ return "Country"+d.id } )
                .attr('d', path)
                .attr("fill", (d, i) => color(i))
                .attr("stroke", "white")
                .attr("stroke-width", 0.5)
                .on("mouseover",mouseOverHandler)
                .on("mouseout", mouseOutHandler)
                .on("mousemove", mouseMoveHandler)
    }


    useEffect(()=>{
        Promise
    .all([
      d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
      d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
    ])
    .then(([tsvData, topoJSONdata]) => {
      const rowById = tsvData.reduce((accumulator, d) => {
        accumulator[d.iso_n3] = d;
        return accumulator;
      }, {});
debugger;
    const countries = feature(topoJSONdata, topoJSONdata.objects.countries);

      countries.features.forEach(d => {
        Object.assign(d.properties, rowById[d.id]);
      });

      setData(countries.features)
      
    });


    drawMap()
        
},[data.length]);


return(
        <div id="map">
        </div>
    )
}

export default Worldmap;