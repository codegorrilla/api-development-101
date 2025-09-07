import express from 'express';
import morgan from 'morgan';
import prodRoutes from './api/routes/products.js';
import ordersRoutes from './api/routes/orders.js';
const app = express();

// app.use((req, res, next) => {
// 	res.status(200).json({
// 		message: 'It works!',
// 	});
// });

app.use(morgan('dev'));

app.use('/products', prodRoutes);
app.use('/orders', ordersRoutes);

//handles not found error after making requests to the routes
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

//handles all kinds of errors
app.use((req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

export default app;
