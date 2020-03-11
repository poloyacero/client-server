let tests = [];

test = (name, fn) => {
    tests.push({name, fn});
}

run = () => {
    tests.forEach(t => {
        try {
			console.log(t.name);
			t.fn()
			// If there is no exceptioncd
			// that means it ran correctly
			console.log('✅ ', t.name)
		} catch (e) {
			// Exceptions, if any, are caught
			// and the test is considered failed
			console.log('❌ ', t.name)
			// log the stack of the error
			console.log(e.stack)
		}
	})
}

// Get the list of files from the command line
// arguments
const files = process.argv.slice(2)

// expose the test function as a global variable
global.test = test

// Load each file using `require`
files.forEach(file => {
	// Once a file is loaded, it's tests are
	// added to the `tests` singleton variable
	require(file)
})

// Now that all the tests from all the files are
// added, run them one after the other
run()