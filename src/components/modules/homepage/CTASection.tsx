"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Pill, Activity, HeartPulse } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function CTASection() {
  return (
    <section className="py-12 md:py-16 mb-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-primary rounded-2xl overflow-hidden relative shadow-xl"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Animated decorative background elements */}
          <motion.div 
            className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-white/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 relative z-10 gap-8">
            <div className="w-full md:w-3/5 text-primary-foreground space-y-4">
              <motion.div 
                className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Special Welcome Offer</span>
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Empowering your health,<br />delivered fast.
              </motion.h2>
              
              <motion.p 
                className="text-primary-foreground/90 text-base md:text-lg max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Join Medica today and enjoy seamless prescription uploads, expert consultations, and express delivery. Sign up now and get <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded">15% off</span> your first order!
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="gap-2 font-semibold text-base h-12 px-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                    Sign Up Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-full md:w-2/5 flex justify-center mt-10 md:mt-0 relative h-56"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, type: "spring", bounce: 0.4 }}
            >
              {/* Floating Medical Icons */}
              <motion.div 
                className="absolute bg-white/20 backdrop-blur-md p-3.5 rounded-2xl shadow-xl top-0 right-10"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <HeartPulse className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div 
                className="absolute bg-white/20 backdrop-blur-md p-3.5 rounded-2xl shadow-xl bottom-8 left-10"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Pill className="w-10 h-10 text-white" />
              </motion.div>

              <motion.div 
                className="absolute bg-white/20 backdrop-blur-md p-2.5 rounded-2xl shadow-xl top-1/2 left-0 transform -translate-y-1/2"
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Activity className="w-6 h-6 text-white" />
              </motion.div>

              {/* Central Glowing Element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
                   <motion.div 
                      className="absolute inset-0 bg-white/20 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   />
                   <h1 className="text-5xl font-bold text-white tracking-wider italic z-10">M.</h1>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
