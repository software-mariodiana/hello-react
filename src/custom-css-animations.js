import { useCallback, useEffect } from 'react';

const addStyleElement = (rules) => {
  // An HTML style element should go in the document's head.
  console.log('Adding style element to document head.');
  const style = document.createElement("style");
  style.innerHTML = rules;
  document.head.appendChild(style);
  return style;
};

const useAnimation = (rules) => {
  // Ensure our function won't change and trigger a re-render.
  const addAnimation = useCallback(() => {
    return addStyleElement(rules);
  }, [rules]);

  useEffect(() => {
    const style = addAnimation();

    return () => {
      console.log('Removing style element from document head.');
      document.head.removeChild(style);
    }

    // Run only on mount and unmount (since addAnimation won't change).
  }, [addAnimation]);
};

export default useAnimation;
