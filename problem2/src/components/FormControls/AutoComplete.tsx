import { Combobox } from "@headlessui/react";
import React from "react";

type TAutoCompleteProps = {
	dataSource: Array<{ value: string | number; text: string; icon?: string | React.ComponentType<any> }>;
	onChange?: (args: any) => any;
};

const AutoComplete: React.FC<TAutoCompleteProps> = ({ dataSource, onChange: handleChange }) => {
	const [selectedOption, setSelectedOption] = React.useState(dataSource[0]);
	const [query, setQuery] = React.useState<string>("");

	const filteredDataSource =
		query === ""
			? dataSource
			: dataSource.filter((option) => {
					return option.text.toString().toLowerCase().includes(query.toLowerCase());
			  });

	return (
		<Combobox value={selectedOption} onChange={setSelectedOption}>
			<Combobox.Input
				className='block w-full rounded-md border-0 duration-300 px-2.5 py-1.5 text-base-content outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
				onChange={(event) => {
					if (handleChange) handleChange(event);
					setQuery(event.target.value);
				}}
			/>
			<Combobox.Options>
				{filteredDataSource.map((option) => (
					<Combobox.Option key={crypto.randomUUID()} value={option.value} className='leading-6'>
						{option.text}
					</Combobox.Option>
				))}
			</Combobox.Options>
		</Combobox>
	);
};

export default AutoComplete;
