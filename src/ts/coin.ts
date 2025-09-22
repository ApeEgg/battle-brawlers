export const formatCoins = (amount: number) => {
  // const gold = Math.floor(amount / 10000);
  // const silver = Math.floor((amount % 10000) / 100);
  const gold = 0;
  const silver = Math.floor(amount / 100);
  const copper = amount % 100;

  return { gold, silver, copper };
};
