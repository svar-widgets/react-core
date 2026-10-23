import type { ReactNode, FC } from 'react';
import type { TPosition } from '@svar-ui/lib-dom';

export type { ILocale, Terms, TPosition } from '@svar-ui/lib-dom';

export type TID = string | number;

// an item of the options list of select-like controls
export interface IOption {
  id: TID;
  label?: string;
}

export interface ITabOption extends IOption {
  title?: string;
  tooltip?: string;
  icon?: string;
}

export interface DropdownOptions {
  inline?: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  autoFit?: boolean;
  css?: string;
  width?: string | 'unset' | 'auto';
  trackScroll?: boolean;
  virtualized?: boolean;
}

export type TButtonType =
  | ''
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'link'
  | 'primary block'
  | 'secondary block'
  | 'danger block'
  | 'link block';

export type TCalendarButton = 'clear' | 'today' | 'done';

export type TDateFormat = string | ((value: Date) => string);

export interface IDateRange {
  start: Date;
  end?: Date | null;
}

export interface IUser {
  id: string | number;
  name?: string;
  avatar?: string;
  color?: string;
}

export type TPositionNoFit = Exclude<
  TPosition,
  'bottom-fit' | 'top-fit' | 'center-fit'
>;

export type TooltipResolver = (
  element: HTMLElement,
  event: MouseEvent,
) => Record<string, any> | string | null;

export type TTooltipContent = FC<Record<string, any>>;

// a message shown by showNotice() of the "wx-helpers" context
export interface INotice {
  id?: TID;
  text?: string;
  type?: string;
  expire?: number;
  remove?: () => void;
}

// a dialog shown by showModal() of the "wx-helpers" context
export interface IModalMessage {
  title?: string;
  message?: string;
  buttons?: boolean | string[];
}

export interface IModalEvent {
  button?: string;
  event: MouseEvent;
}

export interface IHelpers {
  showNotice: (msg: INotice) => void;
  showModal: (msg: IModalMessage) => Promise<unknown>;
}

export type TPortalMount = (handler: () => void) => void;

export declare const TextArea: FC<{
  value?: string;
  id?: TID;
  placeholder?: string;
  title?: string;
  tooltip?: string;
  disabled?: boolean;
  error?: boolean;
  readonly?: boolean;
  css?: string;
  onChange?: (ev: { value: string; input?: boolean }) => void;
}>;

export declare const Button: FC<{
  type?: TButtonType;
  css?: string;
  icon?: string;
  disabled?: boolean;
  title?: string;
  tooltip?: string;
  text?: string;
  children?: ReactNode;
  onClick?: (ev: MouseEvent) => void;
}>;

export declare const Checkbox: FC<{
  id?: TID;
  label?: string;
  inputValue?: string | number;
  value?: boolean;
  disabled?: boolean;
  css?: string;
  onChange?: (ev: { value: boolean; inputValue: string | number }) => void;
}>;

export declare const CheckboxGroup: FC<{
  options?: IOption[];
  value?: TID[];
  type?: 'inline' | 'grid';
  css?: string;
  onChange?: (ev: { value: TID[] }) => void;
}>;

export declare const ColorSelect: FC<{
  colors?: string[];
  value?: string;
  id?: TID;
  clear?: boolean;
  placeholder?: string;
  title?: string;
  tooltip?: string;
  disabled?: boolean;
  error?: boolean;
  css?: string;
  dropdown?: DropdownOptions;
  onChange?: (ev: { value: string }) => void;
}>;

export declare const ColorBoard: FC<{
  value?: string;
  button?: boolean;
  css?: string;
  onChange?: (ev: { value: string; input?: boolean }) => void;
}>;

export declare const ColorPicker: FC<{
  value?: string;
  id?: TID;
  placeholder?: string;
  title?: string;
  tooltip?: string;
  disabled?: boolean;
  error?: boolean;
  clear?: boolean;
  css?: string;
  dropdown?: DropdownOptions;
  onChange?: (ev: { value: string }) => void;
}>;

export declare const Combo: FC<{
  value?: TID;
  id?: TID;
  options?: IOption[];
  textOptions?: IOption[] | null;
  textField?: string;
  placeholder?: string;
  title?: string;
  tooltip?: string;
  disabled?: boolean;
  error?: boolean;
  clear?: boolean;
  css?: string;
  dropdown?: DropdownOptions;
  children?: ReactNode;
  onChange?: (ev: { value: TID }) => void;
}>;

export declare const DatePicker: FC<{
  value?: Date;
  id?: TID;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  format?: TDateFormat;
  buttons?: boolean | TCalendarButton[];
  css?: string;
  title?: string;
  tooltip?: string;
  editable?: boolean | ((value: string) => Date | null);
  clear?: boolean;
  dropdown?: DropdownOptions;
  onChange?: (ev: { value: Date | null }) => void;
}>;

export declare const DateRangePicker: FC<{
  value?: IDateRange | null;
  id?: TID;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  css?: string;
  title?: string;
  tooltip?: string;
  format?: TDateFormat;
  months?: 1 | 2;
  buttons?: boolean | TCalendarButton[];
  editable?: boolean | ((value: string) => Date | null);
  clear?: boolean;
  dropdown?: DropdownOptions;
  onChange?: (ev: { value: IDateRange | null }) => void;
}>;

export declare const Icon: FC<{
  css?: string;
  title?: string;
  tooltip?: string;
  children?: ReactNode;
  onClick?: (ev: MouseEvent) => void;
}>;

export declare const MultiCombo: FC<{
  id?: TID;
  value?: TID[];
  options?: IOption[];
  textOptions?: IOption[] | null;
  textField?: string;
  keepText?: boolean;
  placeholder?: string;
  title?: string;
  tooltip?: string;
  disabled?: boolean;
  error?: boolean;
  checkboxes?: boolean;
  css?: string;
  dropdown?: DropdownOptions;
  children?: ReactNode;
  onChange?: (ev: { value: TID[] }) => void;
}>;

export declare const Popup: FC<{
  left?: number;
  top?: number;
  at?: string;
  parent?: HTMLElement;
  width?: string;
  css?: string;
  trackScroll?: boolean;
  mount?: any;
  children?: ReactNode;
  onCancel?: (ev: MouseEvent) => void;
}>;

export declare const Dropdown: FC<
  DropdownOptions & {
    children?: ReactNode;
    onCancel?: (ev: MouseEvent) => void;
  }
>;

export declare const Pager: FC<{
  total?: number;
  pageSize?: number;
  value?: number;
  css?: string;
  onChange?: (ev: { value: number; from: number; to: number }) => void;
}>;

export declare const RadioButton: FC<{
  id?: TID;
  label?: string;
  value?: boolean;
  name?: string;
  inputValue?: string | number;
  disabled?: boolean;
  css?: string;
  onChange?: (ev: { value: boolean; inputValue: string | number }) => void;
}>;

export declare const RadioButtonGroup: FC<{
  options?: IOption[];
  value?: TID;
  type?: 'inline' | 'grid';
  css?: string;
  onChange?: (ev: { value: TID }) => void;
}>;

export declare const RichSelect: FC<{
  value?: TID;
  options?: IOption[];
  textOptions?: IOption[] | null;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  title?: string;
  tooltip?: string;
  textField?: string;
  clear?: boolean;
  css?: string;
  dropdown?: DropdownOptions;
  children?: ReactNode;
  onChange?: (ev: { value: TID }) => void;
}>;

export declare const Segmented: FC<{
  options?: ITabOption[];
  value?: TID;
  css?: string;
  children?: ReactNode;
  onChange?: (ev: { value: TID }) => void;
}>;

export declare const Select: FC<{
  value?: TID;
  options?: IOption[];
  placeholder?: string;
  title?: string;
  tooltip?: string;
  disabled?: boolean;
  error?: boolean;
  textField?: string;
  clear?: boolean;
  id?: TID;
  css?: string;
  onChange?: (ev: { value: TID }) => void;
}>;

export declare const Slider: FC<{
  id?: TID;
  label?: string;
  width?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  title?: string;
  tooltip?: string;
  disabled?: boolean;
  css?: string;
  onChange?: (ev: { value: number; previous: number; input?: boolean }) => void;
}>;

export declare const Switch: FC<{
  id?: TID;
  value?: boolean;
  disabled?: boolean;
  css?: string;
  onChange?: (ev: { value: boolean }) => void;
}>;

export declare const Tabs: FC<{
  options?: ITabOption[];
  value?: TID;
  type?: 'top' | 'bottom';
  css?: string;
  onChange?: (ev: { value: TID }) => void;
}>;

export declare const Text: FC<{
  value?: string | number;
  id?: TID;
  readonly?: boolean;
  focus?: boolean;
  select?: boolean;
  type?: 'text' | 'number' | 'password';
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  title?: string;
  tooltip?: string;
  css?: string;
  icon?: string;
  clear?: boolean;
  onChange?: (ev: { value: string | number; input?: boolean }) => void;
}>;

export declare const Counter: FC<{
  id?: TID;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  error?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  css?: string;
  tooltip?: string;
  onChange?: (ev: { value: number; input?: boolean }) => void;
}>;

export declare const Field: FC<{
  label?: string;
  position?: 'left';
  width?: string;
  error?: boolean;
  type?: 'checkbox' | 'slider' | 'switch';
  required?: boolean;
  id?: TID;
  css?: string;
  children?: ReactNode;
}>;

export declare const Calendar: FC<{
  value?: Date;
  current?: Date;
  markers?: (date: Date) => string;
  buttons?: boolean | TCalendarButton[];
  css?: string;
  onChange?: (ev: { value: Date | null }) => void;
}>;

export declare const Month: FC<{
  value?: { start: Date; end: Date } | Date;
  current?: Date;
  part?: string;
  markers?: (date: Date) => string;
  onCancel?: () => void;
  onChange?: (ev: Date) => void;
}>;

export declare const RangeCalendar: FC<{
  start?: Date;
  end?: Date;
  current?: Date;
  months?: 1 | 2;
  markers?: (date: Date) => string;
  buttons?: boolean | TCalendarButton[];
  css?: string;
  onChange?: (ev: { start: Date | null; end: Date | null }) => void;
}>;

export declare const TimePicker: FC<{
  value?: Date;
  id?: TID;
  title?: string;
  tooltip?: string;
  css?: string;
  disabled?: boolean;
  error?: boolean;
  format?: TDateFormat;
  onChange?: (ev: { value: Date }) => void;
}>;

export declare const TwoState: FC<{
  value?: boolean;
  type?: TButtonType;
  icon?: string;
  disabled?: boolean;
  iconActive?: string;
  title?: string;
  tooltip?: string;
  css?: string;
  text?: string;
  textActive?: string;
  active?: ReactNode;
  children?: ReactNode;
  onClick?: (ev: MouseEvent) => void;
  onChange?: (ev: { value: boolean }) => void;
}>;

export declare const Modal: FC<{
  title?: string;
  buttons?: boolean | string[];
  header?: ReactNode;
  footer?: ReactNode;
  css?: string;
  children?: ReactNode;
  onConfirm?: (ev: IModalEvent) => void;
  onCancel?: (ev: IModalEvent) => void;
}>;

export declare const ModalArea: FC<{
  children?: ReactNode;
}>;

export declare const SideArea: FC<{
  position?: 'right';
  css?: string;
  children?: ReactNode;
  onCancel?: () => void;
}>;

export declare const Portal: FC<{
  theme?: 'willow' | 'willow-dark';
  target?: HTMLElement;
  children?: ReactNode;
}>;

export declare const Material: FC<{
  fonts?: boolean;
  children?: ReactNode;
}>;

export declare const Willow: FC<{
  fonts?: boolean;
  children?: ReactNode;
}>;

export declare const WillowDark: FC<{
  fonts?: boolean;
  children?: ReactNode;
}>;

export declare const Locale: FC<{
  words?: any;
  optional?: boolean;
  children?: ReactNode;
}>;

export declare const Globals: FC<{
  children?: ReactNode;
}>;

export declare const Avatar: FC<{
  value?: IUser | IUser[];
  size?: number;
  limit?: number;
  css?: string;
}>;

export declare const SuggestDropdown: FC<
  DropdownOptions & {
    items?: IOption[];
    children?: ReactNode;
    onSelect?: (ev: { id: TID | TID[] }) => void;
    onReady?: (ev: {
      navigate?: (dir: number | null, ev?: KeyboardEvent) => void;
      keydown?: (ev: KeyboardEvent, dir: number) => void;
      move?: (ev: KeyboardEvent) => void;
    }) => void;
    multiselect?: boolean;
    checkboxes?: boolean;
    value?: TID | TID[];
    virtualized?: boolean;
  }
>;

export declare function popupContainer(node: HTMLElement): void;

export declare const Tooltip: FC<{
  at?: TPositionNoFit;
  arrow?: boolean;
  touch?: boolean;
  overflow?: boolean;
  delay?: number;
  content?: TTooltipContent | null;
  resolver?: TooltipResolver;
  children?: ReactNode;
  css?: string;
}>;
