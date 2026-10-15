import React, { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';
import NewsCard from '../components/NewsCard';
import { filterSafeArticles } from '../services/newsAPI';

export default function Bookmarks(){
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(()=>{
    const load = () => {
      const all = JSON.parse(localStorage.getItem('newsapp-bookmarks') || '[]');
      setBookmarks(filterSafeArticles(all));
    };
    load();
    window.addEventListener('bookmarks-updated', load);
    window.addEventListener('safe-search-updated', load);
    return () => {
      window.removeEventListener('bookmarks-updated', load);
      window.removeEventListener('safe-search-updated', load);
    };
  }, []);

  return (
    <div className="page bookmarks">
      <Topbar onSearch={()=>{}} />
      <section className="news-grid-wrap">
        <h3>Bookmarks</h3>
        {!bookmarks.length && (
          <div className="no-results">
            <p>No bookmarks yet. Bookmark articles using the bookmark icon.</p>
          </div>
        )}
        <div className="news-grid">
          {bookmarks.length ? bookmarks.map((a,i)=> <NewsCard key={a.link && a.link !== '#' ? a.link : `bookmark-${i}-${a.title?.slice(0, 20)}`} article={a} />) : null}
        </div>
      </section>
    </div>
  )
}
