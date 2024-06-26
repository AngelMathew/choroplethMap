import React, {useState, useEffect} from 'react';
import * as d3 from "d3";
import { feature } from 'topojson';
import './Worldmap.css';
import ColorLegend from '../ColorLegend/ColorLegend';


const Worldmap=()=>{

    const width=900
    const height=600
    const [data,setData]=useState([])
    
    

    const drawMap=()=>{
      console.log(data)
        const svg = d3.select('#map')
                    .append('svg')
                    .attr('width', width).attr('height', height);
        // Projection
        const projection = 
                        d3.geoMercator()
                          .translate([width / 2, height / 1.4]);

        // Geographic path
        const path = d3.geoPath(projection);
    
        // To set colors to different countries
        const color = d3.scaleThreshold()
        .domain([1,2,3,4,5,6,7])
        .range(['lightblue','#b284be','#9966cc','#7c9ec3',' #702963','#856088','#4B0082','#c54b8c']);
    
        // Create tooltip
        const tooltip=d3.select('#map')
                        .append('div').attr("class", "tooltip")
                        .style('opacity', 0)
                        .style("background-color", "white")
                        .style("border-radius", "5px")
                        .style("padding", "10px")
                        .style('position','absolute')
                       

        // Three function that change the tooltip when user hover 
        const mouseOverHandler=()=> {
            tooltip.style("opacity", 1)
          }
    
        const mouseMoveHandler = (event,d)=> {
      
            tooltip
              .html('<strong>'+d.properties.admin+'</strong><br>'+d.properties.economy.slice(2)+'<br> #'+d.properties.economy.slice(0,1))
              .style(
                'transform',
                `translate(${(event.x)-10}px,${(event.y)-60}px)`)
                .style('box-shadow',`5px 5px 20px 3px ${color(d.properties.economy.slice(0,1))}`)
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
                .attr("fill", (i) =>{return color(i.properties.economy.slice(0,1))})
                .attr("stroke", "white")
                .attr("stroke-width", 0.2)
                .on("mouseover",mouseOverHandler)
                .on("mouseout", mouseOutHandler)
                .on("mousemove", mouseMoveHandler)
    }


    useEffect(()=>{
      //  const url= 'https://unpkg.com/world-atlas@1.1.4/world/50m.tsv';
      // const url= 'https://gist.githubusercontent.com/AngelMathew/75a4599246c6ba8cb96cd1a40ec14069/raw/1693a5a61841deaba55946c31916066c55c48af5/mapDetails.tsv';
      const url='https://gist.githubusercontent.com/AngelMathew/cba118c19f4956c8b9cde568fae6e517/raw/map.json';
    
        Promise
          .all([
              d3.json(url),
              d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
          ])
          .then(([tsvData, topoJSONdata]) => {
          const rowById = tsvData.reduce((accumulator, d) => {
            accumulator[d.iso_n3] = d;
            return accumulator;
          }, {});

      const countries = feature(topoJSONdata, topoJSONdata.objects.countries);

      countries.features.forEach(d => {
        Object.assign(d.properties, rowById[d.id]);
      });
      setData(countries.features);
      
    
    });   
},[]);
drawMap();



return(
        <div id="map">
        </div>
    )
}

export default Worldmap;