const readline = require("readline");

// Create an interface to read input from stdin (console)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Read the first line (the number of temperatures)
rl.question("", (N) => {
  // Read the second line (the temperatures)
  rl.question("", (temps) => {
    // Convert the temperatures input to an array of numbers
    const temperatures = temps.split(" ").map(Number);

    // If no temperatures are provided, output 0
    if (N == 0 || temperatures.length === 0) {
      console.log(0);
    } else {
      // Initialize the closest temperature to null
      let closest = temperatures[0];

      // Loop through the array of temperatures to find the closest to 0
      for (let i = 1; i < N; i++) {
        const temp = temperatures[i];

        if (Math.abs(temp) < Math.abs(closest)) {
          closest = temp;
        } else if (Math.abs(temp) === Math.abs(closest) && temp > closest) {
          closest = temp;
        }
      }

      // Output the closest temperature to 0
      console.log(closest);
    }

    // Close the readline interface
    rl.close();
  });
});
