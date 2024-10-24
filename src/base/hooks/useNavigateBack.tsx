import { useCallback } from 'react';
import { useNavigate } from 'react-router';

interface IResult {
  goBack: () => void;
}
export const useNavigateBack = (): IResult => {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    goBack,
  };
};
