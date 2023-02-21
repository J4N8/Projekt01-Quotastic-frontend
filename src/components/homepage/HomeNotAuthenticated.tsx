import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {routes} from "../../constants/routesConstants";
import {Button} from "react-bootstrap";
import {QuoteType} from "../../models/quote";
import Quote from "../quote/Quote";
import {useQueries} from "react-query";
import * as API from "../../api/Api";
import useMediaQuery from "../../hooks/useMediaQuery";

const HomeNotAuthenticated = () => {
	const {isMobile} = useMediaQuery(992);
	const navigate = useNavigate();
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
			<div className={isMobile ? "" : "d-flex"}>
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
					<img
						src={"/images/landing_page_quotes.png"}
						alt="landing page image"
						width={isMobile ? "100%" : ""}
					/>
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
									<div className="d-flex container w-100">
										<div className={isMobile ? "row row-cols-1" : "row row-cols-4"}>
											{sortedScore.data?.data.data.map((item: QuoteType, index: number) => (
												<div className="col p-1 text-break">
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
		</div>
	);
};

export default HomeNotAuthenticated;
