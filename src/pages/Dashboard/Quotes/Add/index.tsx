import CreateQuoteForm from "components/quote/CreateQuoteForm";
import DashboardLayout from "components/ui/DashboardLayout";
import {FC} from "react";

const DashboardProductsAdd: FC = () => {
	return (
		<DashboardLayout>
			<h1 className="mb-4 text-center">Create new quote</h1>
			<CreateQuoteForm shown={false} />
		</DashboardLayout>
	);
};

export default DashboardProductsAdd;
