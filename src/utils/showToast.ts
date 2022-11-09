import { Id, toast, ToastOptions } from 'react-toastify';

const options: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const showToast = (notification: string, type = 'default'): Id => {
  if (type === 'default') {
    return toast(notification, options);
  }
  return toast.error(notification, options);
};

export default showToast;
