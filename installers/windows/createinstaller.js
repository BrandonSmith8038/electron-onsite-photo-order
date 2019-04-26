const createWindowsInstaller = require('electron-winstaller')
	.createWindowsInstaller;
const path = require('path');

getInstallerConfig()
	.then(createWindowsInstaller)
	.catch(error => {
		console.error(error.message || error);
		process.exit(1);
	});

function getInstallerConfig() {
	console.log('creating windows installer');
	const rootPath = path.join('./');
	const outPath = path.join(rootPath, 'release-builds');

	return Promise.resolve({
		appDirectory: path.join(outPath, 'Red-Dirt-Photos-On-Site-win32-ia32'),
		authors: 'Red Dirt Media',
		noMsi: true,
		outputDirectory: path.join(outPath, 'Red Dirt Photos OnSite'),
		exe: 'Red Dirt Photos OnSite.exe',
		setupExe: 'Red Dirt Photos OnSite Setup.exe',
		setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico'),
		name: 'OnSiteOrder',
	});
}
