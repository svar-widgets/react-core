## 2.5.0

### New features

- Avatar Component
- Ability to virtualize dropdown lists in Combo, MultiCombo, Richselect

### Fixes

- Dropdowns of select controls are cut off or change container size when there is not enough space
- Combo dropdown hides when there is no data
- Button selectors are incompaticle with NextJs
- RangeCalendar: impossible to change month in single-month calendars
- Colorboard: excess re-rendering on value input
- MultiCombo: checkboxes are not clickable
- Timepicker: too big dropdown width

## 2.4.3

### Fixes

- Correct label-input association in forms
- Sourcemap included

## 2.4.1

### Fixes

- Correct path to icons and fonts

## 2.4.0

### New features

- Fullscreen component

### Updates

- Enhanced syntax of Field component that ensures proper label-input association
- More options to precisely position and align Popup, ContextMenu, DropDownMenu, ActionMenu

### Fixes

- Incorrect position of Popup and Menus in relatively positioned container
- Incorrect position of Popup and Menus close to container edges
- Checkbox is replaced by `plus` icon during editing in Tasklist
- The `onChange` event is issued after edit field was closed without actual changes

### Breaking changes

- Popup `mount` property was removed

## 2.3.0

### New features

- TypeScript definitions

### Fixes

- Slider always has stable `previous` parameter and numeric `value` in the `onChange` event
- DateRangepicker allows to select start date only
- Segmented and Tabs set native tooltip only with option `title`

## 2.2.0

### Initial features

Provides all the same functionality as Svelte Core 2.2.0
