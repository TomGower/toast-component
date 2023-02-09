import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  /*
  JOSH SOLUTION is that event handler for dismiss toasts should live here, rather than in ToastShelf where I put it
  Might have different places that show toasts, e.g. in different views, different formatting options, different arrangement for mobile
  No matter what we do with toast behavior, we always want the shortcut to be wired up
  */

  const addToast = React.useCallback((message, variant) => {
    setToasts((v) => {
      const oldV = [...v];
      const newToast = {
        message,
        variant,
        id: Math.random()
      }
      oldV.push(newToast);
      return oldV;
    });
  }, []);

  
  const deleteToast = React.useCallback(function (id) {
    setToasts((v) => {
        const updatedV = [...v].filter(t => t.id !== id);
        return updatedV;
    });
  }, []);

  const deleteAllToasts = React.useCallback(function() {
    setToasts([]);
  }, []);

    
  const value = React.useMemo(() => ({
    toasts,
    setToasts,
    addToast,
    deleteToast,
    deleteAllToasts,
  }), [toasts, addToast, deleteToast, deleteAllToasts]);

  console.log(value);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;
