import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import os from 'os'

export default () => {
  const basePath = path.join(__dirname, '..')

  const platform = os.platform()
  let arch
  if (os.arch().includes('64')) {
    arch = '64'
  } else {
    arch = '32'
  }

  console.log('Platform:', platform)
  console.log('Arch:', arch)

  const executablePath = path.join(basePath, 'bin', platform, arch)
  let executableName = 'jdiff'
  if (platform === 'win32') {
    executableName += '.exe'
  }

  const executable = path.join(executablePath, executableName)

  if (!fs.existsSync(executable)) {
    console.error('Executable not found:', executable)
    console.log('installing jdiff...')
    execSync('node postInstall.js', { cwd: __dirname })
  }

  return executable
}
