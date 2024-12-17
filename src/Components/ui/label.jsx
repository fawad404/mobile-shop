export function Label({ htmlFor, children, className = "" }) {
    return (
      <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium text-gray-400 mb-1 ${className}`}
      >
        {children}
      </label>
    );
  }
  
  