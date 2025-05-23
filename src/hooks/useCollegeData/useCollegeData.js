import { useDispatch, useSelector } from 'react-redux';
import { getCollege, createCollege, getSingleCollege } from 'services/getCollege';

function useCollegeData() {
  const dispatch = useDispatch();
  const { collegeData, collegeTotalRecords, collegeLoading, createCollegeLoading, collegeSingleData, collegeSingleLoading } = useSelector(
    (state) => state?.college
  );

  const getCollegeData = (params) => dispatch(getCollege(params));
  const getSingleCollegeData = (params) => dispatch(getSingleCollege(params));
  const createCollegeData = (params) => dispatch(createCollege(params));

  return {
    getCollegeData,
    getSingleCollegeData,
    createCollegeData,
    collegeData,
    collegeSingleData,
    collegeTotalRecords,
    collegeLoading,
    collegeSingleLoading,
    createCollegeLoading
  };
}

export default useCollegeData;
