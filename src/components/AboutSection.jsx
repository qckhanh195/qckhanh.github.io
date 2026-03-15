import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function StatCard({ end, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <div ref={ref} className="glass glass-hover rounded-2xl p-6 text-center">
      <span className="block text-4xl font-display font-bold text-gradient mb-1">
        {count}+
      </span>
      <span className="text-sm text-stone-500">{label}</span>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const infoItems = [
    { icon: '📍', label: 'Vietnam 🇻🇳' },
    { icon: '🎓', label: 'Computer Science' },
    { icon: '💼', label: 'Open to Work' },
    { icon: '🌐', label: 'Vietnamese / English' },
  ];

  return (
    <section id="about" className="py-28 relative section-alt">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          <span className="section-tag">Get to know me</span>
          <h2 className="font-display font-bold text-gradient mt-2"
            style={{ fontSize: 'clamp(2rem,4vw,2.8rem)' }}>
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}>
            <p className="text-stone-600 mb-4 leading-relaxed">
              Hi! I'm <strong className="text-stone-800">Quoc Khanh</strong>, also known as{' '}
              <span className="text-gradient font-semibold">Qika</span> 👾. I'm a developer
              based in Vietnam, passionate about building things for the web and exploring
              the intersection of design and technology.
            </p>
            <p className="text-stone-600 mb-4 leading-relaxed">
              When I'm not coding, you'll find me gaming, listening to music, or discovering
              new ways to automate boring tasks. I believe great software comes from curiosity
              and attention to detail.
            </p>
            <p className="text-stone-600 mb-6 leading-relaxed">
              I'm always open to <strong className="text-stone-800">new opportunities</strong>,
              collaborations, and interesting conversations. Feel free to reach out!
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {infoItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm text-stone-600">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              ✉️ Contact Me
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div className="grid grid-cols-2 gap-4" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}>
            <StatCard end={10} label="Projects Built" />
            <StatCard end={3} label="Years Coding" />
            <StatCard end={5} label="Tech Stacks" />
            <StatCard end={100} label="Cups of Coffee ☕" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
