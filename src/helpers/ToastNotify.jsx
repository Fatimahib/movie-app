import {toast} from "react-toastify"

const toastSuccessNotify = (msg) => {
    //toast.success(message);
    toast.success(msg, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
};

const toastErrorNotify = (msg) => {
   // toast.error(message);
   toast.error(msg, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const toastWarningNotify = (msg) => {
   // toast.warning(message);

   toast.warn(msg, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};



export {toastSuccessNotify, toastErrorNotify, toastWarningNotify};

