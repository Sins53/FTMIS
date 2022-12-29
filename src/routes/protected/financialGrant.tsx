import { lazy } from 'react';
import { RouteProperties } from '../props';

const FinancialGrantLayout = lazy(
  () => import('@/core/Protected/FinancialGrant/FinancialGrantLayout')
);
const FinancialGrant = lazy(() => import('@/core/Protected/FinancialGrant/FinancialGrant'));
const CommonMinimumGrant = lazy(
  () => import('@/core/Protected/FinancialGrant/CommonGrants/CommonMinimumGrant')
);
const CommonPerformanceBasedIndicators = lazy(
  () =>
    import(
      '@/core/Protected/FinancialGrant/CommonGrants/PerformanceBased/CommonPerformanceBasedIndicators'
    )
);
const CommonPerformanceBased = lazy(
  () => import('@/core/Protected/FinancialGrant/CommonGrants/CommonPerformanceBased')
);
const FormulaBased = lazy(
  () => import('@/core/Protected/FinancialGrant/FormulaBased/FormulaBased')
);
const FormulaBasedIndicators = lazy(
  () => import('@/core/Protected/FinancialGrant/FormulaBased/Indicators/FormulaBasedIndicators')
);
const FinalResultTable = lazy(() => import('@/core/Protected/FinancialGrant/FinalResultTable'));

const root = '/equalization-grant';

export const financialGrantPath = {
  FinancialGrant: root,
  CommonPerformanceBased: root + '/performance-based/:name/:id',
  CommonPerformanceBasedIndicators: root + '/performance-based/:name/indicators',
  MinimalGrantView: root + '/minimum-grant/:name/:id',
  FormulaBased: root + '/formula-based/:name/:id',
  FormulaBasedIndicators: root + '/formula-based/indicators',
  FinalResultTable: root + '/:name/result'
};

export const financialGrantRoutes: RouteProperties = {
  path: root,
  element: FinancialGrantLayout,
  whiteList: true,
  children: [
    {
      path: financialGrantPath.FinancialGrant,
      element: FinancialGrant,
      whiteList: true
    },
    {
      path: financialGrantPath.CommonPerformanceBased,
      element: CommonPerformanceBased,
      whiteList: true
    },
    {
      path: financialGrantPath.FormulaBased,
      element: FormulaBased,
      whiteList: true
    },
    {
      path: financialGrantPath.FormulaBasedIndicators,
      element: FormulaBasedIndicators,
      whiteList: true
    },
    {
      path: financialGrantPath.FinalResultTable,
      element: FinalResultTable,
      whiteList: true
    },
    {
      path: financialGrantPath.MinimalGrantView,
      element: CommonMinimumGrant,
      whiteList: true
    },
    {
      path: financialGrantPath.CommonPerformanceBasedIndicators,
      element: CommonPerformanceBasedIndicators,
      whiteList: true
    }
  ]
};
