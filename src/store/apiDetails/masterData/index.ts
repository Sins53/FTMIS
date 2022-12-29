import designation from './designation';
import loanManagement from './loanManagement';
import locations from './location';
import category from './category';
import department from './department';
import selfEmployment from './self-employment';
import branches from './branch';
import occupation from './occupation';
import documents from './documents';
import province from './provinceSetup';
import eligibilityCriteria from './eligibilityCriteria';
import declarations from './declarations';
import fiscalYear from './fiscalYear';
import siteSetting from './siteSetting';
import smsSettings from './sms';
import psychometricDynamicUrl from './psychometricDynamicUrl';
import localGovernment from './localGovernment';
import indicator from './indicator';

export default {
  ...category,
  designation,
  selfEmployment,
  ...loanManagement,
  ...locations,
  branches,
  ...department,
  occupation,
  ...documents,
  province,
  eligibilityCriteria,
  declarations,
  fiscalYear,
  siteSetting,
  smsSettings,
  psychometricDynamicUrl,
  localGovernment,
  indicator
};
