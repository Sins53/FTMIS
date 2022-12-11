import { useEffect, useRef, useState } from 'react';

const check = {
  isMobile: false,
  isTablet: false,
  isDesktop: false
};

export const useWindowSize = () => {
  const [size, setSize] = useState({ height: window, innerHeight, width: window.innerWidth });
  const [device, setDevice] = useState(check);
  const resizeInProgress = useRef(false);
  useEffect(() => {
    function throttled_updateWindowSize() {
      setTimeout(() => {
        setSize({ height: window, innerHeight, width: window.innerWidth });
        resizeInProgress.current = false;
      }, 1000);
    }
    const handleResize = () => {
      if (resizeInProgress.current === true) {
        return;
      }
      resizeInProgress.current = true;
      throttled_updateWindowSize();
      setSize({ height: window, innerHeight, width: window.innerWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (size.width <= 767 && check.isMobile === false) {
      setDevice({ ...check, isMobile: true });
    } else if (size.width <= 991 && check.isTablet === false) {
      setDevice({ ...check, isTablet: true });
    } else if (size.width >= 992 && check.isDesktop === false) {
      setDevice({ ...check, isDesktop: true });
    }
  }, [size]);

  return device;
};

// return {device,size}
//if you want to return size
