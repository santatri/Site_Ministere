import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

/**
 * RoleBasedRoute
 * Props:
 *  - element: React element to render when access granted
 *  - allowedRoles: string or array of allowed role names (e.g. 'admin' or ['admin','communication'])
 *
 * Behaviour:
 *  - If user is not authenticated -> redirect to /login
 *  - If user is authenticated but role not allowed -> redirect to /access-denied
 *  - Otherwise render the element
 */
const RoleBasedRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, getRole } = useAuth();

  // normalize allowedRoles to array
  const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!isAuthenticated()) {
    // pas connecté -> vers /login
    return <Navigate to="/login" replace />;
  }

  const role = getRole();
  if (!role || !allowed.includes(role)) {
    // connecté mais pas autorisé
    return <Navigate to="/access-denied" replace />;
  }

  return element;
};

export default RoleBasedRoute;
