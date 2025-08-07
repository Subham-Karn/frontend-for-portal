import React, { useRef, useState } from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({ className }) => {
  const inputRef = useRef(null);
const [trackFocus, setTrackFocus] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={`${className} focus-within:ring-2   focus-within:ring-blue-500 transition-all duration-300 gap-2 flex items-center w-[30%] bg-gray-100 p-2 rounded flex-row-reverse`}>
    <span className="text-gray-400 bg-gray-200 p-1 rounded">esc</span>
      <input
        onFocus={() => setTrackFocus(true)}
        onBlur={() => setTrackFocus(false)}
        type="text"
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="w-full py-2 bg-transparent outline-none text-black"
        required
        placeholder="Search"
      />
      <Search size={30} className={`${trackFocus ? 'text-blue-500' : 'text-gray-400'}`}/>
    </div>
  );
};

export default SearchInput;
