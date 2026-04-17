# Location Panel Architecture Design

## Goal

Add a dedicated location slide-panel mode that emphasizes place, atmosphere, and available activity instead of format filtering.

## Decisions

- Keep a single slide-panel container but support three rendering modes:
  - direction panel
  - location panel
  - generic fallback
- Make location links inside direction panels open a dedicated location panel instead of a compact modal.
- Make infrastructure cards open location panels directly.
- Structure location panels around:
  - title and atmospheric intro
  - what is available in the space
  - related directions
  - nearby activities in the location
  - sticky location CTA
- Keep related directions as clickable chips that switch the panel back into the direction mode.

## Expected Outcome

- Users can understand a space as a place, not just as a container for services.
- Navigation between directions and locations stays inside the same panel system.
- The panel system becomes a reusable architecture for future content and flows.
