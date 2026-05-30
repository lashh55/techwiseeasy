/**
 * Story Mode skip-fallback helpers.
 * Call these wherever story fields are referenced in narrative text.
 *
 * Principle: skipped fields make the story leaner, never broken.
 */

/**
 * Returns the display name for the player.
 * Falls back to "Friend" if name was skipped.
 */
export function storyName(character) {
  return character?.story_name?.trim() || character?.name?.trim() || 'Friend';
}

/**
 * Returns a profession phrase for use in narrative, or null if skipped.
 * When null, the calling code should route around profession mentions entirely.
 */
export function storyProfession(character) {
  const p = character?.story_profession || character?.profession;
  return p || null;
}

/**
 * Returns a family phrase for narrative use.
 * Defaults to "your family" when skipped — never specifies marital status.
 */
export function storyFamily(character) {
  const f = character?.story_family || character?.family;
  return f || 'your family';
}

/**
 * Returns a living-situation phrase.
 * Defaults to "your home" when skipped.
 */
export function storyLiving(character) {
  const l = character?.story_living || character?.living;
  return l || 'your home';
}

/**
 * Returns the pet value, or null if the player skipped or chose "Just me."
 * When null, all pet-related story moments should be omitted.
 */
export function storyPet(character) {
  const p = character?.story_pet || character?.pet;
  if (!p || p === 'Just me') return null;
  return p;
}

/**
 * Returns true if story character creation is complete.
 */
export function storyReady(character) {
  return !!(character?.story_character_created);
}