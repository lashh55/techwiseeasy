import React from 'react';
import { motion } from 'framer-motion';

export default function GameCard({ game, index, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${game.color} shadow-lg active:scale-[0.97] transition-transform min-h-[160px] flex flex-col items-center justify-end pb-3`}
    >
      <img
        src={game.image}
        alt={game.label}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <span className="relative z-10 text-white font-black text-sm text-center leading-tight px-2">
        {game.label}
      </span>
    </motion.button>
  );
}