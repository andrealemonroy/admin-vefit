import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hide } from '../../redux/reducers/toast';
import { Toast as ToastAtom } from '../atoms/Toast';

const HIDE_TIMEOUT = 3000;

export const Toast = () => {
  const config = useSelector<{
    toast: { message: string; variant: string; withIcon: boolean };
  }>((state) => state.toast) as {
    message: string;
    variant: string;
    withIcon: boolean;
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (config.message) setTimeout(() => dispatch(hide()), HIDE_TIMEOUT);
  }, [config, dispatch]);
  if (!config?.message) return null;
  else
    return (
      <ToastAtom variant={config.variant} withIcon={config.withIcon}>
        {config.message}
      </ToastAtom>
    );
};
