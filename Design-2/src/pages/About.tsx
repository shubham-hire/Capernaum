import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Globe, TrendingUp, Users, Coins, Headphones, Settings, Heart, Phone, Shield, GraduationCap, Target, Monitor, CheckCircle, } from 'lucide-react';

// ─── Animated Counter Component ─────────────────────────────────
const AnimatedCounter = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const prefix = value.startsWith('$') ? '$' : '';
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numericValue);
      setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, suffix]);

  return <span ref={ref}>{displayValue}</span>;
};

// ─── Floating Particle Component ─────────────────────────────────
const FloatingParticle = ({ delay, size, x, y, duration }: { delay: number, size: number, x: string, y: string, duration: number }) => (
  <motion.div
    className="absolute rounded-full bg-cyan-400/20"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -30, 0, 20, 0],
      x: [0, 15, -10, 5, 0],
      opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
      scale: [1, 1.2, 0.9, 1.1, 1],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ─── Section Heading with Line Animation ─────────────────────────
const SectionHeading = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className={`text-3xl md:text-5xl font-bold tracking-tight mb-8 ${className}`}
  >
    {children}
  </motion.h2>
);

// ─── Spotlight Card with Tilt Effect ─────────────────────────────
const SpotlightCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    // Subtle 3D tilt
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
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

// ─── Stagger Container ───────────────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
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

// ─── Our Mission Section ─────────────────────────────────────────
const OurMission = () => {
  const checkItems = ['LEAD QUALIFICATION', 'CUSTOMER REGISTRATION UPDATES', 'CUSTOMER SATISFACTION SURVEYS'];
  return (
    <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <motion.h4 variants={staggerItem} className="text-amber-400 font-bold uppercase tracking-[0.2em] text-sm mb-6">
            Our Mission
          </motion.h4>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 font-serif italic">
            To Empower Businesses Worldwide With Reliable, People-First Outsourcing Solutions That Drive Growth And Efficiency.
          </motion.h2>
          <motion.p variants={staggerItem} className="text-gray-400 leading-relaxed mb-4">
            We are dedicated to providing compassionate, efficient, and expert customer support. Our team of trained professionals ensures every interaction is handled with care, precision, and a human touch.
          </motion.p>
          <motion.p variants={staggerItem} className="text-gray-400 leading-relaxed mb-8">
            We tailor our services to meet your business needs, combining advanced technology with genuine human connection to deliver exceptional customer experiences.
          </motion.p>
          <motion.div variants={staggerItem} className="space-y-4">
            {checkItems.map((item, i) => (
              <motion.div key={i} className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}>
                <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm font-semibold tracking-wider uppercase text-gray-200">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 60, scale: 0.95 }} whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/5">
            <img src="/mission-professional.png" alt="Customer support professional" className="w-full h-[500px] object-cover" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-amber-400/30 rounded-full blur-sm" />
          <div className="absolute -top-4 -right-4 w-16 h-16 border border-cyan-400/20 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

// ─── Our Vision Section ──────────────────────────────────────────
const OurVision = () => {
  const features = [
    { icon: Headphones, title: 'Customer Service', desc: 'Delivering prompt, personalized, and dependable support that puts our clients and their customers first—every time.' },
    { icon: Users, title: 'Qualified Team', desc: 'A skilled, dedicated team committed to excellence, continuous learning, and delivering high-quality results across every project.' },
    { icon: Settings, title: 'Cutting-Edge Technology', desc: 'Leveraging the latest tools and innovations to streamline processes, enhance efficiency, and deliver smarter BPO solutions.' },
    { icon: Heart, title: 'Customer Commitment', desc: "Driven by a deep commitment to our clients' success through consistent, reliable, and value-driven service at every touchpoint." },
  ];
  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-10 py-24 px-6 md:px-12 bg-white/5 border-y border-white/5 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute left-[-60px] bottom-[-60px] w-48 h-48 border border-white/5 rounded-full" />
      <div className="absolute left-[-30px] bottom-[-30px] w-32 h-32 border border-white/5 rounded-full" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h4 variants={staggerItem} className="text-amber-400 font-bold uppercase tracking-[0.2em] text-sm mb-6">
              Our Vision
            </motion.h4>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-serif italic">
              To Empower Businesses Worldwide With Reliable, People-First Outsourcing Solutions That Drive Growth And Efficiency.
            </motion.h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img src="/vision-team.png" alt="Team working in office" className="w-full h-[350px] object-cover" />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <SpotlightCard key={i} delay={i * 0.12} className="rounded-2xl p-8 hover:border-amber-400/30 transition-colors">
              <motion.div className="mb-5 text-amber-400" whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}>
                <f.icon className="w-10 h-10 stroke-[1.5]" />
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ─── Who We Are Section ──────────────────────────────────────────
const WhoWeAre = () => {
  const services = [
    { icon: Phone, title: 'Support 24/7', desc: 'Cater to customers across different time zones, ensuring no one is left without support' },
    { icon: Headphones, title: 'Customer Support', desc: 'Providing seamless and efficient interactions through Email, Chat, and Omni-channel services.' },
    { icon: Shield, title: 'Quality Assurance', desc: 'Implementing rigorous monitoring and feedback processes to maintain unparalleled service standards.' },
    { icon: GraduationCap, title: 'Training & Development', desc: 'Equipping teams with tailored programs to ensure operational excellence.' },
    { icon: Target, title: 'Lead Generation', desc: 'Delivering qualified leads to accelerate business growth and revenue.' },
    { icon: Monitor, title: 'IT Solutions', desc: 'Delivering secure, scalable, and innovative IT services tailored to evolving business demands.' },
  ];
  return (
    <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 items-start">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-1">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif italic">Who We Are</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            "At Capernaum Solutions, we don't just provide services; we create impactful partnerships. We empower organizations to thrive in today's competitive market with a focus on innovation, reliability, and customer care."
          </p>
        </motion.div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.slice(0, 2).map((s, i) => (
            <SpotlightCard key={i} delay={i * 0.15} className="rounded-2xl p-8 text-center hover:border-amber-400/30 transition-colors">
              <div className="text-amber-400 mb-4 flex justify-center">
                <s.icon className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.slice(2).map((s, i) => (
          <SpotlightCard key={i} delay={0.3 + i * 0.12} className="rounded-2xl p-8 text-center hover:border-amber-400/30 transition-colors">
            <div className="text-amber-400 mb-4 flex justify-center">
              <s.icon className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};

// ═════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════
const AboutUs = () => {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const textY = useTransform(heroScroll, [0, 1], ["0%", "60%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const visionRef = useRef(null);
  const { scrollYProgress: visionScroll } = useScroll({
    target: visionRef,
    offset: ["start end", "end start"]
  });
  const globeRotate = useTransform(visionScroll, [0, 1], [0, 360]);

  return (
    <div className="relative text-white overflow-hidden">

      {/* ─── Floating Background Particles ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingParticle delay={0} size={6} x="10%" y="20%" duration={7} />
        <FloatingParticle delay={1.5} size={4} x="80%" y="15%" duration={9} />
        <FloatingParticle delay={3} size={8} x="60%" y="70%" duration={6} />
        <FloatingParticle delay={0.5} size={5} x="25%" y="80%" duration={8} />
        <FloatingParticle delay={2} size={3} x="90%" y="50%" duration={10} />
        <FloatingParticle delay={4} size={7} x="40%" y="40%" duration={7.5} />
        <FloatingParticle delay={1} size={4} x="70%" y="90%" duration={8.5} />
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION                                           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-20" ref={heroRef}>
        
        {/* Animated SVG Waves in Background */}
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
                transition={{ duration: 2, delay: i * 0.08, ease: "easeInOut" }}
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
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-1/4 left-[8%] w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-500/10 blur-xl z-0"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[8%] w-20 h-20 rounded-full bg-gradient-to-br from-gray-200/60 to-gray-400/60 shadow-[0_0_40px_rgba(255,255,255,0.15)] z-0"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity } }}
          className="absolute bottom-1/3 right-[8%] w-36 h-36 border border-cyan-500/20 rounded-full z-0"
        />

        {/* Hero Content - with parallax and fade */}
        <motion.div style={{ y: textY, opacity: heroOpacity }} className="z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-block"
          >
            <span className="px-4 py-2 border border-cyan-400/30 rounded-full text-cyan-400 text-sm tracking-widest uppercase">
              About Capernaum
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8"
          >
            <motion.span className="block overflow-hidden">
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                BUILDING TOMORROW'S
              </motion.span>
            </motion.span>
            <motion.span className="block overflow-hidden">
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="block text-cyan-400 italic font-serif"
              >
                UNICORNS
              </motion.span>
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            At Capernaum, we don't just invest; we <span className="text-white font-semibold">partner</span>. 
            We provide the capital, strategic guidance, and network necessary to turn groundbreaking ideas into market-leading realities.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/20 rounded-full mx-auto flex justify-center pt-2"
            >
              <motion.div className="w-1 h-2 bg-cyan-400 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 1.5 OUR MISSION                                           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <OurMission />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 1.6 OUR VISION                                            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <OurVision />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 1.7 WHO WE ARE                                            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <WhoWeAre />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 2. CORE PILLARS                                           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <SectionHeading className="border-l-4 border-cyan-400 pl-4 mb-0">Our Methodology</SectionHeading>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-400 max-w-md mt-4 md:mt-0"
          >
            A proven framework that transforms early-stage ventures into industry leaders.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Strategy", icon: Globe, desc: "Global insights and market penetration strategies tailored to your unique market position." },
            { title: "Partnership", icon: Users, desc: "Long-term collaboration with dedicated mentorship from seasoned industry veterans." },
            { title: "Growth", icon: TrendingUp, desc: "Scalable frameworks for rapid, sustainable expansion across diverse markets." },
            { title: "Funding", icon: Coins, desc: "Strategic capital injection at critical growth stages to fuel your trajectory." }
          ].map((item, idx) => (
            <SpotlightCard key={idx} delay={idx * 0.12} className="rounded-2xl p-8 hover:border-cyan-400/30 transition-colors">
              <motion.div 
                className="mb-6 p-4 bg-cyan-900/10 rounded-xl w-fit group-hover:bg-cyan-400/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <item.icon className="w-8 h-8 text-cyan-400 stroke-[1.5]" />
              </motion.div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
              
              {/* Animated line at bottom */}
              <motion.div 
                className="h-[2px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 mt-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.8 }}
              />
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 3. VISION / FUTURE                                        */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <motion.section
        ref={visionRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 py-24 px-6 md:px-12 bg-white/5 border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-white"
          >
            <motion.h4 variants={staggerItem} className="text-cyan-400 font-bold uppercase tracking-widest mb-4">
              The Vision
            </motion.h4>
            <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Forging the Future <br /> of Innovation
            </motion.h2>
            <motion.div variants={staggerItem} className="space-y-6 text-gray-300 text-lg">
              <p>
                We envision a world where barriers to entry for transformative technologies are dismantled. 
                Our goal is to foster an ecosystem where visionary founders can thrive.
              </p>
              <p>
                Through our portfolio companies, we aim to impact over <span className="text-white font-bold">1 billion lives</span> 
                {' '}by 2030, driving advancements in AI, sustainable energy, and healthcare.
              </p>
            </motion.div>
            
            {/* Animated Stats */}
            <motion.div variants={staggerItem} className="mt-10 flex gap-8">
              {[
                { label: "Startups Funded", value: "200", suffix: "+" },
                { label: "Total Exits", value: "$4.5", suffix: "B" },
                { label: "Global Offices", value: "12", suffix: "" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Side - Animated Globe */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[500px] w-full flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-3xl" />
            
            <div className="relative w-full h-full border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm p-8">
              <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
                
                {/* Multiple animated circles */}
                {[20, 30, 40].map((r, i) => (
                  <motion.circle 
                    key={i}
                    cx="50" cy="50" r={r} 
                    stroke="currentColor" strokeWidth="0.3" fill="none" className="text-cyan-400"
                    style={{ rotate: globeRotate }}
                    animate={{ opacity: [0.1 + i * 0.1, 0.3 + i * 0.1, 0.1 + i * 0.1] }}
                    transition={{ duration: 3 + i, repeat: Infinity }}
                  />
                ))}
              </svg>
              
              {/* Pulsing nodes */}
              {[
                { x: "25%", y: "25%", size: "w-4 h-4", color: "bg-cyan-400", delay: 0 },
                { x: "75%", y: "30%", size: "w-3 h-3", color: "bg-white", delay: 1 },
                { x: "60%", y: "70%", size: "w-3 h-3", color: "bg-cyan-400", delay: 0.5 },
                { x: "30%", y: "65%", size: "w-2 h-2", color: "bg-white", delay: 1.5 },
                { x: "50%", y: "45%", size: "w-5 h-5", color: "bg-cyan-400", delay: 0.3 },
              ].map((node, i) => (
                <motion.div 
                  key={i}
                  className={`absolute ${node.size} ${node.color} rounded-full shadow-[0_0_15px_currentColor]`}
                  style={{ left: node.x, top: node.y }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 2 + i * 0.5, delay: node.delay, repeat: Infinity }}
                />
              ))}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <motion.line x1="25" y1="25" x2="50" y2="45" stroke="#22d3ee" strokeWidth="0.3"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }} />
                <motion.line x1="50" y1="45" x2="75" y2="30" stroke="#22d3ee" strokeWidth="0.3"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8 }} />
                <motion.line x1="50" y1="45" x2="60" y2="70" stroke="#fff" strokeWidth="0.2"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1.1 }} />
                <motion.line x1="30" y1="65" x2="50" y2="45" stroke="#fff" strokeWidth="0.2"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1.4 }} />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 4. TEAM SECTION                                           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={staggerItem}>
            <SectionHeading>The Minds Behind Capernaum</SectionHeading>
          </motion.div>
          <motion.p variants={staggerItem} className="text-gray-400 max-w-2xl mx-auto">
            A diverse team of former founders, industry veterans, and technical experts dedicated to your success.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { name: "Sarah Chen", role: "Managing Partner", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" },
            { name: "David Miller", role: "Head of Strategy", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" },
            { name: "Elena Rodriguez", role: "Tech Lead", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200" },
            { name: "James Wilson", role: "Investment Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" }
          ].map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="relative mb-6">
                {/* Glow ring on hover */}
                <motion.div 
                  className="absolute -inset-2 bg-cyan-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500" 
                />
                <motion.div 
                  className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-400 transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-cyan-400 text-sm tracking-wide uppercase mb-4">{member.role}</p>
              
              <motion.button 
                className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-cyan-400 transition-colors"
                whileHover={{ x: 3 }}
              >
                READ BIO <ArrowRight className="w-3 h-3" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 5. CTA SECTION                                            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 text-center relative z-10 overflow-hidden">
        {/* Animated background glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
            Ready to Scale Your Vision?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Join the next generation of industry leaders. Let's build something extraordinary together.
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
            <span className="text-lg font-bold tracking-wider">Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            
            {/* Pulsing glow */}
            <motion.div 
              className="absolute inset-0 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.4)]"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
