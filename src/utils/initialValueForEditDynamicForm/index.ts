const InitialValueForEditDynamic = (
  FirstValue: { [key: string]: string | number },
  SecondValue: { [key: string]: string | number }
) => {
  const one = Object.entries(FirstValue || {});
  const two = Object.entries(SecondValue || {});

  const newValue: any = {};

  one.forEach((oneValue) => {
    two.forEach((twoValue) => {
      if (oneValue[0] === twoValue[0]) {
        newValue[twoValue[0]] = twoValue[1];
      }
    });
  });

  return { ...FirstValue, ...newValue };
};

export default InitialValueForEditDynamic;
