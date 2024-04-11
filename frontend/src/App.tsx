import React from 'react';
import logo from './logo.svg';
import './App.css';
import SeriesPlot from './features/seriesPlot/SeriesPlot.component';
import { seriesDataJson } from './mocks/SeriesDataJson';
import { OpenAIResumeParse } from './features/OpenAIResumeParse/OpenAIResumeParse.component';
            

function App() {
  return (
    <div className="App">
      <SeriesPlot name={"Series Plots test"} data={seriesDataJson.time_series_data} />
      <OpenAIResumeParse />
    </div>
  );
}

export default App;
