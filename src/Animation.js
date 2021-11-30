import useAnimation from './custom-css-animations';

const useLinearSpinAnimation = ({className, duration}) => {
  const animationRules = `
    @media (prefers-reduced-motion: no-preference) {
      .${className} {
        animation: ${className}-spin infinite ${duration}s linear;
      }
    }

    @keyframes ${className}-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  useAnimation(animationRules);
};

export { useLinearSpinAnimation };