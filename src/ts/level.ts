import app from '$src/app.svelte';

const SCALING = 1.5;

export const getLevelByExperience = (experience: number) => {
  return Math.floor(Math.pow(experience / 100, 1 / SCALING)) + 1;
};

export const getExperienceByLevel = (level: number) => {
  return Math.pow(level - 1, SCALING) * 100;
};

export const getExperienceForNextLevel = (currentLevel: number) => {
  const xpCurrentLevel = getExperienceByLevel(currentLevel);
  const xpNextLevel = getExperienceByLevel(currentLevel + 1);
  return Math.floor(xpNextLevel - xpCurrentLevel);
};

export const getCurrentExperienceAtLevel = (experience: number) => {
  const currentLevel = getLevelByExperience(experience);
  const xpForCurrentLevel = getExperienceByLevel(currentLevel);
  return Math.floor(experience - xpForCurrentLevel);
};

export const allowedNumberOfCharacters = () => {
  return Math.floor(app.accountRewards / 5) + 1;
};

export const getExperienceRangeForLevel = (level: number) => {
  const minXp = getExperienceByLevel(level);
  const maxXp = getExperienceByLevel(level + 1) - 1;
  return { minXp: Math.floor(minXp), maxXp: Math.floor(maxXp) };
};
