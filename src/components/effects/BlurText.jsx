import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function BlurText({ text, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  };

  const wordVariant = {
    hidden: {
      opacity: 0,
      filter: 'blur(14px)',
      y: 10,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          className="inline-block"
          style={{ marginRight: i < words.length - 1 ? '0.25em' : 0 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
