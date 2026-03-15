import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MarqueeTrack from './effects/MarqueeTrack.jsx';

const skillCategories = [
  {
    icon: '⚡',
    title: 'Frontend',
    skills: [
      { name: 'HTML / CSS', pct: 90 },
      { name: 'JavaScript', pct: 80 },
      { name: 'React', pct: 65 },
    ],
  },
  {
    icon: '🖥️',
    title: 'Backend',
    skills: [
      { name: 'Node.js', pct: 70 },
      { name: 'Python', pct: 75 },
      { name: 'Java', pct: 60 },
    ],
  },
  {
    icon: '🗄️',
    title: 'Database & Tools',
    skills: [
      { name: 'MySQL / PostgreSQL', pct: 70 },
      { name: 'Git / GitHub', pct: 85 },
      { name: 'Linux / CLI', pct: 65 },
    ],
  },
  {
    icon: '✨',
    title: 'Other',
    skills: [
      { name: 'UI/UX Design', pct: 60 },
      { name: 'REST APIs', pct: 75 },
      { name: 'Docker', pct: 50 },
    ],
  },
];

const badges = [
  { icon: '🌐', label: 'HTML5' },
  { icon: '🎨', label: 'CSS3' },
  { icon: '⚙️', label: 'JavaScript' },
  { icon: '⚛️', label: 'React' },
  { icon: '🟢', label: 'Node.js' },
  { icon: '🐍', label: 'Python' },
  { icon: '☕', label: 'Java' },
  { icon: '🐙', label: 'Git' },
  { icon: '🐳', label: 'Docker' },
  { icon: '🐧', label: 'Linux' },
  { icon: '🍃', label: 'Tailwind' },
  { icon: '🔥', label: 'Firebase' },
];

function SkillBar({ name, pct, inView }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-stone-600">{name}</span>
        <span className="font-mono text-orange-500 font-semibold">{pct}%</span>
      </div>
      <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #f97316, #fbbf24)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, i, inView }) {
  return (
    <motion.div
      className="glass glass-hover rounded-2xl p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
    >
      <h3 className="font-display font-semibold text-stone-800 mb-5 flex items-center gap-2">
        <span>{category.icon}</span> {category.title}
      </h3>
      {category.skills.map((s) => (
        <SkillBar key={s.name} name={s.name} pct={s.pct} inView={inView} />
      ))}
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-28 relative bg-white">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">What I work with</span>
          <h2
            className="font-display font-bold text-gradient mt-2"
            style={{ fontSize: 'clamp(2rem,4vw,2.8rem)' }}
          >
            Skills &amp; Tech
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} i={i} inView={inView} />
          ))}
        </div>

        {/* Infinite badge marquee */}
        <MarqueeTrack speed={30}>
          {badges.map((b, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-50 border border-orange-200 text-sm text-stone-600 font-medium whitespace-nowrap cursor-default hover:border-orange-400 hover:text-orange-600 hover:bg-orange-100 transition-all"
            >
              <span>{b.icon}</span> {b.label}
            </span>
          ))}
        </MarqueeTrack>
      </div>
    </section>
  );
}
