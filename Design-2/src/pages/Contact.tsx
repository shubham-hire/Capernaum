import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { ArrowRight, MapPin, Mail, Clock, Phone, Send } from 'lucide-react';

// ─── Floating Particle ──────────────────────────────────────────
const FloatingParticle = ({ delay, size, x, y, duration }: { delay: number; size: number; x: string; y: string; duration: number }) => (
  <motion.div
    className="absolute rounded-full bg-cyan-400/20"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -30, 0, 20, 0],
      x: [0, 15, -10, 5, 0],
      opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
      scale: [1, 1.2, 0.9, 1.1, 1],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

// ─── Stagger Variants ────────────────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// ═════════════════════════════════════════════════════════════════
// HERO SECTION
// ═════════════════════════════════════════════════════════════════
const ContactHero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative z-10 min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-20">
      {/* Animated SVG Waves */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-x-0 bottom-0 top-20 z-0 opacity-30 pointer-events-none overflow-hidden"
      >
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.path
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.15 + i * 0.03 }}
              transition={{ duration: 2, delay: i * 0.08, ease: 'easeInOut' }}
              d={`M-100,${350 + i * 30} C200,${300 + i * 30} 500,${450 + i * 30} 800,${380 + i * 30} C1100,${310 + i * 30} 1300,${250 + i * 30} 1600,${320 + i * 30}`}
              stroke="#22d3ee"
              strokeWidth="1"
              fill="none"
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating Orbs */}
      <motion.div
        animate={{ rotate: 360, y: [0, -15, 0] }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute top-1/4 left-[8%] w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-500/10 blur-xl z-0"
      />
      <motion.div
        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          scale: { duration: 5, repeat: Infinity },
        }}
        className="absolute bottom-1/3 right-[8%] w-36 h-36 border border-cyan-500/20 rounded-full z-0"
      />

      {/* Hero Content */}
      <motion.div style={{ y: textY, opacity: heroOpacity }} className="z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-block"
        >
          <span className="px-4 py-2 border border-cyan-400/30 rounded-full text-cyan-400 text-sm tracking-widest uppercase">
            Get In Touch
          </span>
        </motion.div>

        <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8">
          <motion.span className="block overflow-hidden">
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              CONTACT
            </motion.span>
          </motion.span>
          <motion.span className="block overflow-hidden">
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block text-cyan-400 italic font-serif"
            >
              US
            </motion.span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          We&apos;re here to help you grow. Reach out and let&apos;s start a{' '}
          <span className="text-white font-semibold">conversation</span>.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-16">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-white/20 rounded-full mx-auto flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-cyan-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ═════════════════════════════════════════════════════════════════
// CONTACT INFO CARDS
// ═════════════════════════════════════════════════════════════════
const contactDetails = [
  {
    icon: MapPin,
    title: 'Address',
    lines: ['Office No. 507,', 'East Court Viman Nagar', 'Pune', 'Maharashtra'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['contactus@capernaum.in'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    lines: ['24 Hours'],
  },
];

const ContactInfoCards = () => (
  <section className="relative z-10 py-16 px-6 md:px-12 bg-white/5 border-y border-white/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
      {contactDetails.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400/30 transition-all duration-300"
        >
          <motion.div
            className="mb-5 p-4 rounded-xl bg-cyan-900/10 group-hover:bg-cyan-400/10 transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <item.icon className="w-8 h-8 text-cyan-400 stroke-[1.5]" />
          </motion.div>
          <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
          <div className="space-y-1">
            {item.lines.map((line, j) => (
              <p key={j} className="text-gray-400 text-sm">{line}</p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// ═════════════════════════════════════════════════════════════════
// MAIN CONTACT SECTION — IMAGE + FORM
// ═════════════════════════════════════════════════════════════════
const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

        {/* ─── Left: Image + Contact Details Overlay ─── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/5 min-h-[500px]"
        >
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&q=80&w=800&h=800"
            alt="Customer support professional"
            className="w-full h-full object-cover absolute inset-0"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Contact details on image */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute bottom-0 left-0 right-0 p-8 space-y-6"
          >
            <motion.div variants={staggerItem} className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Address</h4>
                <p className="text-gray-300 text-sm leading-relaxed">Office No. 507, East Court Viman Nagar, Pune, Maharashtra</p>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Email</h4>
                <p className="text-gray-300 text-sm">contactus@capernaum.in</p>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Opening Hours</h4>
                <p className="text-gray-300 text-sm">24 Hours</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-amber-400/30 rounded-full blur-sm" />
          <div className="absolute -top-4 -right-4 w-16 h-16 border border-cyan-400/20 rounded-full" />
        </motion.div>

        {/* ─── Right: Contact Form ─── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          className="group relative rounded-2xl border border-white/10 bg-white/5 p-10 overflow-hidden"
        >
          {/* Spotlight glow on hover */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  rgba(34, 211, 238, 0.08),
                  transparent 80%
                )
              `,
            }}
          />

          <div className="relative z-10">
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-amber-400 font-bold uppercase tracking-[0.2em] text-sm mb-4"
            >
              Talk To Us
            </motion.h4>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold leading-tight mb-4 font-serif italic"
            >
              How Can Capernaum Solutions Help Your Business Grow?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-400 mb-8 leading-relaxed"
            >
              Fill out the form below and our team will get back to you within 24 hours.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all duration-300"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all duration-300"
                  />
                </motion.div>
              </div>

              {/* Subject */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all duration-300"
                />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all duration-300 resize-none"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <motion.button
                  type="submit"
                  className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-cyan-400/50 text-cyan-400 rounded-full hover:bg-cyan-400/10 transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-wider uppercase">
                    {submitted ? 'Message Sent!' : 'Send Message'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />

                  {/* Pulsing glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ═════════════════════════════════════════════════════════════════
// MAP SECTION
// ═════════════════════════════════════════════════════════════════
const MapSection = () => (
  <section className="relative z-10 py-16 px-6 md:px-12 max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-12"
    >
      <h4 className="text-amber-400 font-bold uppercase tracking-[0.2em] text-sm mb-4">Find Us</h4>
      <h2 className="text-3xl md:text-4xl font-bold font-serif italic">Our Location</h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/5"
    >
      <iframe
        title="Capernaum Solutions Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.347247207601!2d73.91!3d18.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMzJzM2LjAiTiA3M8KwNTQnMzYuMCJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </motion.div>
  </section>
);

// ═════════════════════════════════════════════════════════════════
// MAIN CONTACT PAGE
// ═════════════════════════════════════════════════════════════════
const Contact = () => {
  return (
    <div className="relative text-white overflow-hidden">
      {/* Floating Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingParticle delay={0} size={6} x="10%" y="20%" duration={7} />
        <FloatingParticle delay={1.5} size={4} x="80%" y="15%" duration={9} />
        <FloatingParticle delay={3} size={8} x="60%" y="70%" duration={6} />
        <FloatingParticle delay={0.5} size={5} x="25%" y="80%" duration={8} />
        <FloatingParticle delay={2} size={3} x="90%" y="50%" duration={10} />
      </div>

      <ContactHero />
      <ContactInfoCards />
      <ContactForm />
      <MapSection />
    </div>
  );
};

export default Contact;
