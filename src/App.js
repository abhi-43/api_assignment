import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	CardContainer,
	CardMedia,
	CardTitle,
} from './CardStyle';

function App() {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(5);

	let observer = useRef();
	const lastObservElement = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						if (products.length === currentPage) return;
						setCurrentPage((currentPage) => currentPage + 5); // increase by 5
					}
				},
				{ root: null, rootMargin: '0px', threshold: 0.25 }
			);
			if (node) observer.current.observe(node);
		},
		[currentPage, products]
	);

	useEffect(() => {
		const data = async () => {
			const p = await axios.get("https://dummyjson.com/products?limit=100");
			setProducts(p.data.products);
		};
		data();
	}, []);

	return (
		<div className="container">
			<div className="grid-4">
				{products?.slice(0, currentPage).map((product, index) =>
					currentPage === index + 1 ? (
						<CardContainer key={product.id} ref={lastObservElement}>
							<CardMedia src={product.thumbnail} atl={product.title} />
							<CardTitle>{product.title}</CardTitle>
						</CardContainer>
					) : (
						<CardContainer key={product.id}>
							<CardMedia src={product.thumbnail} atl={product.title} />
							<CardTitle>{product.title}</CardTitle>
						</CardContainer>
					)
				)}
			</div>
			{products.length === currentPage && (
				<h3
					style={{ fontSize: '20px', textAlign: 'center', marginTop: '20px' }}
				>
					Max 100 item limit is reached because of max call 
				</h3>
			)}
		</div>
	);
}

export default App;
