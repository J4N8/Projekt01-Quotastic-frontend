import CreateUpdateQuoteForm from "components/quote/CreateUpdateQuoteForm";
import DashboardLayout from "components/ui/DashboardLayout";
import {FC} from "react";

const DashboardProductsAdd: FC = () => {
	return (
		<DashboardLayout>
			<h1 className="mb-4 text-center">Create new quote</h1>
			<CreateUpdateQuoteForm shown={false} />
		</DashboardLayout>
	);
};

export default DashboardProductsAdd;
