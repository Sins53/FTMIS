import { lazy } from 'react';
import { RouteProperties } from '../props';

const FinancialGrantLayout = lazy(
  () => import('@/core/Protected/FinancialGrant/FinancialGrantLayout')
);
const FinancialGrant = lazy(() => import('@/core/Protected/FinancialGrant/FinancialGrant'));
const PerformanceBased = lazy(
  () => import('@/core/Protected/FinancialGrant/PerformanceBased/PerformanceBased')
);
const MinimalGrantView = lazy(
  () => import('@/core/Protected/FinancialGrant/MinimumGrant/MinimumGrantView')
);
const FormulaBased = lazy(
  () => import('@/core/Protected/FinancialGrant/FormulaBased/FormulaBased')
);
const FormulaBasedIndicators = lazy(
  () => import('@/core/Protected/FinancialGrant/FormulaBased/Indicators/FormulaBasedIndicators')
);
const FinalResultTable = lazy(() => import('@/core/Protected/FinancialGrant/FinalResultTable'));
const PerformanceBasedResult = lazy(
  () => import('@/core/Protected/FinancialGrant/PerformanceBased/PerformanceBasedResult')
);

const root = '/equalization-grant';

export const financialGrantPath = {
  FinancialGrant: root,
  PerformanceBased: root + '/performance-based/:name/:id',
  PerformanceBasedResult: root + '/performance-based/result',
  MinimalGrantView: root + '/minimum-grant/:name',
  FormulaBased: root + '/formula-based/:name',
  FormulaBasedIndicators: root + '/formula-based/:name/indicators',
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
      path: financialGrantPath.PerformanceBased,
      element: PerformanceBased,
      whiteList: true
    },
    {
      path: financialGrantPath.PerformanceBasedResult,
      element: PerformanceBasedResult,
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
      element: MinimalGrantView,
      whiteList: true
    }
  ]
};
