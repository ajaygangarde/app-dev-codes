import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

// Define a type for the slice state
interface SeriesState {
    seriesData: [],
    seriesInputControls: any,
    isOpenYAxisDailog: boolean
}

export interface ISeriesInputControls {
    minPhoton: number | null,
    maxPhoton: number | null
}

export const seriesInputControlsModel =
{
    minPhoton: null,
    maxPhoton: null,
}

// Define the initial state using that type
const initialState: SeriesState = {
    seriesData: [],
    seriesInputControls: seriesInputControlsModel,
    isOpenYAxisDailog: false
}
// interface genericInteractiveFields {
//     name: string, value: any
// }


export const seriesPlotSlice = createSlice({
    name: 'seriesPlot',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setSeriesData: (state, action: PayloadAction<any>) => {
            state.seriesData = action.payload
        },
        setSeriesInputControls: (state, action: PayloadAction<any>) => {
            state.seriesInputControls = action.payload
        },
        setInterfaceKeys: (state, action: PayloadAction<any>) => {
            const stateNew = state as any
            stateNew[action.payload.name] = action.payload.value
        }
    },
})

export const { setSeriesData, setSeriesInputControls, setInterfaceKeys } = seriesPlotSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSeriesData = (state: RootState) => state.seriesPlot

export default seriesPlotSlice.reducer