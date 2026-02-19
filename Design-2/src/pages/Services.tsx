import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { ArrowRight, Headphones, ShieldCheck, Target, Monitor, Megaphone, Search } from 'lucide-react';

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

// ─── Spotlight Card with Tilt ────────────────────────────────────
const SpotlightCard = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    rotateX.set(((clientY - top) / height - 0.5) * -8);
    rotateY.set(((clientX - left) / width - 0.5) * 8);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
      className={`group relative border border-white/10 bg-white/5 overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 211, 238, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

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
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const;

// ─── Service Data ────────────────────────────────────────────────
const services = [
  {
    icon: Headphones,
    title: 'Customer Support',
    description:
      'Providing seamless, 24/7 multi-channel customer support through voice, email, chat, and social media — ensuring every interaction leaves a lasting positive impression.',
    highlights: ['24/7 Availability', 'Omni-Channel', 'Multilingual'],
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description:
      'Implementing rigorous monitoring, auditing, and feedback processes that maintain unparalleled service standards and drive continuous improvement across all operations.',
    highlights: ['Call Auditing', 'Performance Metrics', 'Compliance'],
  },
  {
    icon: Target,
    title: 'Lead Generation',
    description:
      'Delivering high-quality, pre-qualified leads through data-driven outreach strategies, helping you accelerate pipeline growth and maximize revenue potential.',
    highlights: ['B2B & B2C', 'Data-Driven', 'Pipeline Growth'],
  },
  {
    icon: Monitor,
    title: 'IT Solutions',
    description:
      'Delivering secure, scalable, and innovative technology services — from cloud infrastructure to custom software development — tailored to your evolving business demands.',
    highlights: ['Cloud Services', 'Custom Software', 'Cybersecurity'],
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'Crafting data-driven digital strategies encompassing SEO, paid campaigns, social media management, and content marketing to amplify your brand\'s online presence.',
    highlights: ['SEO & SEM', 'Social Media', 'Content Strategy'],
  },
  {
    icon: Search,
    title: 'Market Research',
    description:
      'Providing deep market insights through competitive analysis, consumer behavior studies, and trend forecasting to empower smarter, faster business decisions.',
    highlights: ['Competitive Intel', 'Consumer Insights', 'Trend Forecasting'],
  },
];

// ═════════════════════════════════════════════════════════════════
// HERO SECTION //
// ═════════════════════════════════════════════════════════════════
const ServicesHero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative z-10 min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-20">
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
            What We Offer
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
              OUR
            </motion.span>
          </motion.span>
          <motion.span className="block overflow-hidden">
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block text-cyan-400 italic font-serif"
            >
              SERVICES
            </motion.span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          End-to-end BPO & IT solutions crafted to{' '}
          <span className="text-white font-semibold">elevate your business</span>, streamline operations, and drive measurable growth.
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
// SERVICE CARDS GRID
// ═════════════════════════════════════════════════════════════════
const ServiceGrid = () => (
  <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl md:text-5xl font-bold tracking-tight border-l-4 border-cyan-400 pl-4 mb-0"
      >
        Services We Provide
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-400 max-w-md mt-4 md:mt-0"
      >
        Comprehensive solutions designed to transform every facet of your business operations.
      </motion.p>
    </div>

    {/* Service Cards - 3 column grid on lg */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, idx) => (
        <SpotlightCard key={idx} delay={idx * 0.1} className="rounded-2xl p-8 hover:border-cyan-400/30 transition-colors">
          {/* Icon */}
          <motion.div
            className="mb-6 p-4 bg-cyan-900/10 rounded-xl w-fit group-hover:bg-cyan-400/10 transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <service.icon className="w-8 h-8 text-cyan-400 stroke-[1.5]" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed text-sm mb-5">{service.description}</p>

          {/* Highlight Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {service.highlights.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full border border-white/10 text-cyan-400/80 bg-cyan-400/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Animated bottom line */}
          <motion.div
            className="h-[2px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + idx * 0.08, duration: 0.8 }}
          />
        </SpotlightCard>
      ))}
    </div>
  </section>
);

// ═════════════════════════════════════════════════════════════════
// WHY CHOOSE US STATS STRIP
// ═════════════════════════════════════════════════════════════════
const StatsStrip = () => {
  const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '99%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Expert Professionals' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-10 py-16 px-6 md:px-12 bg-white/5 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// ═════════════════════════════════════════════════════════════════
// PROCESS SECTION
// ═════════════════════════════════════════════════════════════════
const ProcessSection = () => {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'We analyze your business needs and identify the best strategies for growth.' },
    { num: '02', title: 'Strategy', desc: 'Custom-tailored plans are developed to align with your goals and budget.' },
    { num: '03', title: 'Execution', desc: 'Our expert teams deliver services with precision, speed, and accountability.' },
    { num: '04', title: 'Optimization', desc: 'Continuous monitoring and refinement ensures peak performance at all times.' },
  ];

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.h4 variants={staggerItem} className="text-amber-400 font-bold uppercase tracking-[0.2em] text-sm mb-6">
          How We Work
        </motion.h4>
        <motion.h2 variants={staggerItem} className="text-3xl md:text-5xl font-bold tracking-tight font-serif italic">
          Our Process
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-center group"
          >
            {/* Step Number */}
            <div className="text-6xl font-black text-white/5 group-hover:text-cyan-400/10 transition-colors duration-500 mb-4 select-none">
              {step.num}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>

            {/* Connector line (not on last item) */}
            {i < steps.length - 1 && (
              <motion.div
                className="hidden lg:block absolute top-8 -right-4 w-8 h-[2px] bg-gradient-to-r from-cyan-400/40 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ═════════════════════════════════════════════════════════════════
// CTA SECTION
// ═════════════════════════════════════════════════════════════════
const ServicesCTA = () => (
  <section className="py-32 px-6 text-center relative z-10 overflow-hidden">
    {/* Background glow */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 max-w-4xl mx-auto"
    >
      <motion.h2
        className="text-4xl md:text-6xl font-bold mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Ready to Transform Your Operations?
      </motion.h2>
      <motion.p
        className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Partner with Capernaum Solutions and unlock the full potential of your business with our tailored services.
      </motion.p>

      <motion.button
        className="group relative inline-flex items-center gap-3 px-10 py-5 bg-transparent border border-cyan-400/50 text-cyan-400 rounded-full hover:bg-cyan-400/10 transition-all duration-300"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-lg font-bold tracking-wider">Get In Touch</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

        {/* Pulsing glow */}
        <motion.div
          className="absolute inset-0 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.4)]"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.button>
    </motion.div>
  </section>
);

// ═════════════════════════════════════════════════════════════════
// MAIN SERVICES PAGE
// ═════════════════════════════════════════════════════════════════
const Services = () => {
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

      <ServicesHero />
      <StatsStrip />
      <ServiceGrid />
      <ProcessSection />
      <ServicesCTA />
    </div>
  );
};

export default Services;
