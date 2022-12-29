import { Text } from '@/components/core';
import Layout from '@/components/layout';
import dashboard from '@/assets/image/dashboard.png';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserDetails } from '@/hooks/application';
import { getTextByLanguage } from '@/i18n/i18n';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('morning');

  const { t } = useTranslation();
  const userData = useUserDetails();

  const handleGreeting = () => {
    const myDate = new Date();
    const hours = myDate.getHours();
    let greet = 'morning';
    if (hours < 12) greet = 'morning';
    else if (hours >= 12 && hours <= 17) greet = 'afternoon';
    else if (hours >= 17 && hours <= 24) greet = 'evening';
    setGreeting(greet);
  };
  useEffect(() => handleGreeting(), []);

  return (
    <Layout.Container className="mt-4">
      <Text variant="h4" typeface="semiBold" className="text-primary">
        {greeting === 'morning'
          ? t('common:greeting.morning')
          : greeting === 'afternoon'
          ? t('common:greeting.afternoon')
          : t('common:greeting.evening')}
        ,&nbsp;
        {getTextByLanguage(
          `${userData?.first_name || ''} ${userData?.middle_name || ''} ${
            userData?.last_name || ''
          }`,
          `${userData?.first_name || ''} ${userData?.middle_name || ''} ${
            userData?.last_name || ''
          }`
        )}
      </Text>

      <img src={dashboard} alt="" className="img-fluid w-100" />
    </Layout.Container>
  );
};

export default Dashboard;
