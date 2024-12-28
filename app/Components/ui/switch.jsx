import React from 'react';
import { cn } from '../../../lib/utils';

const Switch = React.forwardRef(({ className, checked, onChange, ...props }, ref) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    className={cn(
      "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-primary" : "bg-input",
      className
    )}
    onClick={onChange}
    ref={ref}
    {...props}
  >
    <span
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
        checked ? "translate-x-5" : "translate-x-0"
      )}
    />
  </button>
));

Switch.displayName = "Switch";

export { Switch };

