import { getClasses } from 'utils/getClasses';
import s from './StatCard.module.css';

interface StatCardProps {
  children: React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
  style?: 'primary' | 'secondary';
  padding?: 'none' | 'small' | 'medium' | 'large';
  gap?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export const StatCard = ({
  children,
  orientation = 'vertical',
  style = 'primary',
  padding = 'medium',
  gap = 'medium',
  className
}: StatCardProps) => {
  const classes = getClasses([
    s.statCard,
    orientation === 'horizontal' ? s.horizontal : s.vertical,
    style === 'secondary' ? s.secondary : s.primary,
    padding === 'small' ? s.paddingSm :
      padding === 'medium' ? s.paddingMd :
        padding === 'large' ? s.paddingLg : s.none,
    gap === 'small' ? s.gapSm :
      gap === 'medium' ? s.gapMd :
        gap === 'large' ? s.gapLg : s.gapNone,
    className
  ]);

  return (
    <div className={classes}>{children}</div>
  );
};
