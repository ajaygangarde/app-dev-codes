import React from 'react';
import logo from './logo.svg';
import './App.css';
import SeriesPlot from './features/seriesPlot/SeriesPlot.component';
import { seriesDataJson } from './mocks/SeriesDataJson';

function App() {
  return (
    <div className="App">
        <SeriesPlot name={"Series Plot"} data={seriesDataJson.time_series_data} />
    </div>
  );
}

export default App;
