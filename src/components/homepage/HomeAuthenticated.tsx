import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {userStorage} from "../../utils/localStorage";
import {UserType} from "../../models/user";
import {QuoteType} from "../../models/quote";
import Quote from "../quote/Quote";
import {useQueries} from "react-query";
import * as API from "../../api/Api";
import useMediaQuery from "../../hooks/useMediaQuery";

const HomeAuthenticated = () => {
	const {isMobile} = useMediaQuery(768);
	const user: UserType = userStorage.getUser();
	const [pageNumber, setPageNumber] = useState(1);

	const [sortedScore, sortedRecent] = useQueries([
		{
			queryKey: ["fetchQuotesSortedScore", pageNumber],
			queryFn: () => API.fetchQuotesSortedScore(pageNumber),
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		},
		{
			queryKey: ["fetchQuotesSortedRecent", pageNumber],
			queryFn: () => API.fetchQuotesSortedRecent(pageNumber),
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		},
	]);

	return (
		<>
			<div className="p-2 mb-4 bg-orange">
				<div className="text-center">
					<img
						src={`${process.env.REACT_APP_API_URL}/files/${user.avatar}`}
						width="100"
						className="rounded-circle"
						alt="avatar"
					/>
					<h2>
						{user.first_name} {user.last_name}
					</h2>
				</div>
				<div className="w-content justify-content-center text-center d-flex">
					<div className="user-stats d-flex m-2 border border-1 rounded-2 bg-white">
						<div className="m-4">
							<h5>Quotes</h5>
							<h5 className="orange">{user.quote_count}</h5>
						</div>
						<div className="m-4">
							<h5>Quotastic karma</h5>
							<h5>{user.karma}</h5>
						</div>
					</div>
				</div>
			</div>
			<div className={isMobile ? "container justify-content-center" : "container d-flex justify-content-center"}>
				<div className={isMobile ? "quotes" : "quotes w-25"}>
					<h2>Most liked</h2>
					{sortedScore.isLoading ? (
						<div>Loading...</div>
					) : (
						<>
							{sortedScore.data?.data.data.length === 0 ? (
								<p>No quotes found.</p>
							) : (
								<>
									<div>
										{sortedScore.data?.data.data.map((item: QuoteType, index: number) => (
											<div className="p-2 border-1 rounded-2 border-orange m-2">
												<Quote quoteValues={item} key={index} />
											</div>
										))}
									</div>
								</>
							)}
						</>
					)}
				</div>
				<div className={isMobile ? "quotes" : "quotes w-25"}>
					<h2>Most recent</h2>
					{sortedRecent.isLoading ? (
						<div>Loading...</div>
					) : (
						<>
							{sortedRecent.data?.data.data.length === 0 ? (
								<p>No quotes found.</p>
							) : (
								<>
									<div>
										{sortedRecent.data?.data.data.map((item: QuoteType, index: number) => (
											<div className="p-2 border-1 rounded-2 border-orange m-2">
												<Quote quoteValues={item} key={index} />
											</div>
										))}
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>

			<div className="text-center">
				<Button
					onClick={() => {
						setPageNumber(pageNumber + 1);
						sortedScore.refetch;
						sortedRecent.refetch;
					}}
					className="component-orange-reverse"
				>
					Load more
				</Button>
			</div>
		</>
	);
};

export default HomeAuthenticated;
