import React from 'react';

const SectionHeader: React.FC = () => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
      Monthly Results
    </h2>
    <p className="text-lg text-text-muted max-w-3xl mx-auto">
      View our monthly equity curve and performance results. Select a month to
      see its chart.
    </p>
  </div>
);

export default SectionHeader;
