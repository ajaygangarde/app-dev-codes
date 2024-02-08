import { configureStore } from '@reduxjs/toolkit'
import seriesPlotSlice from '../features/seriesPlot/seriesPlotSlice'

export const store = configureStore({
    reducer: {
        seriesPlot: seriesPlotSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;