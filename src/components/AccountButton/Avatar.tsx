interface AvatarProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

export default function Avatar({ src, alt, className = '' }: AvatarProps) {
  if (!src) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt || '사용자'}
        className="h-12 w-12 rounded-full object-cover shadow-lg ring-2 ring-white transition-all duration-300 hover:scale-120 hover:shadow-2xl dark:ring-white/20 dark:hover:shadow-gray-700"
        style={{
          filter: 'brightness(1.05) contrast(1.2)',
        }}
      />
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5" />
    </div>
  );
}
