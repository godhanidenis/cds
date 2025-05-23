import { useSelector } from 'react-redux';

function useCategoryData() {
  const { CategoryAllOptions, selectedCategoryData, selectedCategoryLoading } = useSelector((state) => state?.category);
  return {
    CategoryAllOptions,
    selectedCategoryData,
    selectedCategoryLoading
  };
}

export default useCategoryData;
