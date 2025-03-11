'use client';

interface MobileCompatibilityCardProps {
  mobileFriendly: boolean;
}

export default function MobileCompatibilityCard({
  mobileFriendly,
}: MobileCompatibilityCardProps) {
  return (
    <div className="border border-gray-200 rounded p-4">
      <h4 className="font-bold text-lg">Mobile Compatibility</h4>
      <p className="text-2xl">{mobileFriendly ? 'Yes' : 'No'}</p>
      <p className="text-gray-600 text-sm mt-2">
        Yes means your site works well on mobile devices; No indicates it needs
        responsive improvements.
      </p>
    </div>
  );
}
