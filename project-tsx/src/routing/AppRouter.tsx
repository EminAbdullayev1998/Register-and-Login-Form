import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<SignUp />}></Route>
				<Route path="/signin" element={<SignIn />}></Route>
			</Routes>
		</>
	);
};

export default AppRouter;