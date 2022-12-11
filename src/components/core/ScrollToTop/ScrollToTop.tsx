import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);
  const scrollElem: any = document.getElementsByClassName('scrollableElem');

  const handleScroll = () => {
    if (scrollElem[0].scrollTop > 10) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
    console.log(scrollElem[0].scrollTop, 'sup');
    // scrollElem[0];
  };

  useEffect(() => {
    scrollElem[0].addEventListener('scroll', handleScroll);
    return () => {
      scrollElem[0].removeEventListener('scroll', handleScroll);
    };
  }, []);

  // const checkScrollTop = () => {
  //   if (window.pageYOffset > 400) {
  //     setShowScroll(true);
  //   } else if (window.pageYOffset <= 400) {
  //     setShowScroll(false);
  //   }
  // };

  // const scrollTop = () => {
  //   console.log('clicked');
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  // window.addEventListener('scroll', checkScrollTop);

  // console.log(showScroll, 'showScroll');

  const scrollTop = () => {
    scrollElem[0].scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
      {showScroll && (
        <button className="scrollable-top" onClick={scrollTop}>
          <i className="ic-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
