import React from 'react';
import { getTeamMeta } from '../data/teamLogos';

interface TeamLogoProps {
  teamName: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallbackEmoji?: string;
  showName?: boolean;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({
  teamName,
  size = 'md',
  className = '',
  showName = false
}) => {
  const meta = getTeamMeta(teamName);

  // Size dimensions
  const sizeClasses = {
    xs: 'w-6 h-6 text-[9px]',
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-11 h-11 text-sm',
    xl: 'w-14 h-14 text-base'
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div 
        className={`${sizeClasses[size]} rounded-lg border-2 flex items-center justify-center shrink-0 overflow-hidden shadow-xs relative transition-transform hover:scale-105 font-mono select-none px-0.5`}
        style={{
          backgroundColor: meta.primaryColor,
          borderColor: meta.secondaryColor !== '#FFFFFF' ? meta.secondaryColor : 'rgba(255,255,255,0.3)',
          color: meta.secondaryColor !== '#000000' ? meta.secondaryColor : '#FFFFFF'
        }}
        title={`${teamName} (${meta.mascot})`}
      >
        <span className="font-black tracking-tighter text-center uppercase leading-none truncate max-w-full">
          {meta.abbreviation}
        </span>
      </div>

      {showName && (
        <span className="font-bold text-white text-sm truncate">
          {teamName}
        </span>
      )}
    </div>
  );
};
