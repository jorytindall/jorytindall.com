'use client';

import { useEffect, useState } from 'react';
import { sanityClient } from './config';

const useSanityFetch = (query) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const client = sanityClient;
			try {
				const result = await client.fetch(query);
				setData(result);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [query]);

	return { data, loading, error };
};

export default useSanityFetch;
