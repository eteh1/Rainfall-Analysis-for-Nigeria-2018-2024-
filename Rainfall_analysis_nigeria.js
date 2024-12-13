// # Rainfall Analysis for Nigeria (2018-2024)
// This script uses Google Earth Engine (GEE) to analyze and visualize rainfall data in Nigeria
// from 2018 to 2024 using the CHIRPS dataset.

// ## Define Nigeria's Boundary
var nigeria = ee.FeatureCollection("FAO/GAUL/2015/level0")
                  .filter(ee.Filter.eq('ADM0_NAME', 'Nigeria'));

// ## Define Time Range
var startDate = '2018-01-01';
var endDate = '2024-12-31';

// ## Load CHIRPS Dataset
var chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                  .filterDate(startDate, endDate)
                  .filterBounds(nigeria);

// ## Calculate Monthly Rainfall
var monthlyRainfall = ee.ImageCollection(
  ee.List.sequence(2018, 2024).map(function(year) {
    return ee.List.sequence(1, 12).map(function(month) {
      var start = ee.Date.fromYMD(year, month, 1);
      var end = start.advance(1, 'month');
      return chirps.filterDate(start, end)
                   .sum()
                   .set('system:time_start', start.millis());
    });
  }).flatten()
);

// ## Mask to Nigeria
var maskedRainfall = monthlyRainfall.map(function(image) {
  return image.clip(nigeria);
});

// ## Add Rainfall Layer with Color Visualization
var rainfallVis = {
  min: 0,
  max: 300,
  palette: ['lightblue', 'blue', 'yellow', 'orange', 'red']
};

Map.addLayer(maskedRainfall.mean(), rainfallVis, 'Average Rainfall');

// ## Generate a Time Series Chart
var chart = ui.Chart.image.series({
  imageCollection: maskedRainfall,
  region: nigeria,
  reducer: ee.Reducer.mean(),
  scale: 5000,
  xProperty: 'system:time_start'
})
.setOptions({
  title: 'Monthly Rainfall in Nigeria (2018-2024)',
  hAxis: { title: 'Date' },
  vAxis: { title: 'Rainfall (mm)' },
  legend: { position: 'none' }
});

// ## Add Legend to the Map
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

var legendTitle = ui.Label({
  value: 'Rainfall (mm)',
  style: { fontWeight: 'bold', fontSize: '16px', margin: '0 0 4px 0', padding: '0' }
});

legend.add(legendTitle);

var makeColorBar = function(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0).multiply((rainfallVis.max - rainfallVis.min) / 100).add(rainfallVis.min),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      min: rainfallVis.min,
      max: rainfallVis.max,
      palette: palette
    },
    style: { stretch: 'horizontal', margin: '0 8px', maxHeight: '20px' }
  });
};

var colorBar = makeColorBar(rainfallVis.palette);
legend.add(colorBar);

var legendLabels = ui.Panel({
  widgets: [
    ui.Label(rainfallVis.min, { margin: '4px 8px' }),
    ui.Label((rainfallVis.max / 2).toFixed(0), { margin: '4px 8px', textAlign: 'center', stretch: 'horizontal' }),
    ui.Label(rainfallVis.max, { margin: '4px 8px' })
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);

Map.add(legend);

// ## Add Layers to the Map
Map.centerObject(nigeria, 6);
Map.addLayer(nigeria, {color: 'blue'}, 'Nigeria');

// ## Display the Chart
print(chart);

// ## Instructions for GitHub
// - Save this file as `rainfall_analysis_nigeria.js`.
// - Add a `README.md` file explaining the script's purpose and usage.
// - Commit and push both files to your GitHub repository.
