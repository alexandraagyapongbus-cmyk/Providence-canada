import * as React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' };

export function Button({ className = '', variant = 'default', ...props }: Props) {
  return <button className={`ui-button ui-button-${variant} ${className}`} {...props} />;
}
