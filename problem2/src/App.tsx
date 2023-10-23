import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import tw from "tailwind-styled-components";
import Button from "./components/Button";
import Input from "./components/FormControls/Input";
import { Option, Select } from "./components/FormControls/Select";
import Typography from "./components/Typography";
import useFetch from "./hooks/useFetch";
import FallbackIcon from "@/assets/svgs/react.svg";

type TCurrency = {
	currency: string;
	date: Date;
	price: number;
};

const validateNumber = (value: string) => {
	return isNaN(+value);
};

const App: React.FunctionComponent = () => {
	const { data, isLoading } = useFetch<Array<TCurrency>>({
		config: { url: "/prices.json", method: "GET" },
		initialData: []
	});
	const dataSource = React.useMemo(() => {
		return data?.map((item) => ({ value: item.price, text: item.currency }));
	}, [data]);

	const [currencyToExchange, setCurrencyToExchange] = React.useState<(typeof dataSource)[0]>();
	const [currencyToConvert, setCurrencyToConvert] = React.useState<(typeof dataSource)[0]>();
	const [amount, setAmount] = React.useState<number>(1);

	const exchangeCurrencyRef = React.useRef<HTMLSelectElement>(null);
	const convertCurrencyRef = React.useRef<HTMLSelectElement>(null);

	const handleSwapExchangeRate = () => {
		setCurrencyToConvert(currencyToExchange);
		setCurrencyToExchange(currencyToConvert);
	};

	React.useEffect(() => {
		if (!currencyToExchange && !currencyToConvert) {
			setCurrencyToConvert(dataSource[0]);
			setCurrencyToExchange(dataSource[0]);
		}
	}, [dataSource]);

	return (
		<Container>
			<Box className='flex-col'>
				<Typography variant='h3'>Currency exchange</Typography>
				<Stack className='items-center'>
					<Stack className='flex-col'>
						<FormGroup>
							<Typography as='label' variant='small'>
								Converting currency
							</Typography>
							<FormGroup>
								<Image
									className='absolute top-1/2 -translate-y-1/2 left-1'
									onError={(e) => (e.currentTarget.src = FallbackIcon)}
									src={`${import.meta.env.VITE_TOKEN_IMG_URL}/${
										currencyToConvert?.text || dataSource[0]?.text
									}.svg`}
								/>
								<Select
									className='pl-8'
									disabled={isLoading}
									value={currencyToConvert?.value}
									ref={convertCurrencyRef}
									onChange={(e) =>
										setCurrencyToConvert({
											value: +e.target.value,
											text: e.target.options[e.target.selectedIndex].text
										})
									}>
									{dataSource.map((option, index) => (
										<Option key={index} value={option.value}>
											{option.text}
										</Option>
									))}
								</Select>
							</FormGroup>
						</FormGroup>
						<FormGroup>
							<Typography as='label' variant='small'>
								Amount
							</Typography>
							<Input
								type='text'
								step={0.1}
								value={amount}
								onChange={(e) => {
									if (validateNumber(e.currentTarget.value)) {
										return;
									}
									setAmount(+e.currentTarget.value);
								}}
							/>
						</FormGroup>
					</Stack>

					<Button
						icon={ArrowsRightLeftIcon}
						variant='ghost'
						shape='square'
						onClick={() => handleSwapExchangeRate()}
					/>

					<Stack className='flex-col'>
						<FormGroup>
							<Typography as='label' variant='small'>
								Exchaging currency
							</Typography>

							<FormGroup>
								<Image
									className='absolute top-1/2 -translate-y-1/2 left-1'
									onError={(e) => (e.currentTarget.src = FallbackIcon)}
									src={`${import.meta.env.VITE_TOKEN_IMG_URL}/${
										currencyToExchange?.text || dataSource[0]?.text
									}.svg`}
								/>

								<Select
									className='pl-8'
									disabled={isLoading}
									ref={exchangeCurrencyRef}
									value={currencyToExchange?.value}
									onChange={(e) =>
										setCurrencyToExchange({
											value: +e.target.value,
											text: e.target.options[e.target.selectedIndex].text
										})
									}>
									{dataSource.map((option, index) => (
										<Option key={index} value={option.value}>
											{option.text}
										</Option>
									))}
								</Select>
							</FormGroup>
						</FormGroup>
						<FormGroup>
							<Typography as='label' variant='small'>
								Exchanged price
							</Typography>
							<Input
								type='number'
								disabled
								className='cursor-auto'
								value={
									isNaN((currencyToConvert!?.value / currencyToExchange!?.value) * amount)
										? dataSource[0]?.value
										: (currencyToConvert!?.value / currencyToExchange!?.value) * amount
								}
							/>
						</FormGroup>
					</Stack>
				</Stack>
			</Box>
		</Container>
	);
};

const Container = tw.div`flex items-center justify-center h-screen w-full`;
const Box = tw.div`p-8 rounded-lg shadow-2xl flex items-center gap-12`;
const Stack = tw.div`flex gap-4`;
const Image = tw.img`object-contain object-center block w-6 h-6`;
const FormGroup = tw.div`flex flex-col gap-1 relative`;

export default App;
