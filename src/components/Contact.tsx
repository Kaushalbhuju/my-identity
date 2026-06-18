import { motion, useInView, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle, Clock, MessageSquare, Phone } from 'lucide-react';
import { useMousePosition } from '../hooks/useMouse';
import TiltCard from './ui/TiltCard';
import MagneticButton from './ui/MagneticButton';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const mouse = useMousePosition();

  const orbX = useSpring(0, { damping: 50, stiffness: 60 });
  const orbY = useSpring(0, { damping: 50, stiffness: 60 });

  useEffect(() => {
    orbX.set(mouse.normalizedX * 30);
    orbY.set(mouse.normalizedY * 30);
  }, [mouse.normalizedX, mouse.normalizedY, orbX, orbY]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'alex@riveradev.io', href: 'mailto:alex@riveradev.io' },
    { icon: MapPin, label: 'Location', value: 'Portland, Oregon', href: '#' },
    { icon: Phone, label: 'Phone', value: '+1 (503) 555-0172', href: 'tel:+15035550172' },
    { icon: Clock, label: 'Availability', value: 'Mon – Fri, 9am – 6pm PST', href: '#' },
  ];

  const inputClasses = (field: string) =>
    `w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white/[0.03] border rounded-xl text-white text-sm sm:text-base placeholder-gray-600 focus:outline-none transition-all duration-300 ${
      focusedField === field
        ? 'border-neon-blue/50 ring-2 ring-neon-blue/10 shadow-lg shadow-neon-blue/5'
        : 'border-white/10 hover:border-white/20'
    }`;

  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <motion.div style={{ x: orbX, y: orbY }} className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-neon-blue/5 rounded-full blur-[150px]" />
      <motion.div style={{ x: orbX, y: orbY }} className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-neon-purple/5 rounded-full blur-[150px]" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-neon-pink bg-neon-pink/10 rounded-full border border-neon-pink/20 mb-4">
            <MessageSquare className="w-3 h-3 inline mr-1" />
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
            Let's Build Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            Have a project in mind? I'd love to hear about it. Let's collaborate and bring your vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Left - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4 sm:space-y-6"
          >
            <TiltCard className="rounded-2xl" tiltAmount={8} glareOpacity={0.05}>
              <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Contact Information</h3>
                <div className="space-y-4 sm:space-y-5">
                  {contactInfo.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="flex items-start gap-3 sm:gap-4 group"
                    >
                      <div className="p-2 sm:p-2.5 rounded-lg bg-neon-blue/10 text-neon-blue group-hover:bg-neon-blue/20 group-hover:shadow-md group-hover:shadow-neon-blue/10 transition-all shrink-0">
                        <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-gray-500 text-[10px] sm:text-xs font-medium mb-0.5">{item.label}</div>
                        <div className="text-gray-300 text-xs sm:text-sm font-medium group-hover:text-white transition-colors truncate">{item.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </TiltCard>

            {/* Quick note */}
            <TiltCard className="rounded-2xl" tiltAmount={6} glareOpacity={0.04}>
              <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-8">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Let's Connect</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  I'm always interested in hearing about new projects, creative ideas, 
                  or opportunities to be part of something special.
                </p>
                <div className="flex items-center gap-2 text-cyber-400 text-xs sm:text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-500" />
                  </span>
                  Currently accepting new projects
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <TiltCard className="rounded-2xl" tiltAmount={5} glareOpacity={0.03}>
              <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 sm:py-16 text-center"
                  >
                    <div className="p-3 sm:p-4 rounded-full bg-cyber-500/10 text-cyber-400 mb-4 sm:mb-6">
                      <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 text-sm sm:text-base">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className={inputClasses('name')}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={inputClasses('email')}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('subject')}
                        placeholder="Project Inquiry"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputClasses('message')} resize-none`}
                        placeholder="Tell me about your project, timeline, and budget..."
                      />
                    </div>

                    <MagneticButton
                      as="button"
                      type="submit"
                      strength={0.15}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-neon-blue to-cyber-500 hover:from-cyber-500 hover:to-neon-purple rounded-xl text-white font-bold text-sm sm:text-base transition-all duration-500 hover:shadow-xl hover:shadow-neon-blue/20 active:scale-[0.98]"
                    >
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Send Message
                    </MagneticButton>
                  </form>
                )}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
