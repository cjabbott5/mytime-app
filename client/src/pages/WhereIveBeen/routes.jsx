import { Route } from 'react-router-dom';

// 🛡 Layout + Protection
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

// 🔹 Main Section Entry
import WhereIveBeen from '.';

// 🔹 MEMORY COLLECTION
import CollectionLanding from './MemoryCollection/CollectionLanding';
import FreeformReflection from './MemoryCollection/MemoryExplorationWizard/FreeformReflection';
import GuidedReflectionPrompts from './MemoryCollection/GuidedPrompts/GuidedReflectionPrompts';

// 🔹 MEMORY ORGANIZATION
import OrganizationLanding from './MemoryOrganization/OrganizationLanding';
import MemoryCenter from './MemoryOrganization/MemoryCenter/MemoryCenter';
import MemoryDetail from './MemoryOrganization/MemoryCenter/MemoryDetail';
import TimelineView from './MemoryOrganization/Timelineview';

export const whereIveBeenRoutes = [
  // 🌸 MAIN LANDING
  <Route
    key="where-ive-been"
    path="/where-ive-been"
    element={
      <ProtectedRoute>
        <LayoutWrapper>
          <WhereIveBeen />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />,

  // ✍️ MEMORY COLLECTION
  <Route
    key="memory-collection"
    path="/where-ive-been/memory-collection"
    element={
      <ProtectedRoute>
        <LayoutWrapper>
          <CollectionLanding />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />,
  <Route
    key="freeform-reflection"
    path="/where-ive-been/memory-collection/exploration"
    element={
      <ProtectedRoute>
        <LayoutWrapper>
          <FreeformReflection />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />,
  <Route
    key="guided-prompts"
    path="/where-ive-been/memory-collection/guided"
    element={
      <ProtectedRoute>
        <LayoutWrapper>
          <GuidedReflectionPrompts />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />,

  // 🗂 MEMORY ORGANIZATION
  <Route
    key="organization-landing"
    path="/where-ive-been/memory-organization"
    element={
      <ProtectedRoute>
        <LayoutWrapper>
          <OrganizationLanding />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />,
  <Route
    key="memory-center"
    path="/where-ive-been/memory-organization/memory-center"
    element={
      <ProtectedRoute>
        <LayoutWrapper>
          <MemoryCenter />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />,
  // ✅ Optional alias (shortcut) route
  <Route
    key="memory-center-alias"
    path="/where-ive-been/memory-center"
    element={
      <ProtectedRoute>
        <LayoutWrapper>
          <MemoryCenter />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />,
  <Route
    key="memory-detail"
    path="/where-ive-been/memory-organization/memory/:id"
    element={
      <ProtectedRoute>
        <LayoutWrapper>
          <MemoryDetail />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />,
  <Route
    key="timeline-view"
    path="/where-ive-been/memory-organization/timeline"
    element={
      <ProtectedRoute>
        <LayoutWrapper>
          <TimelineView />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />,
];
