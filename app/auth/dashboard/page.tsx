'use client';
import { Blog, getCurrentUserBlogs } from '@/lib/blog';
import { useAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';

export default function Dashboard() {
  const [blogs, setBlogs] = React.useState<Blog[] | null>(null);
  const { signOut } = useAuthenticator();
  React.useEffect(() => {
    if (blogs == null) {
      getCurrentUserBlogs().then((data) => {
        setBlogs(data);
        console.log('Fetched blogs:', data);
      }).catch((error) => {
        console.error('Error fetching blogs:', error);
      });
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <div>
        <p>Welcome to your dashboard!</p>
        <ul>
          <li>Overview</li>
          <li>Statistics</li>
          <li>Reports</li>
        </ul>
      </div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

