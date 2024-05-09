import React 														from 'react';
import { Route, Routes, Navigate, useLocation  } 					from 'react-router-dom';
import PropTypes 													from 'prop-types';
import { AnimatePresence }											from 'framer-motion';

import { useTracker } 												from 'meteor/react-meteor-data';
import { Roles } 													from 'meteor/alanning:roles';

import Landing 														from '../pages/Landing';
import NotFound 													from '../pages/NotFound';
import SignUp 														from '../pages/SignUp';
import SignOut 														from '../pages/SignOut';
import SignIn 														from '../pages/SignIn';
import NotAuthorized 												from '../pages/NotAuthorized';

import LoadingSpinner 												from './LoadingSpinner';

import ListDemoItems 												from '../pages/demoItems/listDemoItems';
import ListDemoItemsAdmin 											from '../pages/demoItems/listDemoItemsAdmin';
import AddDemoItem 													from '../pages/demoItems/addDemoItem';
import EditDemoItem 												from '../pages/demoItems/editDemoItem';

export const pageTransition = {
	initial: {
		transform: 'translateY(0%) scale(1)', 
		opacity: 0,
	},
	animate: {
		transform: 'translateY(0%) scale(1)',
		opacity: 1, 
	},
	exit: {
		transform: 'translateY(20%) scale(0.75)', 
		opacity: 0,
	},
}

const AnimatedRoutes = () => {
	const location = useLocation();
	const { rolesSubscriptionReady } = useTracker(() => {
		const rolesSubscriptionReady = Roles.subscription.ready();
		return {
			rolesSubscriptionReady,
			location,
		};
	});
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Landing />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signout" element={<SignOut />} />
				
				<Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />

				<Route path="/demoItems/list" element={<ProtectedRoute><ListDemoItems /></ProtectedRoute>} />
				<Route path="/demoItems/listadmin" element={<AdminProtectedRoute ready={rolesSubscriptionReady!}><ListDemoItemsAdmin /></AdminProtectedRoute>} />
				<Route path="/demoItems/add" element={<ProtectedRoute><AddDemoItem /></ProtectedRoute>} />
				<Route path="/demoItems/edit/:_id" element={<ProtectedRoute><EditDemoItem /></ProtectedRoute>} />
				
				<Route path="/notauthorized" element={<NotAuthorized />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AnimatePresence>
	);
}
/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({children}:any) => {
	const isLogged = Meteor.userId() !== null;
	return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }:any) => {
	const isLogged = Meteor.userId() !== null;
	if (!isLogged) {
		return <Navigate to="/signin" />;
	}
	if (!ready) {
		return <LoadingSpinner />;
	}
	const isAdmin = Roles.userIsInRole(Meteor.userId()!, 'admin');
	return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
	children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
	ready: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
	ready: false,
	children: <Landing />,
};

export default AnimatedRoutes;