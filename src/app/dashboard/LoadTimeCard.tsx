interface LoadTimeCardProps {
  loadTime: number;
}

export default function LoadTimeCard({ loadTime }: LoadTimeCardProps) {
  return (
    <div className="border border-gray-200 rounded p-4">
      <h4 className="font-bold text-lg">Page Load Time</h4>
      <p className="text-2xl text-blue-600">{loadTime} sec</p>
      <p className="text-gray-600 text-sm mt-2">
        Quick load times improve user experience. Aim for under 3 seconds.
      </p>
    </div>
  );
}
