import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import prodRoutes from './api/routes/products.js';
import ordersRoutes from './api/routes/orders.js';
const app = express();

// app.use((req, res, next) => {
// 	res.status(200).json({
// 		message: 'It works!',
// 	});
// });

// const uri =
// 	'mongodb+srv://codegorrilla_db_user:' +
// 	process.env.MONGO_ATLAS_PW +
// 	'@node-shop.szahc6y.mongodb.net/?retryWrites=true&w=majority&appName=node-shop';
// const clientOptions = {
// 	serverApi: { version: '1', strict: true, deprecationErrors: true },
// };
// async function run() {
// 	try {
// 		// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
// 		await mongoose.connect(uri, clientOptions);
// 		await mongoose.connection.db.admin().command({ ping: 1 });
// 		console.log(
// 			'Pinged your deployment. You successfully connected to MongoDB!'
// 		);
// 	} finally {
// 		// Ensures that the client will close when you finish/error
// 		await mongoose.disconnect();
// 	}
// }
// run().catch(console.dir);

mongoose
	.connect(
		'mongodb+srv://codegorrilla_db_user:' +
			process.env.MONGO_ATLAS_PW +
			'@node-shop.szahc6y.mongodb.net/?retryWrites=true&w=majority&appName=node-shop',
		{
			//useNewUrlParser: true,
			//useUnifiedTopology: true,
		}
	)
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.error(err));

// mongoose.Promise = global.Promise;

app.use(morgan('dev'));

//fetching request body using body-parser add-on and converting it into json format
app.use(bodyParser.urlencoded({ extended: false })); // we'll not use rich text content from the request body like images, etc
app.use(bodyParser.json());

//CORS Error handling
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

//Routes which handle requests
// app.use('/', (req, res, next) => {
// 	res.status(200).json({
// 		message: 'Welcome to my REST API',
// 	});
// });
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
