import Link from 'next/link';

export default function AuthorCard({ username, name, avatar, url, showLabel = true }) {
  const label = 'Written by:';
  const displayName = name || username;

  const content = (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
      {avatar ? (
        <img
          src={avatar}
          alt={`${displayName} avatar`}
          className="h-12 w-12 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {displayName.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="space-y-1">
        {showLabel ? (
          <div className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{label}</div>
        ) : null}
        <div className="text-base font-semibold text-slate-900 dark:text-slate-100">{displayName}</div>
      </div>
    </div>
  );

  if (url) {
    return (
      <Link href={url} className="block hover:opacity-90" target="_blank" rel="noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}
