const { hexStripZeros } = require('ethers/lib/utils');

const main = async () => {
	const domainContractFactory = await hre.ethers.getContractFactory('Domains');
	const domainContract = await domainContractFactory.deploy('ramen');
	await domainContract.deployed();

	console.log('Contract deployed to:', domainContract.address);

	let txn = await domainContract.register('Ichiraku', {
		value: hre.ethers.utils.parseEther('0.1'),
	});
	await txn.wait();
	console.log('Minted domain Ichiraku.ramen');

	txn = await domainContract.setRecord(
		'Ichiraku ramen',
		'Naruto Favoured Ramen'
	);
	await txn.wait();
	console.log('Set record Ichiraku ramen');

	const address = await domainContract.getAddress('Ichiraku');
	console.log('Owner of Ichiraku ramen:', address);

	const balance = await hre.ethers.provider.getBalance(domainContract.address);
	console.log('Contract balance:', hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

runMain();
