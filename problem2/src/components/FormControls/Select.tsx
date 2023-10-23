import React from "react";
import tw from "tailwind-styled-components";
import FormControl from "./FormGroup";
import Typography from "../Typography";

type TSelectFieldProps = {
	name: string;
	label?: string;
	dataSource: Array<{ text: string; value: string | number }>;
	onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const Select = tw.select`block w-full rounded-[4px] border-none duration-300 text-base-content px-2 py-1.5 outline-none ring-1 ring-gray-300 focus:ring-primary focus:active:ring-primary min-w-[128px] m-0`;
const Option = tw.option`leading-6`;

const SelectFieldControl: React.FC<TSelectFieldProps> = (props) => {
	const id = React.useId();
	return (
		<FormControl>
			{props.label && (
				<Typography as='label' htmlFor={id}>
					{props.label}
				</Typography>
			)}
			<Select
				name={props.name}
				onChange={(e) => {
					if (props.onChange) props.onChange(e);
				}}>
				{props.dataSource.map((option) => (
					<Option value={option.value} key={`${option.text}-${option.value}`}>
						{option.text}
					</Option>
				))}
			</Select>
		</FormControl>
	);
};

export { SelectFieldControl, Select, Option };
