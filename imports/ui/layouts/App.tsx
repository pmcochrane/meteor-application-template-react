import React 														from 'react';
import { BrowserRouter as Router }									from 'react-router-dom';

import NavBar 														from '../components/NavBar';
import AnimatedRoutes												from '../components/AnimatedRoutes';
import Footer 														from '../components/Footer';

/** Top-level layout component for this application. Called in imports/startup/client/startup.tsx. */
const App = () => {
	return (
		<Router>
			<div className="container-fluid px-0">
				<div className="d-flex flex-column min-vh-100 position-relative">
					<NavBar />
					<div className="position-relative">
						<AnimatedRoutes />
					</div>
					<Footer />
				</div>
			</div>
		</Router>
	);
};

export default App;
