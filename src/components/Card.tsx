'use client';

import React from 'react';

interface CardProps {
  title?: string;
  children?: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-lg bg-white shadow p-4">
      {title && (
        <h2 className="mb-2 text-lg font-bold text-gray-700">{title}</h2>
      )}
      <div>{children}</div>
    </div>
  );
}
