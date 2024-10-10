import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useOrderDispatch = useDispatch.withTypes<AppDispatch>();
export const useOrderSelector = useSelector.withTypes<RootState>();
