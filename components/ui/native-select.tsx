import * as React from 'react';
import { ChevronDown } from 'lucide-react';

export function NativeSelect({ className = '', children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <div className="ui-select-wrap"><select className={`ui-select ${className}`} {...props}>{children}</select><ChevronDown aria-hidden="true" /></div>;
}
