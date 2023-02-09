import React from 'react';
import useEscapeKey from '../../hooks/useEscapeKey';

import Toast from '../Toast';
import { ToastContext } from '../ToastProvider/ToastProvider';
import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts, deleteAllToasts } = React.useContext(ToastContext);
  useEscapeKey(deleteAllToasts);

  // React.useEffect(() => {
  //   function handleKeyDown(e) {
  //     if (e.code === 'Escape') {
  //       deleteAllToasts();
  //     }
  //   }

  //   window.addEventListener('keydown', handleKeyDown)

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   }
  // }, [deleteAllToasts])

  return (
    <ol className={styles.wrapper} role="region" aria-live="polite" aria-label="Notifications"> {/* "polite" is more appropriate than "assertive" */}
      {toasts.map(({ id, message, variant}) =>
        <li className={styles.toastWrapper} key={id}>
          <Toast variant={variant} id={id} message={message} />
        </li>
      )}
    </ol>
  );
}

export default ToastShelf;
