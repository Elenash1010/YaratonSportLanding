# Slide Panel Architecture Design

## Goal

Replace separate direction pages with a right-side slide panel that keeps the user on the main page and becomes the base for future step-by-step flows.

## Decisions

- Remove the standalone direction pages from the project.
- Remove per-card CTA buttons and make the entire direction card clickable.
- Open a right-side slide panel from any direction card interaction.
- Set the slide panel width to a little more than half of the viewport on desktop.
- Keep the first implementation focused on structure only: title, lead, and placeholder sections for locations, schedule, formats, and booking.
- Prepare the JavaScript so each direction already has its own panel context and can later receive internal navigation states.

## Expected Outcome

- Users no longer leave the main page to explore directions.
- The UI is ready for future step-by-step flows inside the slide panel.
- The current codebase is simplified by removing the extra direction pages.
