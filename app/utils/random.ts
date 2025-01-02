export const randomPosition = () => Math.floor(Math.random() * 20);

export const randomColor = () => {
  const colors = [
    "#ff69b4",
    "#34a85a",
    "#f1c40f",
    "#8e44ad",
    "#4caf50",
    "#03A9F4",
    "#FFC107",
    "#2196F3",
    "#FF9800",
    "#8BC34A",
  ];
  return `#${colors[Math.floor(Math.random() * colors.length)].slice(1)}`;
};
