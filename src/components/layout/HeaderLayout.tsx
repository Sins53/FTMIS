import { ToggleContext } from '@/providers/ToggleProvider';
import { coolGray } from '@/theme/colors';
import classnames from 'classnames';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Box, FlexBox, Text } from '../core';
import Button from '../derived/Buttons/Buttons';

interface Props {
  children?: React.ReactNode;
  className?: string;
  tab?: boolean;
  breadcrumb?: boolean;
  secondary?: boolean;
  backToList?: boolean;
  extraDetail?: boolean;
  sticky?: boolean;
}

export const Header = styled(Box)<Partial<Props>>`
  display: flex;
  align-items: center;
  // justify-content: space-between;
  padding: ${(props) => {
      return props.className == 'withTab' ? '0rem' : '.75rem';
    }}
    1.5rem;
  background-color: ${(props) => props.theme.color.surface};
  border-bottom: 1px solid ${(props) => props.theme.color.border};

  ${(props) => (props.sticky ? 'position:sticky; top:0; z-index:1; padding: 0 1rem;' : ``)}
`;

export default function HeaderLayout(props: Props) {
  const { className, secondary, backToList } = props;
  const { toggle, toggleSidebar } = useContext(ToggleContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Header
      component="header"
      sticky={props.sticky}
      className={classnames(className, { withTab: props.tab })}>
      {secondary
        ? null
        : toggle && (
            <Button className="btn cursor-pointer" onClick={() => toggleSidebar()}>
              <AiOutlineDoubleRight size={20} color={coolGray[600]} />
            </Button>
          )}

      <FlexBox
        align="center"
        justify="space-between"
        className={`${props.extraDetail ? 'row w-100' : 'w-100'}`}>
        {props.children}
        {backToList && (
          <Button className="btn" onClick={() => navigate(-1)}>
            <Text variant="display1">{t('common:header.back_to_list')}</Text>
          </Button>
        )}
      </FlexBox>
    </Header>
  );
}
