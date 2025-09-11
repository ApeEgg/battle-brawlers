export default {
  isBleeding: {
    singleWord: 'bleed',
    icon: 'isBleeding',
    text: 'BLEEDING',
    animation: 'animate-bounce'
  },
  isStunned: {
    singleWord: 'stun',
    icon: 'isStunned',
    text: 'STUNNED',
    animation: 'animate-spin'
  },
  isVulnerable: {
    singleWord: 'vulnerable',
    icon: 'isVulnerable',
    text: 'VULNERABLE',
    animation: 'animate-pulse'
  },
  isWounded: {
    singleWord: 'wound',
    icon: 'isWounded',
    text: 'WOUNDED',
    convertsInto: 'isBleeding',
    animation: 'animate-pulse'
  },
  isConcussed: {
    singleWord: 'concussion',
    icon: 'isConcussed',
    text: 'CONCUSSED',
    convertsInto: 'isStunned',
    animation: 'animate-pulse'
  },
  isExposed: {
    singleWord: 'exposed',
    icon: 'isExposed',
    text: 'EXPOSED',
    convertsInto: 'isVulnerable',
    animation: 'animate-pulse'
  }
} as Record<string, any>;
