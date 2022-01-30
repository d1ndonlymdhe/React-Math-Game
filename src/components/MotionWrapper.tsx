import { motion } from "framer-motion";
import React, { ReactNode } from "react";

export function MotionWrapper(props: React.PropsWithChildren<ReactNode>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-[90%] w-96 m-5 bg-slate-300 flex flex-col items-center justify-center rounded-lg"
    >
      {props.children}
    </motion.div>
  );
}
