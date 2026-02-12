import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Globe, Zap, Shield, BarChart3, ArrowRight } from 'lucide-react';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth;
    const y = clientY / innerHeight;
    mouseX.set(x);
    mouseY.set(y);
  };

  const xSpring = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const ySpring = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const orbX = useTransform(xSpring, [0, 1], [20, -20]);
  const orbY = useTransform(ySpring, [0, 1], [20, -20]);
  const cubeX = useTransform(xSpring, [0, 1], [-30, 30]);
  const cubeY = useTransform(ySpring, [0, 1], [-30, 30]);

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background SVG Waves - Lines */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-x-0 bottom-0 top-20 z-0 opacity-40 pointer-events-none overflow-hidden"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Generating parallel wave lines */}
          {Array.from({ length: 20 }).map((_, i) => {
            const yOffset = i * 25;
            const opacity = 0.1 + (i / 40); // Fade in effect
            return (
              <motion.path
                key={i}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity }}
                transition={{ duration: 2, delay: i * 0.05, ease: "easeInOut" }}
                d={`M-100,${400 + yOffset} C150,${350 + yOffset} 400,${500 + yOffset} 720,${450 + yOffset} C1040,${400 + yOffset} 1290,${250 + yOffset} 1540,${300 + yOffset}`}
                stroke="#64748b" // slate-500
                strokeWidth="1.5"
                fill="none"
              />
            );
          })}
           {/* Second set of intersecting waves for depth */}
           {Array.from({ length: 15 }).map((_, i) => {
             const yOffset = i * 30;
             const opacity = 0.05 + (i / 50);
             return (
               <motion.path
                 key={`cross-${i}`}
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: opacity }}
                 transition={{ duration: 2.5, delay: 0.5 + i * 0.05, ease: "easeInOut" }}
                 d={`M-100,${550 - yOffset} C200,${500 - yOffset} 500,${600 - yOffset} 800,${500 - yOffset} C1100,${400 - yOffset} 1300,${350 - yOffset} 1600,${450 - yOffset}`}
                 stroke="#22d3ee" // cyan-400
                 strokeWidth="1"
                 fill="none"
                 className="opacity-20"
               />
             );
           })}
        </svg>
      </motion.div>

      {/* 3D Geometric Elements */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-xl opacity-80 z-10"
      />
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-500 opacity-80 shadow-[0_0_30px_rgba(255,255,255,0.3)] z-10"
      />
       <motion.div
        style={{ x: cubeX, y: cubeY }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-10 w-32 h-32 border-8 border-cyan-500/30 rounded-full opacity-40 z-0 blur-lg"
      />
       <motion.div
        style={{ x: cubeX, y: cubeY }}
        animate={{ rotate: -45 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 w-32 h-32 border-8 border-gray-300 rounded-full opacity-60 z-10 [transform:rotateX(60deg)]"
      />

      <motion.div 
        style={{ y: textY }}
        className="z-20 text-center max-w-4xl px-4"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-6 flex flex-col items-center"
        >
          <motion.span className="block overflow-hidden">
            <motion.span 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              YOUR BEST
            </motion.span>
          </motion.span>
          <motion.span className="block overflow-hidden">
             <motion.span 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-cyan-400 italic font-serif"
              >
              IT PARTNERS
            </motion.span>
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
        >
          Customized BPO & IT Solutions Designed to Drive Your Growth
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 rounded-full hover:border-cyan-400 transition-all hover:bg-white/5"
        >
          <span className="uppercase text-sm font-semibold tracking-wider">Explore Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
};

const FeatureItem = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col items-start space-y-4 rounded-2xl border border-white/10 bg-white/5 p-8 overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
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
      
      <div className="relative z-10 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-400/50 transition-colors duration-300">
        <Icon className="w-8 h-8 text-cyan-400 stroke-[1.5]" />
      </div>
      <h3 className="relative z-10 text-xl font-bold capitalize">{title}</h3>
      <p className="relative z-10 text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Globe,
      title: "expertise",
      description: "Our team of experienced experts have the knowledge and expertise to deliver innovative IT solutions that meet your unique needs."
    },
    {
        icon: Zap,
        title: "technology",
        description: "We stay up to date with the latest trends and technologies in the IT industry, so you can get the most advanced solutions available."
    },
    {
        icon: Shield,
        title: "solutions",
        description: "We take a personalized approach to every project, working closely with you to understand your business and create solutions."
    },
    {
        icon: BarChart3,
        title: "results",
        description: "Our track record speaks for itself – we've helped businesses of all sizes and industries achieve their goals with our IT solutions."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          Why <br />
          Choose Us?
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((feature, index) => (
          <FeatureItem 
            key={index} 
            {...feature} 
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
    </div>
  );
};

export default Home;
