import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

const RangeSlider = ({ onPriceRangeChange }) => {
  const [values, setValues] = useState([50, 877]);
  const max = 1550;

  const handleValueChange = (newValues) => {
    setValues(newValues);
    onPriceRangeChange(newValues);
  };

  const markers = [0, 338, 775, 1163, max];

  return (
    <div className="w-full px-2">
      <div className="relative pt-6">
        <SliderPrimitive.Root
          className="relative flex w-full touch-none select-none items-center"
          value={values}
          max={max}
          step={1}
          onValueChange={handleValueChange}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-slate-100">
            <SliderPrimitive.Range className="absolute h-full rounded-full bg-[#4c00ff]" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className="block h-5 w-5 rounded-full border border-[#4c00ff] bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-[#4c00ff] px-2 py-1 text-xs text-white">
              ${values[0]}
            </div>
          </SliderPrimitive.Thumb>
          <SliderPrimitive.Thumb
            className="block h-5 w-5 rounded-full border border-[#5635a1] bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-[#4c00ff] px-2 py-1 text-xs text-white">
              ${values[1]}
            </div>
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
        <div className="absolute left-0 right-0 mt-2 flex justify-between text-xs text-slate-500">
          {markers.map((marker) => (
            <span key={marker}>${marker}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;

