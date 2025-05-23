import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import RoleAuthGuard from 'utils/route-guard/RoleAuthGuard';

// render - sample page
const DashboardPage = Loadable(lazy(() => import('pages/dashboard')));
const AddCollegePage = Loadable(lazy(() => import('pages/addCollege')));
const DataViewPage = Loadable(lazy(() => import('pages/dataView')));
const QualityControlPage = Loadable(lazy(() => import('pages/qualityControl')));
const PdfViewerPage = Loadable(lazy(() => import('pages/pdfViewer')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element: <RoleAuthGuard userRole="Admin">{<DashboardPage />}</RoleAuthGuard>
    },
    {
      path: 'addCollege',
      element: <RoleAuthGuard userRole="Admin">{<AddCollegePage />}</RoleAuthGuard>
    },
    {
      path: 'dataView',
      element: <RoleAuthGuard userRole="Admin">{<DataViewPage />}</RoleAuthGuard>
    },
    {
      path: 'qualityControl',
      element: <RoleAuthGuard userRole="Admin">{<QualityControlPage />}</RoleAuthGuard>
    },
    {
      path: 'pdfViewer/:id/:universityId',
      element: <RoleAuthGuard userRole="Admin">{<PdfViewerPage />}</RoleAuthGuard>
    },
    {
      path: 'userDashboard',
      element: <RoleAuthGuard userRole="User">{<DashboardPage />}</RoleAuthGuard>
    }
  ]
};

export default MainRoutes;
