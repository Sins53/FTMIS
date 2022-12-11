import { RSkeleton } from '../Skeleton/RSkeleton';

export const TableSkeleton = () => {
  return (
    <div className="w-100">
      <RSkeleton count={7} height={16} />
    </div>
  );
};
