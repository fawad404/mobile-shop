export function Input({ id, name, type = "text", value, onChange, required, className = "" }) {
    return (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 bg-gray-200 border border-gray-600 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
      />
    );
  }
  