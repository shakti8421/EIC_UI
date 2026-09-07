/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#173A46',
    tint: '#8A1F62',

    // Core surfaces
    background: '#F5FCFD',
    foreground: '#173A46',

    // Cards / elevated surfaces
    card: '#FFFFFF',
    cardForeground: '#173A46',

    // Primary action color (buttons, links, active states)
    primary: '#8A1F62',
    primaryForeground: '#ffffff',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#D9F99D',
    secondaryForeground: '#37521B',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#E7F5F6',
    mutedForeground: '#63818A',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#DFF7FA',
    accentForeground: '#176170',

    // Destructive actions (delete, error states)
    destructive: '#C63F55',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#D6E9EB',
    input: '#D6E9EB',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 18,
};

export default colors;
