import React from 'react';

import Button from '../Button';
// import Toast from '../Toast/Toast';
import ToastShelf from '../ToastShelf/ToastShelf';
import { ToastContext } from '../ToastProvider/ToastProvider';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('notice'); // VARIANT_OPTIONS[0] is better choice
  // const [showToast, setShowToast] = React.useState(false);
  const [showToasts, setShowToasts] = React.useState(false);
  // const [toasts, setToasts] = React.useState([]);
  const { addToast } = React.useContext(ToastContext);
  // console.log({ addToast })

  // function handleDismiss() {
  //   setShowToast(false);
  // }

  // function addToast(e) {
  //   // e.preventDefault(); // do I need this?
  //   const oldToasts = [...toasts];
  //   const newToast = {
  //     message,
  //     variant,
  //     id: Math.random()
  //   }
  //   oldToasts.push(newToast);
  //   setToasts(oldToasts);
  // }

  function handleSubmit(e) {
    e.preventDefault(); // do I need this?
    setShowToasts(true);
    // const oldToasts = [...toasts];
    // const newToast = {
    //   message,
    //   variant,
    //   id: Math.random()
    // }
    // oldToasts.push(newToast);
    // setToasts(oldToasts);
    addToast(message, variant);
    setMessage('');
    setVariant('notice');
  }

  // function handleDismiss(id) {
  //   const modifiedToasts = [...toasts].filter(t => t.id !== id);
  //   setToasts(modifiedToasts);
  // }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {/* showToast && <Toast message={message} variant={variant} handleDismiss={handleDismiss} /> */}
      {/* <ToastShelf toasts={toasts} handleDismiss={handleDismiss} /> */}
      {/* {showToasts && <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />} */}
      {showToasts && <ToastShelf />}

      <div className={styles.controlsWrapper}> {/* form should be here, around Radio Buttons and Message Textarea */}
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map(v =>
              <label htmlFor={`variant-${v}`} key={v}>
                <input
                  id={`variant-${v}`}
                  type='radio'
                  name='variant'
                  value={v}
                  checked={v === variant}
                  onChange={e => setVariant(e.target.value)}
                />
                {v}
              </label>
            )}
            {/* TODO Other Variant radio buttons here */}
          </div>
        </div>

        <form className={styles.row} onSubmit={handleSubmit}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(ToastPlayground);
