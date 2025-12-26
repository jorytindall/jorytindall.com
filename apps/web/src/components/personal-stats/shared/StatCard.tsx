import { getClasses } from 'utils/getClasses';
import s from './StatCard.module.css';

interface StatCardProps {
  children: React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
  style?: 'primary' | 'secondary';
  className?: string;
}

export const StatCard = ({
  children,
  orientation = 'vertical',
  style = 'primary',
  className
}: StatCardProps) => {
  const classes = getClasses([
    s.statCard,
    orientation === 'horizontal' ? s.horizontal : s.vertical,
    style === 'secondary' ? s.secondary : s.primary,
    className
  ]);

  return (
    <div className={classes}>{children}</div>
  );
};
