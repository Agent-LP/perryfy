import React from 'react';

type ViewSwitcherProps = {
  currentView: 'front' | 'back';
  onViewChange: (view: 'front' | 'back') => void;
};

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
      <button
        onClick={() => onViewChange('front')}
        className={`px-3 py-1.5 text-sm rounded-md ${
          currentView === 'front'
            ? 'bg-[#FF6B35] text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Vista Frontal
      </button>
      <button
        onClick={() => onViewChange('back')}
        className={`px-3 py-1.5 text-sm rounded-md ${
          currentView === 'back'
            ? 'bg-[#FF6B35] text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Vista Trasera
      </button>
    </div>
  );
};

export default ViewSwitcher; 