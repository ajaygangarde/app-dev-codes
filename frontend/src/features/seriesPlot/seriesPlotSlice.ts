import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

// Define a type for the slice state
interface SeriesState {
    seriesData: []
}

// Define the initial state using that type
const initialState: SeriesState = {
    seriesData: [],
}

export const seriesPlotSlice = createSlice({
    name: 'seriesPlot',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setSeriesData: (state, action: PayloadAction<any>) => {
            state.seriesData = action.payload
        },
    },
})

export const { setSeriesData } = seriesPlotSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSeriesData = (state: RootState) => state.seriesPlot

export default seriesPlotSlice.reducer