import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useUserDispatch = useDispatch.withTypes<AppDispatch>();
export const useUserSelector = useSelector.withTypes<RootState>();
