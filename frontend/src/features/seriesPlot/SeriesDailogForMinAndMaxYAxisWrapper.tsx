import { Grid, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputDailog from '../../components/InputDailog';
import { useAppSelector } from '../../hooks/hooks';
import { ISeriesInputControls, seriesInputControlsModel, setInterfaceKeys, setSeriesInputControls } from '../seriesPlot/seriesPlotSlice'
interface IProps {
    // isOpenD: boolean
}
const SCALING_YAXIS_CONTROLS = [{
    name: "minPhoton",
    lable: " Min Photon"
}, {
    name: "maxPhoton",
    lable: "Max Photon"
}]
const SeriesDailogForMinAndMaxYAxisWrapper = (props: IProps) => {
    const dispatch = useDispatch();
    const [YAxisScaleForm, setYAxisScaleForm] = useState<any>(seriesInputControlsModel);
    const isOpenYAxisDailog = useAppSelector((state) => state.seriesPlot.isOpenYAxisDailog);


    const handleClose = useCallback(() => {
        dispatch(setInterfaceKeys({ name: 'isOpenYAxisDailog', value: false }));
    }, [dispatch])

    const saveForm = useCallback(() => {
        const inputControls: ISeriesInputControls = YAxisScaleForm
        dispatch(setSeriesInputControls(inputControls));
        handleClose();
    }, [YAxisScaleForm, handleClose, dispatch])
    const onChangeHandle = (name: string, value: string) => {

        setYAxisScaleForm((preState: any) => (
            {
                ...preState,
                [name]: Number(value)
            }
        ))
    }

    return (
        <div>
            <InputDailog title="Y Axis Scaling"
                handleClose={handleClose}
                saveForm={saveForm}
                isOpen={isOpenYAxisDailog} >
                {SCALING_YAXIS_CONTROLS.map(inputs => {
                    return (
                        <div key={inputs.name}>
                            <Grid container direction="row">
                                <TextField variant="standard" name={inputs.name} label={inputs.lable}
                                    value={YAxisScaleForm[inputs.name]}
                                    onChange={(e) => onChangeHandle(inputs.name, e.target.value)} />
                                {/* // Correct event handler here */}
                            </Grid>
                        </div>
                    )
                }
                )}

            </InputDailog>
        </div>
    );
};

export default SeriesDailogForMinAndMaxYAxisWrapper;


