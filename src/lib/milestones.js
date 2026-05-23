// Milestone definitions and check logic

export const MILESTONES = [
  {
    id: 'first_steps',
    titleKey: 'badge_first_steps',
    descKey: 'badge_first_steps_desc',
    emoji: '👣',
    check: (p) => p.tutorial_complete,
  },
  {
    id: 'streak_3',
    titleKey: 'badge_streak_3',
    descKey: 'badge_streak_3_desc',
    emoji: '🔥',
    check: (p) => p.current_streak >= 3,
  },
  {
    id: 'streak_7',
    titleKey: 'badge_streak_7',
    descKey: 'badge_streak_7_desc',
    emoji: '🏆',
    check: (p) => p.current_streak >= 7,
  },
  {
    id: 'points_50',
    titleKey: 'badge_50_points',
    descKey: 'badge_50_points_desc',
    emoji: '⭐',
    check: (p) => p.wisdom_points >= 50,
  },
  {
    id: 'points_100',
    titleKey: 'badge_100_points',
    descKey: 'badge_100_points_desc',
    emoji: '🎓',
    check: (p) => p.wisdom_points >= 100,
  },
];

// Returns the first newly-earned milestone (not yet in earned_badges), or null
export function checkMilestones(progress) {
  const earned = progress.earned_badges || [];
  for (const m of MILESTONES) {
    if (!earned.includes(m.id) && m.check(progress)) {
      return m;
    }
  }
  return null;
}