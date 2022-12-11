import { FormikErrors } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MentionsInput, Mention } from 'react-mentions';
import styled from 'styled-components';
import { Box } from '../core';

const defaultStyle = {
  '&singleLine': {
    display: 'inline-block',
    highlighter: {
      padding: '0.3rem 0.75rem',
      borderRadius: '0.125rem',
      border: '1px solid #dee2e6'
    },
    input: {
      padding: '0.3rem 0.75rem',
      borderRadius: '0.125rem',
      border: '1px solid #dee2e6'
    }
  },
  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
      height: '11rem',
      overflow: 'auto'
    },
    item: {
      padding: '5px 15px',
      '&focused': {
        backgroundColor: '#BBF7D0',
        color: '#015426'
      }
    }
  }
};
const defaultMentionStyle = {
  // backgroundColor: '#BBF7D0',
  backgroundColor: '#cee4e5',
  color: '#cee4e5',
  padding: '0.3rem 0'
};
const StyledMentionsInput = styled(MentionsInput)`
  width: 100%;
  height: 2rem;
  padding: 0;
  font-size: 0.875rem;
  input {
    &:focus-visible,
    &:focus-within {
      outline: 1px solid #719ece;
      // border: 1px solid #719ece;
    }
  }
`;

interface MentionInputProps {
  value: string;
  onChange: (e: string) => Promise<void> | Promise<FormikErrors<any>>;
  onBlur: any;
  name: string;
  mentionData?: any;
  mentionValue: any;
  onMentionChange: any;
}

const RMention = (props: MentionInputProps) => {
  const [mentionsValue, setMentionsValue] = useState<Array<string | number>>([]);
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(props.value);
  }, [props.mentionValue, props.value]);
  const { t } = useTranslation();

  return (
    <Box>
      <StyledMentionsInput
        singleLine={true}
        value={value}
        style={defaultStyle}
        placeholder={t('common:header.mention_placeholder')}
        onChange={(event: any) => {
          setValue(event.target.value);
          props.onChange(event.target.value);
        }}>
        <Mention
          trigger="@"
          markup="@({(__id__)})"
          data={props.mentionData}
          style={defaultMentionStyle}
          appendSpaceOnAdd={true}
          onAdd={(id) => {
            setMentionsValue([...mentionsValue, id]);
            props.onMentionChange([...mentionsValue, id]);
          }}
        />
      </StyledMentionsInput>
    </Box>
  );
};

export default RMention;
