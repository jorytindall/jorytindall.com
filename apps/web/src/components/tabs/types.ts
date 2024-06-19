interface TabsProps {
  children?: React.ReactNode,
  defaultValue?: string,
  value?: string,
  onValueChange?: any,
  orientation?: 'vertical' | 'horizontal',
  dir?: 'ltr' | 'rtl',
  activationMode?: 'automatic' | 'manual',
  isContained?: boolean,
  className?: string,
}

interface TabsTriggerProps {
  children?: React.ReactNode,
  value: string,
  disabled?: boolean,
  icon?: any,
  className?: string,
}

interface TabsContentProps {
  children?: React.ReactNode,
  value: string,
  forceMount?: boolean,
  className?: string,
}

interface TabsListProps {
  children?: React.ReactNode,
  loop?: boolean,
  isContained?: boolean,
  className?: string,
}

export type {
  TabsProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsListProps,
}