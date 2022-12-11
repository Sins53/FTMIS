import { Text } from '@/components/core';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('morning');

  const { t } = useTranslation();
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
    <>
      <Text>
        {greeting === 'morning'
          ? t('common:greeting.morning')
          : greeting === 'afternoon'
          ? t('common:greeting.afternoon')
          : t('common:greeting.evening')}
      </Text>
    </>
  );
};

export default Dashboard;
