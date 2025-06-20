'use client';

import React, { useEffect, useState } from 'react';
import Ping from './Ping';

type ViewProps = {
  id: string;
  views: number;
};

const View = ({ id, views }: ViewProps) => {
  const [displayedViews, setDisplayedViews] = useState(views); // ✅ Store in state

  useEffect(() => {
    const updateViews = async () => {
      try {
        const res = await fetch('/api/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();

        if (data?.views !== undefined) {
          setDisplayedViews(data.views); // ✅ Proper state update
        }
      } catch (error) {
        console.error('Failed to update views:', error);
      }
    };

    updateViews();
  }, [id]);

  return (
    <div className="view-container">
      <div className="absolute -top-3 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{displayedViews} views</span>
      </p>
    </div>
  );
};

export default View;
