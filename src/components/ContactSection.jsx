import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const contactLinks = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'qckhanh195@gmail.com',
    href: 'mailto:qckhanh195@gmail.com',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/qckhanh195',
    href: 'https://github.com/qckhanh195',
  },
  {
    icon: '🌐',
    label: 'Website',
    value: 'qckhanh.id.vn',
    href: 'https://qckhanh.id.vn',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const msg = form.message.value;
    window.location.href = `mailto:qckhanh195@gmail.com?subject=Portfolio Contact from ${name}&body=${msg}%0A%0AReply to: ${email}`;
  };

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.6 },
  });

  return (
    <section id="contact" className="py-28 relative bg-white">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div className="text-center mb-14" {...fadeUp(0)}>
          <span className="section-tag">Let's connect</span>
          <h2
            className="font-display font-bold text-gradient mt-2"
            style={{ fontSize: 'clamp(2rem,4vw,2.8rem)' }}
          >
            Get In Touch
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
          {/* Left: links */}
          <motion.div {...fadeUp(0.2)}>
            <p className="text-stone-500 leading-relaxed mb-8 text-base">
              I'm currently open to new opportunities and collaborations. Whether you have a
              project in mind, a question, or just want to say hi —{' '}
              <span className="text-orange-500 font-semibold">my inbox is always open!</span>
            </p>
            <div className="flex flex-col gap-4">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-orange-50 border border-orange-200 group transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 6, borderColor: '#f97316', backgroundColor: '#fff7ed' }}
                >
                  <span className="text-2xl">{link.icon}</span>
                  <div>
                    <span className="block font-mono text-xs text-stone-400 uppercase tracking-wider mb-0.5">
                      {link.label}
                    </span>
                    <span className="text-stone-700 text-sm group-hover:text-orange-500 transition-colors font-medium">
                      {link.value}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white border border-orange-100 rounded-2xl p-8 flex flex-col gap-5 shadow-sm"
            {...fadeUp(0.35)}
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-stone-600 font-medium" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="bg-orange-50/60 border border-orange-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-orange-400 focus:bg-orange-50 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-stone-600 font-medium" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="bg-orange-50/60 border border-orange-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-orange-400 focus:bg-orange-50 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-stone-600 font-medium" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                required
                className="bg-orange-50/60 border border-orange-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-orange-400 focus:bg-orange-50 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="shimmer-btn font-semibold py-3 px-6 rounded-xl w-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              ✈️ Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
