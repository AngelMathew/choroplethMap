# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Install d3.js

`npm install d3`

### Render world map
To render a world map, geographical data is needed, in the form of `GeoJSON` or `TopoJSON`

GeoJSON : A JSON-based format to interchange geographic data. Due to high precision,  can’t stream for the web

TopoJSON : An extension of geoJSON, contains geospatial data and attribute data.

<img src="https://github.com/AngelMathew/choroplethMap/assets/30999892/8c6e91f7-cc49-4d7a-910f-bce6f9d18598">

### Projection functions and geographic path generators
What kind of projection is needed to visualize data on the page has to be specified, the one used in the code is `geoMercator` which is like a flat projection.
Geographic Path Generators generate SVG path data with a given feature object.

`https://github.com/d3/d3-geo-projection`

<img width="1093" alt="Screenshot 2024-06-01 at 8 07 23 PM" src="https://github.com/AngelMathew/choroplethMap/assets/30999892/3f8520e6-b983-473b-92e6-14c850702904">


