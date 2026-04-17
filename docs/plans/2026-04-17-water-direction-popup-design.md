# Water Direction Popup Design

## Goal

Tune the popup flow for `Направление 1. Водная зона` so the `Свободное плавание` format leads users directly into a useful next step instead of placeholder content.

## Decisions

- Keep the current scenario panel structure for `Водная зона`.
- Leave the `Где проходит -> Бассейн` block unchanged for `Свободное плавание`.
- Keep the `Ближайшие занятия` block in the popup as the place for today's items, with later wiring planned for real current-day data.
- Remove the placeholder generic blocks `Следующий шаг` and `Что заложено сейчас` from the popup markup.
- Make `Смотреть полное расписание` close the popup, scroll to the weekly schedule block, and apply a `Свободное плавание` filter.
- Make `Записаться / Получить консультацию` close the popup and scroll to `Контакты и запись`.
- Add empty states for filtered schedule views so the interface stays clear when a day tab has no matching items.

## Expected Outcome

- The popup for `Водная зона -> Свободное плавание` becomes a real navigation step.
- Users can move from the popup to the weekly schedule already filtered by the chosen format.
- The booking CTA lands in the final contact block without requiring extra navigation.
