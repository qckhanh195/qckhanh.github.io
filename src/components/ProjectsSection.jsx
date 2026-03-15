import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    title: 'Project Alpha',
    desc: 'A full-stack web dashboard with real-time data visualization, user authentication, and a sleek modern UI. Built with performance and usability in mind.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    img: '/assets/images/project1.png',
    demo: '#',
    code: 'https://github.com/qckhanh195',
  },
  {
    title: 'Project Beta',
    desc: 'A mobile-first social application with real-time messaging, notifications, and a beautiful dark-themed UI. Focused on smooth user experience.',
    tags: ['JavaScript', 'Firebase', 'CSS3', 'PWA'],
    img: '/assets/images/project2.png',
    demo: '#',
    code: 'https://github.com/qckhanh195',
  },
  {
    title: 'Project Gamma',
    desc: 'A developer tooling suite and CLI utility that automates repetitive tasks, generates boilerplate code, and integrates with popular workflows.',
    tags: ['Python', 'CLI', 'Automation', 'Open Source'],
    img: '/assets/images/project3.png',
    demo: '#',
    code: 'https://github.com/qckhanh195',
  },
];

function ProjectCard({ project, i, inView }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * -8,
      y: ((e.clientX - cx) / (rect.width / 2)) * 8,
    });
  };

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
        willChange: 'transform',
      }}
      className="bg-white border border-orange-100 rounded-2xl overflow-hidden shadow-sm group"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.15 + 0.2, duration: 0.6 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 text-sm font-semibold text-white hover:scale-105 transition-transform shadow-lg"
          >
            ↗ Live Demo
          </a>
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-400 bg-orange-50 text-sm font-semibold text-orange-600 hover:scale-105 transition-transform"
          >
            🐙 Source Code
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-display font-bold text-stone-800 text-lg mb-2">{project.title}</h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-28 relative section-alt">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">What I've built</span>
          <h2
            className="font-display font-bold text-gradient mt-2"
            style={{ fontSize: 'clamp(2rem,4vw,2.8rem)' }}
          >
            Projects
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} i={i} inView={inView} />
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://github.com/qckhanh195"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            🐙 See More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
