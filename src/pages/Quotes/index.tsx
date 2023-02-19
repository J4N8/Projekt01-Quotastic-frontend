import {FC, useState} from "react";
import {useQuery} from "react-query";
import * as API from "api/Api";
import {QuoteType} from "models/quote";
import Quote from "../../components/quote/Quote";
import Layout from "../../components/ui/Layout";

const DashboardQuotes: FC = () => {
	const [pageNumber] = useState(1);

	const {data, isLoading} = useQuery(["fetchQuotes", pageNumber], () => API.fetchQuotes(pageNumber), {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
	return (
		<Layout>
			<div className="mb-4">
				<h1 className="mb-4">Quotes</h1>
			</div>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					{data?.data.data.length === 0 ? (
						<p>No quotes found.</p>
					) : (
						<>
							<div className="container">
								<div className="row row-cols-4">
									{data?.data.data.map((item: QuoteType, index: number) => (
										<div className="p-2 border-1 rounded-2 border-orange m-1">
											<Quote quoteValues={item} key={index} />
										</div>
									))}
								</div>
							</div>
						</>
					)}
				</>
			)}
		</Layout>
	);
};

export default DashboardQuotes;
