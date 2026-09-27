import React from 'react';

interface Props {
  index: string;
  label: string;
  className?: string;
}

export const SectionLabel: React.FC<Props> = ({ index, label, className = '' }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center text-accent tracking-widest text-xs uppercase font-medium">
        <span className="mr-4 w-8 h-[1px] bg-accent/50 inline-block"></span>
        <span>{index}</span>
        <span className="mx-2">/</span>
        <span>{label}</span>
      </div>
    </div>
  );
};
