import { FC, useRef } from 'react';
import VirtualizedListProps from './schema';
import { useVirtual } from 'react-virtual';
import { ListEmptyComponent } from '.';

const VirtualizedList: FC<VirtualizedListProps> = (props) => {
  const { data, listEmptyComponent, renderItem, itemCount, componentPadding } = props;

  const RenderItem = renderItem;
  const CustomListEmptyComponent = listEmptyComponent;

  const parentRef = useRef<HTMLDivElement>(null);

  // initializing virtual list items,
  // virtualItems is the list of items which will be visible in document tree
  // totalSize is the height of the scrollable list component
  const { virtualItems, totalSize } = useVirtual({
    size: (itemCount ? itemCount : data?.length) || 0,
    parentRef
  });

  return (
    <div
      ref={parentRef}
      className="scrollable h-100 w-100 overflow-auto"
      style={{ padding: componentPadding || '10px' }}
    >
      {data?.length ? (
        <div className="w-100 position-relative" style={{ height: `${totalSize}px` }}>
          {virtualItems.map(({ index, start, measureRef }) => (
            // measure ref dynamically measures the height and width of the component
            <div
              className="position-absolute w-100 top-0 left-0"
              style={{ transform: `translateY(${start}px)` }}
              key={index}
              ref={measureRef}
            >
              {/* render item */}
              <RenderItem item={data[index]} index={index} />
            </div>
          ))}
        </div>
      ) : (
        // list empty component
        CustomListEmptyComponent && ListEmptyComponent
      )}
    </div>
  );
};

export default VirtualizedList;
