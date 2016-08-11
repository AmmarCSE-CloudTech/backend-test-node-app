export const config = {
	port: process.env.PORT || 2000,
	test_port: 2001,

	db: process.env.MONGOLAB_URI || "mongodb://localhost/todoapi",
	test_db: "mongodb://localhost/todoapi_test",
    
    tokenSecret: 'super-big-secret-hush!'
}
