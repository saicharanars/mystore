import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useUserDispatch = useDispatch.withTypes<AppDispatch>();
export const useUserSelector = useSelector.withTypes<RootState>();
