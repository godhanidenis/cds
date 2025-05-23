import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from 'services/getUser';

function useUserData() {
  const dispatch = useDispatch();
  const { allUserData, userAllLoading } = useSelector((state) => state?.user);

  const getAllUserData = () => dispatch(getAllUser());

  return {
    getAllUserData,
    allUserData,
    userAllLoading
  };
}

export default useUserData;
