const dynamic = async () => {
  // Write your code here
  // Accept plugin name as CLI argument
  // Dynamically import plugin from plugins/ directory
  // Call run() function and print result
  // Handle missing plugin case

  const args = process.argv.slice(2)[0]
  
  try {
    const { run } = await import(`./plugins/${args}.js`);

    console.log(run());
  } catch {
    console.log('Plugin not found');
  }
};

await dynamic();
