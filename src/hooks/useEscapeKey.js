import * as React from 'react';

export default function useEscapeKey(callback) {
  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        callback(e); // add the argument in case we need the event object for some other callback, even if not this one.
        // better genericizes the custom hook
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [callback])
}

/*
GENERICIZED VERSION THAT ACCEPTS ANY KEY, FOR COMPLETENESS SAKE
function useKeydown(key, callback) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === key) {
        callback(event);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
}
*/

