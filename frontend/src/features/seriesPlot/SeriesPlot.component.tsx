import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { format } from 'date-fns';
import draggablePoints from 'highcharts/modules/draggable-points';
draggablePoints(Highcharts)

interface dataItems {
  timestamp: number,
  [key: string]: number
}
interface ISeriesProps {
  name: string
  data: dataItems[]
}

const DB_COLUMN_KEYS = [{
  name: 'Photon',
  key: 'photon'
}, {
  name: 'voltage',
  key: 'voltage'
}, {
  name: 'sulphur',
  key: 'sulphur'
}]


const seriesKeyValueDataLogic = (data: dataItems[]) => {
  let keyValuePairs = [] as any
  DB_COLUMN_KEYS.forEach((item, index) => {
    keyValuePairs[item.key] = Array()
  })
  Object.keys(keyValuePairs).forEach((keys, index) => {
    for (let i = 0; i < keyValuePairs[keys].length; i++) {
      keyValuePairs[keys][i] = []
    }
  })

  data.map((dataItems: dataItems, dataIndex) => {
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


const getOptions = (seriesData: any) => {
  const options = {
    title: {
      text: 'test Plot',
    },
    xAxis: {
      title: {
        text: 'Date tst',
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
        text: keyName
      }
    })

    options.series.push({
      yAxis: index,
      name: keyName,
      data: seriesData[keyName]
    })
  })

  options.series.push({
    name: 'Scatter Plot',
    color: 'red',
    yAxis: 0,
    data: [
      {
        name: "Point 1",
        "x": 1706725800 * 1000,
        "y": 50000.67377897927,
      },
    ],
    type: 'scatter',
    dragDrop: {
      draggableY: true, // Enable Y-axis dragging
      draggableX: true, // Enable X-axis dragging
    },
    cursor: 'move', // Cursor style when dragging
    // dragMinY: 0, // Minimum Y-axis value allowed during dragging
    // dragMaxY: 10, // Maximum Y-axis value allowed during dragging
    // dragMinX: 0, // Minimum X-axis value allowed during dragging
    // dragMaxX: 10, // Maximum X-axis value allowed during dragging,  
    visible: true,
    marker: {
      symbol: 'circle',
      radius: 10
    }
  })
  return options
}

const SeriesPlot = (props: ISeriesProps) => {
console.log("TESTING APP")
  const options = useMemo(() => {
    return getOptions(seriesKeyValueDataLogic(props.data))
  }, [props.data])


  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SeriesPlot;
