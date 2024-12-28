export function Textarea({ id, name, value, onChange, required, rows = 4, className = "" }) {
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`w-full px-3 py-2 bg-gray-200 border border-gray-600 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
      />
    );
  }
  
  