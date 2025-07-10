'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    redirect('/about');
  }, []);

  return null;
}
