import { FlexBox } from '@/components/core';
import { AiOutlineUnorderedList } from 'react-icons/ai';

interface Props {
  title: string;
  message?: string;
}

function NoData({ title = 'No Data Found', message }: Props): JSX.Element {
  return (
    <FlexBox align="center" justify="center" direction="column" className="app-height p-4">
      <AiOutlineUnorderedList className="h3" />
      <h6 className="heading-04 my-2">{title}</h6>
      {message && <p>{message}</p>}
    </FlexBox>
  );
}

export default NoData;
