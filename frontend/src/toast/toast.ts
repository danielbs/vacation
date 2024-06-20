// Importing the 'toast' object from 'react-hot-toast' for creating notifications
import {toast} from 'react-hot-toast';

// Defines a function to display an error toast notification
const toastError = (message: string, toastId?: string) => {
  // Calls the toast.error method with custom options
  return toast.error(message, {
    duration: 1500,          // The toast will auto-dismiss after 1500 milliseconds
    position: "top-center",  // The toast appears at the top center of the viewport
    id: toastId              // Optional: Unique identifier for the toast (useful for dismissing it programmatically)
  });
};

// Defines a function to display a success toast notification
const toastSuccess = (message: string, toastId?: string) => {
  // Calls the toast.success method with custom options
  return toast.success(message, {
    duration: 1500,          // The toast will auto-dismiss after 1500 milliseconds
    position: "top-center",  // The toast appears at the top center of the viewport
    id: toastId              // Optional: Unique identifier for the toast (useful for dismissing it programmatically)
  });
};

// Defines a function to display a loading toast notification
const toastLoading = (message: string) => {
  // Calls the toast.loading method which is used for ongoing processes
  return toast.loading(message); // Default positioning and duration applies
}

// Defines a function to programmatically dismiss a toast
const toastDismiss = (toastId: string) => {
  // Calls the toast.dismiss method with the toast's unique identifier
  return toast.dismiss(toastId); // This will remove the toast before it auto-dismisses
}

// Exporting the toast utility functions for use in other parts of the application
export { toastError, toastSuccess, toastLoading, toastDismiss };
