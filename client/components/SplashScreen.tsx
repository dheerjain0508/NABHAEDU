import { motion } from "framer-motion";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="flex flex-col items-center">
        <div className="relative">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-rose-500" />
          <motion.span className="absolute inset-0 grid place-items-center font-black text-3xl text-white" initial={{ rotate: -8 }} animate={{ rotate: 0 }}>N</motion.span>
        </div>
        <motion.p className="mt-6 font-extrabold tracking-tight text-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>NABHA EDU</motion.p>
      </motion.div>
    </div>
  );
}
