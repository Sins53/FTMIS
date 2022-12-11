import { FlexBox } from '@/components/core';
import Button from '../derived/Buttons/Buttons';
import { Text } from '@/components/core';
import { IoReturnUpForwardOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

interface DataUnavailableProps {
  title?: string;
  description?: string;
  icon?: React.ReactElement;
  onClick?: () => void;
  button?: React.ReactElement;
  className?: string;
  skipButton?: boolean;
}

function DataUnavailable(props: DataUnavailableProps): JSX.Element {
  const { title, description, icon, onClick, className, skipButton } = props;
  const { t } = useTranslation();
  return (
    <FlexBox
      align="center"
      justify="center"
      direction="column"
      className={`${className ? className : 'app-height p-4'}`}>
      {icon}

      <Text variant="h6" typeface="bold" className="mt-3">
        {title}
      </Text>
      <Text className="mt-2 text-center" variant="display1">
        {description}
      </Text>
      {onClick && (
        <Button className="btn btn-primary btn-icon lft mt-3" onClick={onClick}>
          <i className="ic-add"></i>
          {t('common:buttons.add')}
        </Button>
      )}
      {skipButton && (
        <Button className="btn btn-outline-primary btn-icon lft ml-3" onClick={onClick}>
          <IoReturnUpForwardOutline />
          {t('common:buttons.skip')}
        </Button>
      )}
    </FlexBox>
  );
}

export default DataUnavailable;
