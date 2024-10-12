import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useShipmentDispatch = useDispatch.withTypes<AppDispatch>();
export const useShipmentSelector = useSelector.withTypes<RootState>();
