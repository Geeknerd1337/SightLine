import { Variants, motion } from 'framer-motion';

const LoadingDot = {
  display: 'block',
  width: '2rem',
  height: '2rem',
  backgroundColor: '#ffd167',
  borderRadius: '50%',
  //Shadow
  boxShadow: '0 0.5rem 0.5rem rgba(0, 0, 0, 0.2)',
};

const LoadingContainer = {
  width: '10rem',
  height: '5rem',
  display: 'flex',
  justifyContent: 'space-around',
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants: Variants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '100%',
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

export default function ThreeDotsWave() {
  return (
    <div
      style={{
        paddingTop: '5rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        initial='initial'
        animate='animate'
      >
        <motion.span style={LoadingDot} variants={DotVariants} />
        <motion.span style={LoadingDot} variants={DotVariants} />
        <motion.span style={LoadingDot} variants={DotVariants} />
      </motion.div>
    </div>
  );
}
