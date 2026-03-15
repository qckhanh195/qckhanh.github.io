import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Particles from './effects/Particles.jsx';
import BlurText from './effects/BlurText.jsx';
import MagneticButton from './effects/MagneticButton.jsx';

const roles = [
  'web experiences.',
  'cool tools.',
  'open source stuff.',
  'full-stack apps.',
];

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = roles[roleIdx];
    let timeout;
    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIdx((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fff7ed 0%, #ffffff 50%, #fff3e0 100%)' }}
    >
      {/* Subtle particles (lighter opacity for light bg) */}
      <div className="opacity-40">
        <Particles count={55} />
      </div>

      {/* Decorative blobs */}
      <div
        className="absolute top-[-80px] right-[-60px] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-40px] left-[-40px] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)' }}
      />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-10 w-full grid md:grid-cols-[1fr_auto] gap-12 items-center">

        {/* Content */}
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-mono text-orange-500 text-base mb-3 font-medium"
          >
            👋 Hello, I'm
          </motion.p>

          <h1 className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
          >
            <BlurText text="Quoc Khanh" className="text-gradient" />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center gap-2 text-lg md:text-xl text-stone-500 mb-4 font-medium flex-wrap"
          >
            <span>I build </span>
            <span className="text-orange-500 font-semibold min-w-[2ch]">{displayed}</span>
            <span className="text-orange-400 animate-blink font-light">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="text-stone-500 max-w-[500px] mb-8 leading-relaxed text-base"
          >
            A passionate developer who loves crafting beautiful, performant web experiences
            and building tools that make life easier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-4 flex-wrap mb-12"
          >
            <MagneticButton>
              <button onClick={() => scrollTo('projects')} className="btn-primary">
                <span>🚀</span> View My Work
              </button>
            </MagneticButton>
            <MagneticButton>
              <button onClick={() => scrollTo('contact')} className="btn-outline">
                <span>✉️</span> Get In Touch
              </button>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col items-start gap-2"
          >
            <span className="font-mono text-xs text-stone-400">Scroll down</span>
            <div className="w-px h-10 bg-gradient-to-b from-orange-400 to-transparent animate-float" />
          </motion.div>
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring', damping: 15 }}
          className="hidden md:flex relative items-center justify-center"
        >
          {/* Spinning gradient ring */}
          <div
            className="absolute w-[340px] h-[340px] rounded-full animate-spin-slow pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, #f97316, #fbbf24, #ef4444, #f97316)',
              padding: '2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'destination-out',
              maskComposite: 'exclude',
            }}
          />
          {/* Glow */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.2) 0%, transparent 70%)' }}
          />
          {/* Avatar image */}
          <div className="relative w-[270px] h-[270px] rounded-full overflow-hidden border-2 border-orange-300/60 shadow-xl">
            <img
              src="/assets/images/avatar.png"
              alt="Quoc Khanh Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
