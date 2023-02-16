import { isRejectedWithValue, isFulfilled } from '@reduxjs/toolkit'
import { ToastVariants } from '../../../constants/variants'
import { show } from '../../reducers/toast'

const getErrorMessage = action => action.payload?.data?.message || 'Something went wrong'
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error('ACTION', action)
    api.dispatch(show({ message: getErrorMessage(action), variant: ToastVariants.DANGER }))
  } else if (isFulfilled(action)) {
    console.log('ACTION', action)
    api.dispatch(show({ message: 'Success', variant: ToastVariants.SUCCESS }))
  }
  return next(action)
}