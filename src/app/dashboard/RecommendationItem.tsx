'use client';

interface RecommendationItemProps {
  title: string;
  description: string;
}

export default function RecommendationItem({
  title,
  description,
}: RecommendationItemProps) {
  return (
    <li className="mb-1">
      <strong>{title}:</strong> {description}
    </li>
  );
}
