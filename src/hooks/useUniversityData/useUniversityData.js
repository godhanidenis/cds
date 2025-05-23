import { useDispatch, useSelector } from 'react-redux';
import { getAllUniversity } from 'services/getUniversity';
import { setSelectedUniversity } from 'store/university';

function useUniversityData() {
  const dispatch = useDispatch();
  const { selectedUniversity, allUniversityData, allUniversityLoading } = useSelector((state) => state?.university);

  const getAllUniversityData = (params) => dispatch(getAllUniversity(params));
  const setSelectedUniversityData = (params) => dispatch(setSelectedUniversity(params));

  return {
    getAllUniversityData,
    setSelectedUniversityData,
    selectedUniversity,
    allUniversityData,
    allUniversityLoading
  };
}

export default useUniversityData;
