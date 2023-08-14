import React from "react";

interface Props {
  leftSwipeAction?: any;
  rightSwipeAction?: any;
  [key: string]: any;
}

const SwipeWrapper: React.FC<Props> = ({ children, leftSwipeAction, rightSwipeAction, ...rest }) => {
  const touchStart = React.useRef(0);
  const touchEnd = React.useRef(0);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    touchEnd.current = null; // otherwise the swipe is fired even with usual touch events
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: any) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && leftSwipeAction) leftSwipeAction();
    if (isRightSwipe && rightSwipeAction) rightSwipeAction();
  };
  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} {...rest}>
      {children}
    </div>
  );
};

export default SwipeWrapper;
