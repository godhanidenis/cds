import { useDispatch, useSelector } from 'react-redux';
import { assignQualityControl, getAllQualityControl, getSelectedQualityControl } from 'services/getQualityControl';
import { setSelectedQCStatus } from 'store/qualityControl';

function useQualityControlData() {
  const dispatch = useDispatch();
  const {
    QCStatusOptions,
    selectedQCStatus,
    assignQualityControlLoading,
    qualityControlData,
    qualityControlLoading,
    selectedQualityControlData,
    selectedQualityControlLoading
  } = useSelector((state) => state?.qualityControl);
  const setSelectedQCStatusData = (params) => dispatch(setSelectedQCStatus(params));
  const assignQualityControlData = (params) => dispatch(assignQualityControl(params));
  const getAllQualityControlData = (params) => dispatch(getAllQualityControl(params));
  const getSelectedQualityControlData = (params) => dispatch(getSelectedQualityControl(params));

  return {
    QCStatusOptions,
    selectedQCStatus,
    qualityControlData,
    qualityControlLoading,
    setSelectedQCStatusData,
    assignQualityControlData,
    getAllQualityControlData,
    assignQualityControlLoading,
    getSelectedQualityControlData,
    selectedQualityControlData,
    selectedQualityControlLoading
  };
}

export default useQualityControlData;
