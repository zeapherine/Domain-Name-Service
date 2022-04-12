const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();

	const domainContractFactory = await hre.ethers.getContractFactory('Domains');
	const domainContract = await domainContractFactory.deploy('ramen');
	await domainContract.deployed();

	console.log('Contract Deployed to :', domainContract.address);
	console.log('Owner Address :', owner.address);

	const txn = await domainContract.register('mortal', {
		value: hre.ethers.utils.parseEther('0.1'),
	});
	await txn.wait();

	const balance = await hre.ethers.provider.getBalance(domainContract.address);
	console.log('Contract balance:', hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};

runMain();
