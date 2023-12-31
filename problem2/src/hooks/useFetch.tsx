import React from "react";
import axiosInstance from "../configs/axios.config";
import { AxiosRequestConfig } from "axios";

export default function useFetch<T>({
	config,
	initialData
}: {
	config: Pick<AxiosRequestConfig, "url" | "method" | "data" | "signal" | "params">;
	initialData?: T;
}) {
	const [isLoading, setLoadingState] = React.useState<boolean>(false);
	const [isError, setErrorState] = React.useState<boolean>(false);
	const [data, setData] = React.useState<T>(initialData!);
	config.params ??= {};

	React.useEffect(() => {
		(async () => {
			try {
				setLoadingState(true);
				const metadata = (await axiosInstance.request(config)) as T;
				if (!metadata) setData(initialData!);
				setData(metadata);
			} catch (error) {
				setErrorState(true);
				setData(initialData!);
			} finally {
				setLoadingState(false);
			}
		})();
	}, [config.params]);

	return { data, isLoading, isError };
}
