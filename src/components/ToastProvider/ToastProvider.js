import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

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
