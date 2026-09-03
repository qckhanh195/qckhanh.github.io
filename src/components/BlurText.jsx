import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const animatedCount = useRef(0);

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, y: -30 }
      : { filter: 'blur(10px)', opacity: 0, y: 30 };

  const defaultTo = [
    { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? -15 : 15 },
    { filter: 'blur(0px)', opacity: 1, y: 0 },
  ];

  const from = animationFrom || defaultFrom;
  const to = animationTo || defaultTo;

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const buildKeyframes = (fromVal, steps) => {
    const keys = new Set([
      ...Object.keys(fromVal),
      ...steps.flatMap((s) => Object.keys(s)),
    ]);
    const keyframes = {};
    keys.forEach((k) => {
      keyframes[k] = [fromVal[k], ...steps.map((s) => s[k])];
    });
    return keyframes;
  };

  const handleComplete = () => {
    animatedCount.current += 1;
    if (animatedCount.current === elements.length && onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={from}
          animate={inView ? buildKeyframes(from, to) : from}
          transition={{
            duration: stepDuration * to.length,
            delay: (i * delay) / 1000,
            ease: easing,
          }}
          onAnimationComplete={handleComplete}
          style={{
            display: 'inline-block',
            willChange: 'transform, filter, opacity',
          }}
        >
          {el === ' ' ? '\u00A0' : el}
          {animateBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
