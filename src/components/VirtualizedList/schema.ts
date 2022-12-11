export type VirtualizedListItemProp<TData = any> = React.ComponentType<{
  // individual item
  item: TData;
  // index of individual item
  index: number;
}>;

interface VirtualizedListProps {
  // list of data to be virtualized
  data: Array<any>;
  // count of data, if not provided, length od data list is used
  itemCount?: number;
  // if the list has no data, this component is rendered
  listEmptyComponent?: React.ComponentType;
  // the rendered list item, default props of component are individual item and index of the item
  renderItem: VirtualizedListItemProp<any>;
  // padding to be provided to the list
  componentPadding?: string;
}

export default VirtualizedListProps;
