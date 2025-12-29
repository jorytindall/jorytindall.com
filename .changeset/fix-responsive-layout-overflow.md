---
'web': patch
---

Fix responsive layout overflow in ModuleRenderer components

- Prevent horizontal overflow by adding overflow protection to GridWrapper
- Rewrite FullWidthImage component with proper grid positioning and responsive height
- Fix CodeBlock to allow horizontal scrolling for long code lines
- Improve RichTextWrapper mobile behavior with full-width grid spanning
- Add proper grid positioning to PersonalStats for ModuleRenderer integration
- Replace 100vw values with 100% to prevent scrollbar-related overflow
- Standardize responsive breakpoints to 768px across all module components
- Add max-width constraints to Container and module wrapper components
