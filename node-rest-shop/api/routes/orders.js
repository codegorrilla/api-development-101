import express from 'express';

const ordersRoutes = express.Router();

//handling all GET requests for orders
ordersRoutes.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Orders are fetched',
	});
});

ordersRoutes.post('/', (req, res, next) => {
	const order = {
		productId: req.body.productId,
		quantity: req.body.quantity,
	};
	res.status(201).json({
		message: 'An order has been created',
		createdOrder: order,
	});
});

ordersRoutes.get('/:orderId', (req, res, next) => {
	const id = req.params.orderId;

	if (id === 'bulk') {
		res.status(200).json({
			message: 'You have made a bulk order',
			id: id,
		});
	} else {
		res.status(200).json({
			message: 'You have made an order',
			id: id,
		});
	}
});

ordersRoutes.patch('/:orderId', (req, res, next) => {
	res.status(200).json({
		message: 'Updated the order',
		id: req.params.orderId,
	});
});

ordersRoutes.delete('/:orderId', (req, res, next) => {
	res.status(200).json({
		message: 'The order has been deleted',
		id: req.params.orderId,
	});
});

export default ordersRoutes;
