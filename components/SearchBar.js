import { useMemo, useState } from 'react';
import Link from 'next/link';
import FlexSearch from 'flexsearch';

export default function SearchBar({ documents = [], placeholder = 'Search docs...' }) {
  const [query, setQuery] = useState('');

  const index = useMemo(() => {
    const searchIndex = new FlexSearch.Document({
      tokenize: 'forward',
      document: {
        id: 'id',
        index: ['title', 'description', 'content']
      }
    });

    documents.forEach((doc, id) => {
      searchIndex.add({
        id,
        title: doc.title || '',
        description: doc.description || '',
        content: doc.content || doc.excerpt || '',
      });
    });

    return searchIndex;
  }, [documents]);

  const matches = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const searchResults = index.search(query, { limit: 8 });
    const uniqueIds = new Set();
    
    searchResults.forEach((fieldResult) => {
      fieldResult.result.forEach((id) => {
        uniqueIds.add(id);
      });
    });

    return Array.from(uniqueIds)
      .map((id) => documents[id])
      .filter(Boolean)
      .slice(0, 8);
  }, [documents, index, query]);

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none ring-blue-300 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />
      {matches.length > 0 ? (
        <div className="absolute top-10 z-30 w-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {matches.map((match) => (
            <Link
              key={match.route}
              href={match.route}
              className="block border-b border-slate-100 px-3 py-2 text-sm hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
              onClick={() => setQuery('')}
            >
              <p className="font-medium text-slate-900 dark:text-slate-100">{match.title}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{match.route}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
