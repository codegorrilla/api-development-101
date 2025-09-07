import express from 'express';

const prodRoutes = express.Router();

prodRoutes.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handling GET requests to products/',
	});
});

prodRoutes.post('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handling POST requests to products/',
	});
});

prodRoutes.get('/:productId', (req, res, next) => {
	const id = req.params.productId;

	if (id === 'special') {
		res.status(200).json({
			message: 'You discovered the special ID',
			id: id,
		});
	} else {
		res.status(200).json({
			message: 'You  passed an ID',
			id: id,
		});
	}
});

// in case sending two requests , add return to the first response
prodRoutes.patch('/:productId', (req, res, next) => {
	res.status(200).json({
		message: 'Updated product',
	});
});

prodRoutes.delete('/:productId', (req, res, next) => {
	const id = req.params.productId;
	res.status(200).json({
		message: 'Product Deleted',
		id: id,
	});
});

export default prodRoutes;
