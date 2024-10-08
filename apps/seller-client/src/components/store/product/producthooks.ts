import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useProductDispatch = useDispatch.withTypes<AppDispatch>();
export const useProductSelector = useSelector.withTypes<RootState>();
