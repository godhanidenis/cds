import { useDispatch, useSelector } from 'react-redux';
import { getAllYear } from 'services/getYear';
import { setSelectedYear } from 'store/year';

function useReportYearData() {
  const dispatch = useDispatch();
  const { selectedYear, allYearData, allYearLoading } = useSelector((state) => state?.year);

  const getAllYearData = (params) => dispatch(getAllYear(params));
  const setSelectedYearData = (params) => dispatch(setSelectedYear(params));

  return {
    getAllYearData,
    setSelectedYearData,
    selectedYear,
    allYearData,
    allYearLoading
  };
}

export default useReportYearData;
