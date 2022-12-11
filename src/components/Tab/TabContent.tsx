import { TabContent as RTabContent } from 'reactstrap';

interface TabContentProps {
  className?: string;
  [key: string]: any;
  tag?: React.ElementType;
  activeTab?: number | string;
}

function TabContent(props: TabContentProps) {
  const { className } = props;
  return <RTabContent {...props} className={className} />;
}
export default TabContent;
