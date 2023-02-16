import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {routes} from "../../constants/routesConstants";
import {Button} from "react-bootstrap";
import {QuoteType} from "../../models/quote";
import Quote from "../quote/Quote";
import {useQueries} from "react-query";
import * as API from "../../api/Api";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

const HomeNotAuthenticated = () => {
	const navigate = useNavigate();
	const [apiError, setApiError] = useState("");
	const [showError, setShowError] = useState(false);
	const [pageNumber] = useState(1);

	const [sortedScore] = useQueries([
		{
			queryKey: ["fetchQuotesSortedScore", pageNumber],
			queryFn: () => API.fetchQuotesSortedScore(pageNumber),
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		},
	]);
	return (
		<div className="p-2 mb-4 landing-page-noauth">
			<div className="d-flex">
				<div className="container-fluid py-4">
					<h1 className="">Welcome to</h1>
					<h1 className="orange">Quotastic</h1>
					<h4>
						Quotastic is free online platform for you to explore the quips, quotes and proverbs. Sign up and
						express yourself.
					</h4>
					<Button className="component-orange rounded-5 px-4" onClick={() => navigate(`${routes.SIGNUP}`)}>
						Signup
					</Button>
				</div>
				<div>
					<img src={`${process.env.REACT_APP_API_URL}/files/landing_page_quotes.png`} />
				</div>
			</div>

			<div className="text-center">
				<h1>Explore the world of</h1>
				<h1 className="orange">fantastic quotes</h1>
				<br />
				<div className="quotes">
					<h3 className="orange">Most upvoted quotes</h3>
					<p>
						Most upvoted quotes on the platform. Sign up or login to like the quotes and keep them saved in
						your profile
					</p>
					{sortedScore.isLoading ? (
						<div>Loading...</div>
					) : (
						<>
							{sortedScore.data?.data.data.length === 0 ? (
								<p>No quotes found.</p>
							) : (
								<>
									<div className="d-flex container">
										<div className="row row-cols-4">
											{sortedScore.data?.data.data.map((item: QuoteType, index: number) => (
												<div className="p-2 col border-orange m-1">
													<Quote quoteValues={item} key={index} />
												</div>
											))}
										</div>
									</div>
								</>
							)}
						</>
					)}
				</div>
				<Button
					className="component-orange-reverse rounded-5 px-4"
					onClick={() => navigate(`${routes.SIGNUP}`)}
				>
					Sign up to see more
				</Button>
			</div>
			{showError && (
				<ToastContainer className="p-3" position="top-end">
					<Toast onClose={() => setShowError(false)} show={showError}>
						<Toast.Header>
							<strong className="me-auto text-danger">Error</strong>
						</Toast.Header>
						<Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
					</Toast>
				</ToastContainer>
			)}
		</div>
	);
};

export default HomeNotAuthenticated;
