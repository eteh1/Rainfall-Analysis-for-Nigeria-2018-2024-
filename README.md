# Rainfall Analysis for Nigeria (2018-2024)

This project analyzes and visualizes rainfall data for Nigeria from 2018 to 2024 using the Google Earth Engine (GEE) platform and the CHIRPS dataset. The CHIRPS dataset provides daily rainfall estimates, making it ideal for this temporal and spatial analysis.

## Features

- **Monthly Rainfall Visualization**: Aggregates daily rainfall data into monthly sums for better analysis.
- **Time Series Chart**: Displays the average monthly rainfall over the selected period.
- **Interactive Map**: Highlights rainfall distribution across Nigeria with a color-coded legend.

## Technologies Used

- **Google Earth Engine**: For accessing and processing geospatial data.
- **CHIRPS Dataset**: High-resolution daily precipitation data.

## Script Overview

The `rainfall_analysis_nigeria.js` script:

1. **Defines Nigeria's boundary**: Uses the FAO GAUL dataset.
2. **Filters CHIRPS data**: Retrieves rainfall data within the specified time range and region.
3. **Aggregates rainfall data**: Summarizes rainfall into monthly totals.
4. **Visualizes data**:
   - Adds a rainfall map with color-coded visualization.
   - Displays a time series chart of average monthly rainfall.
   - Includes a legend to interpret rainfall intensities.

## How to Use

1. Open the [Google Earth Engine Code Editor](https://code.earthengine.google.com/).
2. Copy and paste the contents of `rainfall_analysis_nigeria.js` into the editor.
3. Run the script to view the rainfall map, chart, and legend.

## File Structure

- **`rainfall_analysis_nigeria.js`**: Main script for rainfall analysis and visualization.
- **`README.md`**: Documentation for the project.

## Outputs

- **Interactive Map**: Visualizes average rainfall distribution.
- **Time Series Chart**: Shows trends in monthly rainfall.

## Requirements

- Access to Google Earth Engine.
- A Google account for using the GEE Code Editor.

## Example Visualization

The interactive map and chart provide insights into Nigeria's rainfall patterns over the years. This data can support:

- Agricultural planning
- Climate change studies
- Water resource management

## License

This project is open-source and available under the MIT License. Feel free to use and adapt it as needed.

