# Change Log

The following is a curated list of changes in the Enact agate module, newest changes on the top.

## [unreleased]

### Added

- `Noto Sans` font as the default font

### Fixed

- `agate/ArcSlider` text size be the same on all skins
- `agate/ArcSlider` style to match latest design for Silicon skin
- `agate/Button` badge background color for Cobalt and Copper skins
- `agate/ContextualPopupDecorator` style to match latest design for Silicon skin
- `agate/Popup` to have the same background-color for body and buttons section for all skins except Silicon
- `agate/Popup` to match latest design for Silicon skin
- `agate/PopupMenu` title to marquee for long text
- `agate/RadioItem` icon border-color to be visible when item is focused in Carbon skin
- `agate/Scroller` to be more visible on Carbon, Cobalt, Copper, Electro, Titanium skins
- `agate/Slider` to have a more visible background-color on Cobalt skin
- `agate/SliderButton` button text color to be more visible on Carbon skin

## [2.0.0-alpha.3] - 2021-04-26

### Added

- `agate/ImageItem` prop `sizing` to support image sizing
- `agate/Drawer` `onShow`, `spotlightId`, and `spotlightRestrict` props to handle focus with 5-way navigation

### Changed

- `Copper` skin to use lighter color for text in order to be more visible

### Fixed

- `agate/Checkbox`, `agate/FanSpeedControl`, `agate/ImageItem`, `agate/Item`, and `agate/WindDirectionControl` to match latest design for Silicon skin
- `agate/Dropdown` misalignment of `Button` and `ContextualPopup` on the edge of screen

## [2.0.0-alpha.2] - 2021-04-02

### Added

- `agate/ContextualPopup` and `agate/ContextualPopupDecorator` prop `css` to support customizations
- `agate/Dropdown` prop `width` to support multiple widths
- `agate/IncrementSlider` prop `activateOnFocus` to support slider activation when slider gets focused
- `agate/IncrementSlider`, `agate/ProgressBar`, and `agate/Slider` prop `tooltip` to enable the built-in tooltip
- `agate/Item` to have a `selected` publicClassname
- `agate/MediaPlayer` prop `spotlightDisabled` to disable 5-way navigation
- `agate/Popup` `aria-live` and `role` props to support accessibility
- `agate/Popup` `onShow`, `spotlightId`, and `spotlightRestrict` props to handle focus with 5-way navigation
- `agate/PopupMenu` `onShow` and `spotlightId` props to handle focus with 5-way navigation
- `agate/RadioItem` prop `slotBefore`
- `agate/ProgressBar` props `highlighted` and `backgroundProgress`
- `agate/ProgressBarTooltip` component
- `agate/Slider` prop `backgroundProgress`
- `agate/SliderTooltip` component
- `agate/Spinner` prop `children` to support the display of text below the icon
- `agate/Tooltip` prop `marquee` to allow to marquee
- `agate/TooltipDecorator` prop `tooltipMarquee` to support marquee for long tooltip and prop `tooltipWidth` to set a width for tooltip text

### Changed

- `agate/Dropdown` to use `agate/ContextualPopup`
- `agate/ThemeDecorator` to exclude `enact-fit` className when `disableFullscreen` is true
- `agate/ArcPicker` and `agate/ArcSlider` to have a max-width for `slotCenter`

### Fixed

- `agate/ArcSlider` and `agate/TemperatureControl` broken layout when `min` prop is not smaller than `max` prop
- `agate/BodyText`, `agate/Button`, `agate/IncrementSlider`, `agate/LabeledIcon`, and `agate/Slider` to match latest design for Silicon skin
- `agate/Button` to apply active styling only when it is not disabled
- `agate/Button` to apply active styling on enter key press
- `agate/ImageItem` width/height proportion when `orientation` is `horizontal`
- `agate/LabeledIconButton` styling to preserve behavior and look when props are missing
- `agate/SliderButton` 5-way navigation functionality to change value via direction keys
- `agate/SliderButton` styling to visually show the focused state
- `agate/TooltipDecorator` to position correctly on rtl locale

## [2.0.0-alpha.1] - 2021-02-25

-  The framework was updated to support React 17.0.1

### Added

- `agate/ThemeDecorator` config `rootId` to specify React DOM tree root for global event handlers

## [1.1.2] - 2021-02-05

### Deprecated

- `agate/FullScreenPopup`, use `agate/Popup` instead

### Added

- `agate/ArcPicker` and `agate/ArcSlider` prop `disabled` to be inactive
- `agate/ArcSlider` prop `aria-valuetext` to override `aria-valuetext` for it
- `agate/DateTimePicker` prop `dayAriaLabel`, `hourAriaLabel`, `meridiemAriaLabel`, `minuteAriaLabel`, `monthAriaLabel`, and `yearAriaLabel`
- `agate/Heading` prop `marqueOn` to determine when marquee begins
- `agate/Input` prop `invalid` to display a tooltip with a message when `invalid` prop is true
- `agate/Input` prop `invalidMessage` to customize the tooltip message when `invalid` prop is true
- `agate/Input` prop `size` to change the size of both input and icons (default large)
- `agate/Item` prop `centered`, `disabled`, `inline`, `marqueeOn`, and `size`
- `agate/Keypad` prop `spotlightDisabled` to disable 5-way navigation
- `agate/Popup` content padding and margin with `closeButton`
- `agate/Popup` `bottom`, `fullscreen`, `left`, and `right` values to `position` prop
- `agate/Popup` `duration` and `type` props

### Changed

- `agate/Heading` to support marquee

### Fixed

- `agate/Button` to not center the icon when it has `minWidth`
- `agate/DatePicker` transition direction for day when month is changed
- `agate/Dropdown` to show focused icon color for Silicon skin
- `agate/Dropdown` to not show double marquee text
- `agate/Dropdown` to not close when clicking the list scroller
- `agate/LabeledIconButton` to display label text on multiple lines (removed marquee)
- `agate/LabeledIconButton` `max-width` to display huge sized icon correctly
- `agate/MediaPlayer` previous button functionality to play media from the beginning after being paused
- `agate/TabGroup` tab `border-bottom` to be applied for vertical orientation
- `agate/TimePicker` transition direction for meridiem when hour is changed

## [1.1.1] - 2020-12-23

### Fixed

- Sampler build failure

## [1.1.0] - 2020-12-22

### Added

- `agate/Button` prop `iconOnly`, `iconPosition`, and `minWidth`
- `agate/Checkbox` prop `disabled`, `indeterminate`, and `indeterminateIcon`
- `agate/CheckboxItem` prop `disabled`, `indeterminate`, `indeterminateIcon`, and `slotbefore`
- `agate/DatePicker` prop `onSpotlightDisappear` and `spotlightDisabled`
- `agate/Marquee` component
- `agate/Picker` prop `noAnimation` and `wrap`
- `agate/RangePicker` prop `noAnimation` and `wrap`
- `agate/ThemeDecorator` context `ThemeContext` to apply `accent` color to `agate/ArcPicker` and `agate/ArcSlider` when they're focused
- `agate/TimePicker` prop `onSpotlightDisappear` and `spotlightDisabled`

### Changed

- `agate/ArcPicker`, `agate/ArcSlider`, `agate/FanSpeedControl`, `agate/TemperatureControl`, and `agate/WindDirectionControl` to read out audio guidance when focused via 5-way keys
- `agate/FullscreenPopup` prop `duration` to support any valid CSS value

### Fixed

- `agate/ArcPicker` to display correct `font-size` and `font-weight`
- `agate/Button` to marquee when focused
- `agate/Button` to show a tooltip when hovered
- `agate/DateTimePicker` returned value by onChange event
- `agate/Dropdown` to support closing dropdown with back key
- `agate/FanSpeedControl` to center text when there is no icon
- `agate/Heading` to support `spacing` for Gallium and Silicon
- `agate/IncrementSlider` button color for Gallium skin
- `agate/Input` run time error when using `dismissOnEnter`
- `agate/Keypad` to not show console error in sampler
- `agate/Keypad`, `agate/MediaPlayer`, and `agate/ToggleButton` to have buttons with proper width
- `agate/LabeledIconButton` button shape to circular
- `agate/MediaPlayer` to not show console error when next or previous button is pressed several times during playing
- `agate/Panels` to show close button properly for night mode
- `agate/Picker` picker item width in horizontal for silicon
- `agate/PopupMenu` to display distinguishable title
- `agate/SliderButton` to not show console error in sampler
- `agate/Spinner` to pause the animation when `paused` prop is true
- `agate/Spinner` to show correct layout when `type` is `loading` in `right-to-left` locale
- `agate/Spinner` to support `transparent` prop properly
- `agate/SwitchItem` icon position for all skins in RTL locale and Electro/Titanium in all locales
- `agate/TemperatureControl` to not be draggable when it's disabled

## [1.0.0] - 2020-10-14

Initial release.
