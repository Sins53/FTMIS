import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, FlexBox, Image, Text } from '@/components/core';
import image from '@/assets/image/401.png';
import Button from '@/components/derived/Buttons/Buttons';
import { t } from 'i18next';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    console.log('error', _);
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <FlexBox align="center" justify="center" className="h-100 mx-auto">
          <FlexBox align="center">
            <Image src={image} height={'202'} />
            <Box className="ml-5">
              <Text variant="h4" className="fw-bold">
                {t('common:header.something_went_wrong')}
              </Text>
              <Text variant="p" className="mt-3 text-gray-56">
                {t('common:header.something_went_wrong_msg')}
              </Text>
              <Button
                className="btn btn-primary mt-4"
                onClick={() => {
                  window.location.reload();
                }}>
                {t('common:no_data.go_home')}
              </Button>
            </Box>
          </FlexBox>
        </FlexBox>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
