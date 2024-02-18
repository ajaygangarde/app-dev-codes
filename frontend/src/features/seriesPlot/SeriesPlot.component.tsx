import React, { useCallback, useMemo, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { format } from 'date-fns';
import draggablePoints from 'highcharts/modules/draggable-points';
import CustomEvents from "highcharts-custom-events";
import SeriesDailogForMinAndMaxYAxisWrapper from './SeriesDailogForMinAndMaxYAxisWrapper';
import { useAppSelector } from '../../hooks/hooks';
import capitalizeFirstLetter from '../../utils/firstLetterUpperCase';
import { setInterfaceKeys } from './seriesPlotSlice';
import { useDispatch } from 'react-redux';
draggablePoints(Highcharts)
CustomEvents(Highcharts);


interface dataItems {
  timestamp: number,
  [key: string]: number
}
interface ISeriesProps {
  name: string
  data: dataItems[]
}


interface IseriesData {
  x: number,
  y: number,
  name: string
}

const DB_COLUMN_KEYS = [{
  name: 'Photon',
  key: 'photon'
}, {
  name: 'Voltage',
  key: 'voltage'
}, {
  name: 'Sulphur',
  key: 'sulphur'
}]



const seriesKeyValueDataLogic = (data: dataItems[]) => {
  let keyValuePairs = [] as any
  DB_COLUMN_KEYS.forEach((item, index) => {
    keyValuePairs[item.key] = []
  })
  Object.keys(keyValuePairs).forEach((keys, index) => {
    for (let i = 0; i < keyValuePairs[keys].length; i++) {
      keyValuePairs[keys][i] = []
    }
  })

  data.forEach((dataItems: dataItems, dataIndex) => {
    DB_COLUMN_KEYS.forEach((dbKeys, dbIndex) => {
      keyValuePairs[dbKeys.key].push({
        x: dataItems.timestamp * 1000,
        y: dataItems[dbKeys.key],
        name: dbKeys.name
      })
    })
  })
  return keyValuePairs
}


const getOptions = (seriesData: IseriesData[],
  pickPoints: IseriesData[], setPickPoints: ([]) => void,
  executeCallbackYAxisScaleMethos: (type: string) => void,
  openYAxisScaleDailog: () => void,
  minAndMaxYAxis: any) => {
  const options = {
    chart: {
      events: {
        load: function () {
          var ch = this as any
          var x = 20;
          var y = 57;

          ch.flashText = ch.renderer.text('<div id="report"></div>', x, y + 10, true).attr({
            zIndex: 101,
            translateY: 100
          }).add();
        }
      }
    },
    title: {
      text: 'Series Plot',
    },
    xAxis: {
      title: {
        text: 'Date',
      },
      type: "datetime",
      labels: {
        formatter(this: { value: number }) {
          return format(this.value, 'yyyy-MM-dd HH:mm:ss');
        },
      }
    },
    yAxis: [],
    series: [],
    plotOptions: {
      series: {
        point: {
          events: {
            click(e: any) {
              if (e && e?.point) {
                const mergePoints = [...pickPoints, {
                  name: `Point ${pickPoints.length + 1}`,
                  x: e.point.x,
                  y: e.point.y,
                }]
                setPickPoints(mergePoints)
              }
            }

          }
        }
      },
      scatter: {
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            color: "yellow"
          }
        }
      }
    }
  } as any;


  Object.keys(seriesData).forEach((keyName, index) => {
    options.yAxis.push({
      title: {
        text: keyName,
        events: {
          mouseover: function () {
            executeCallbackYAxisScaleMethos("mouseOver");
          },
          mouseout: function () {
            executeCallbackYAxisScaleMethos("mouseOut");
          },
          click: function () {
            openYAxisScaleDailog();
          }
        }
      },
      min: minAndMaxYAxis[`min${capitalizeFirstLetter(keyName)}`] || null,
      max: minAndMaxYAxis[`max${capitalizeFirstLetter(keyName)}`] || null
    })

    options.series.push({
      yAxis: index,
      name: keyName,
      data: seriesData[keyName as any],
      visible: (keyName === 'photon') ? true : false
    })
  })

  options.series.push({
    name: 'Scatter Plot',
    color: 'red',
    yAxis: 0,
    data: pickPoints,
    type: 'scatter',
    dragDrop: {
      draggableY: true, // Enable Y-axis dragging
      draggableX: true, // Enable X-axis dragging
    },
    cursor: 'move', // Cursor style when dragging 
    visible: true,
    marker: {
      symbol: 'circle',
      radius: 10
    }
  })
  return options
}

const SeriesPlot = (props: ISeriesProps) => {
  const [pickPoints, setPickPoints] = useState([
    {
      name: "Point 1",
      "x": 1706725800 * 1000,
      "y": 50000.67377897927,
    },
  ])
  const dispatch = useDispatch();

  const seriesInputControls = useAppSelector((state) => state.seriesPlot.seriesInputControls);



  const chartRef = useRef(null) as any

  const openYAxisScaleDailog = useCallback(() => {
    dispatch(setInterfaceKeys({ name: 'isOpenYAxisDailog', value: true }));
  }, [dispatch])

  const executeCallbackYAxisScaleMethos = useCallback((eventType: string) => {
    // // Create the button element
    const doc = document as any
    const reportElement = doc.getElementById('report')
    const customTooltipButton = document.createElement('button');
    if (eventType === 'mouseOver') {
      customTooltipButton.textContent = 'Click to Scale Y Axis';
      customTooltipButton.value = "Click to Scale Y Axis"
      customTooltipButton.style.position = 'absolute';
      customTooltipButton.style.top = '20px';
      customTooltipButton.style.left = '10px';
      customTooltipButton.style.padding = '10px 15px';
      customTooltipButton.style.backgroundColor = '#007bff';
      customTooltipButton.style.color = '#fff';
      customTooltipButton.style.border = 'none';
      customTooltipButton.style.borderRadius = '5px';
      customTooltipButton.style.cursor = 'pointer';
      customTooltipButton.style.fontFamily = 'Arial, sans-serif';
      customTooltipButton.style.fontSize = '14px';
      reportElement && doc.getElementById('report').appendChild(customTooltipButton);
    } else {
      var olddata = reportElement.lastChild;
      reportElement.removeChild(olddata);
    }



  }, [])

  const options = useMemo(() => {
    return getOptions(seriesKeyValueDataLogic(props.data), pickPoints,
      setPickPoints, executeCallbackYAxisScaleMethos, openYAxisScaleDailog, seriesInputControls)
  }, [props.data, pickPoints, seriesInputControls, openYAxisScaleDailog, executeCallbackYAxisScaleMethos])




  return (
    <div>
      <SeriesDailogForMinAndMaxYAxisWrapper />
      <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
    </div>
  );
};

export default SeriesPlot;
