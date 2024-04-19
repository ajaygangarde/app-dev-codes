import React, { useMemo, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { format } from 'date-fns';
import draggablePoints from 'highcharts/modules/draggable-points';
import SeriesDailogForMinAndMaxYAxisWrapper from './SeriesDailogForMinAndMaxYAxisWrapper';
draggablePoints(Highcharts)

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
        name: dbKeys.name,

      })
    })
  })
  return keyValuePairs
}

 // eslint-disable-next-line
const getOptions = (seriesData: IseriesData[], pickPoints: IseriesData[], setPickPoints: ([]) => void): {} => {
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
      text: 'Series Plots',
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
      },
      plotLines: [{
        color: '#FF0000',
        width: 2,
        value: 1708165800000,
        zIndex: 5,
        label: {
          text: 'Vertical Line', // Text to display above the plot line
          align: 'center', // Alignment of the label relative to the plot line
          style: {
            color: 'black', // Text color
            fontWeight: 'bold' // Text weight
          }
        }
      }]
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
    // options.yAxis.push({
    //   title: {
    //     text: keyName,
    //   },
    //   min: minAndMaxYAxis[`min${capitalizeFirstLetter(keyName)}`] || null,
    //   max: minAndMaxYAxis[`max${capitalizeFirstLetter(keyName)}`] || null
    // })

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




  const chartRef = useRef(null) as any

  const options = useMemo(() => {

    return getOptions(seriesKeyValueDataLogic(props.data), pickPoints,
      setPickPoints)
  }, [props.data, pickPoints, setPickPoints])



  return (
    <div>
      <SeriesDailogForMinAndMaxYAxisWrapper />
      <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
    </div>
  );
};

export default SeriesPlot;
