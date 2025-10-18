import localtunnel from 'localtunnel';
import { spawn } from 'child_process';
import { createServer } from 'net';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.normalize(path.join(__dirname, '..')));

let tunnel;
let nextDev;
let isCleaningUp = false;

async function checkPort(port) {
  return new Promise((resolve) => {
    const server = createServer();
    
    server.once('error', () => {
      resolve(true); // Port is in use
    });
    
    server.once('listening', () => {
      server.close();
      resolve(false); // Port is free
    });
    
    server.listen(port);
  });
}

const basePort = parseInt(process.env.PORT || '', 10) || 3000;

async function findAvailablePort(startPort, maxAttempts = 50) {
  let port = startPort;
  for (let i = 0; i < maxAttempts; i++) {
    const inUse = await checkPort(port);
    if (!inUse) return port;
    port++;
  }
  throw new Error(`No free port found starting from ${startPort}`);
}

async function killProcessOnPort(port) {
  try {
    if (process.platform === 'win32') {
      // Windows: Use cmd to pipe netstat to findstr
      const cmd = spawn('cmd.exe', ['/c', `netstat -ano | findstr :${port}`]);
      cmd.stdout.on('data', (data) => {
        const lines = data.toString().split(/\r?\n/).filter(Boolean);
        lines.forEach(line => {
          const match = line.match(/\s+(\d+)$/);
          if (match) {
            const pid = match[1];
            spawn('taskkill', ['/F', '/PID', pid]);
          }
        });
      });
      await new Promise((resolve) => cmd.on('close', resolve));
    } else {
      // Unix-like systems: Use lsof
      const lsof = spawn('lsof', ['-ti', `:${port}`]);
      lsof.stdout.on('data', (data) => {
        data.toString().split('\n').forEach(pid => {
          if (pid) {
            try {
              process.kill(parseInt(pid), 'SIGKILL');
            } catch (e) {
              if (e.code !== 'ESRCH') throw e;
            }
          }
        });
      });
      await new Promise((resolve) => lsof.on('close', resolve));
    }
  } catch (e) {
    // Ignore errors if no process found
  }
}

async function startDev() {
  // Determine the port to use and find a free one starting from desiredPort
  const desiredPort = parseInt(process.env.PORT || '', 10) || 3000;
  const port = await findAvailablePort(desiredPort);
  if (port !== desiredPort) {
    console.warn(`Port ${desiredPort} is in use. Using free port ${port} instead.`);
  }

  const useTunnel = process.env.USE_TUNNEL === 'true';
  let frameUrl;

  if (useTunnel) {
    // Start localtunnel and get URL
    tunnel = await localtunnel({ port });
    let ip;
    try {
      ip = await fetch('https://ipv4.icanhazip.com').then(res => res.text()).then(ip => ip.trim());
    } catch (error) {
      console.error('Error getting IP address:', error);
    }

    frameUrl = tunnel.url;
    console.log(`
🌐 Local tunnel URL: ${tunnel.url}

💻 To test on desktop:
   1. Open the localtunnel URL in your browser: ${tunnel.url}
   2. Enter your IP address in the password field${ip ? `: ${ip}` : ''} (note that this IP may be incorrect if you are using a VPN)
   3. Click "Click to Submit" -- your mini app should now load in the browser
   4. Navigate to the Warpcast Mini App Developer Tools: https://warpcast.com/~/developers
   5. Enter your mini app URL: ${tunnel.url}
   6. Click "Preview" to launch your mini app within Warpcast (note that it may take ~10 seconds to load)


❗️ You will not be able to load your mini app in Warpcast until    ❗️
❗️ you submit your IP address in the localtunnel password field ❗️


📱 To test in Warpcast mobile app:
   1. Open Warpcast on your phone
   2. Go to Settings > Developer > Mini Apps
   4. Enter this URL: ${tunnel.url}
   5. Click "Preview" (note that it may take ~10 seconds to load)
`);
  } else {
    frameUrl = `http://localhost:${port}`;
    console.log(`
💻 To test your mini app:
   1. Open the Warpcast Mini App Developer Tools: https://warpcast.com/~/developers
   2. Scroll down to the "Preview Mini App" tool
   3. Enter this URL: ${frameUrl}
   4. Click "Preview" to test your mini app (note that it may take ~5 seconds to load the first time)
`);
  }
  
  // Start next dev with appropriate configuration
  const nextCli = path.normalize(path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next'));

  // Use Node to run Next CLI directly to avoid Windows shell quoting issues
  nextDev = spawn(process.execPath, [nextCli, 'dev', '-p', String(port)], {
    stdio: 'inherit',
    env: { ...process.env, NEXT_PUBLIC_URL: frameUrl, NEXTAUTH_URL: frameUrl },
    cwd: projectRoot
  });

  // Handle cleanup
  const cleanup = async () => {
    if (isCleaningUp) return;
    isCleaningUp = true;

    console.log('\n\nShutting down...');

    try {
      if (nextDev) {
        try {
          // Kill the main process first
          nextDev.kill('SIGKILL');
          // Then kill any remaining child processes in the group
          if (nextDev?.pid) {
            try {
              process.kill(-nextDev.pid);
            } catch (e) {
              // Ignore ESRCH errors when killing process group
              if (e.code !== 'ESRCH') throw e;
            }
          }
          console.log('🛑 Next.js dev server stopped');
        } catch (e) {
          // Ignore errors when killing nextDev
          console.log('Note: Next.js process already terminated');
        }
      }
      
      if (tunnel) {
        try {
          await tunnel.close();
          console.log('🌐 Tunnel closed');
        } catch (e) {
          console.log('Note: Tunnel already closed');
        }
      }

      // Force kill any remaining processes on selected port
      await killProcessOnPort(port);
    } catch (error) {
      console.error('Error during cleanup:', error);
    } finally {
      process.exit(0);
    }
  };

  // Handle process termination
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);
  if (tunnel) {
    tunnel.on('close', cleanup);
  }
}

startDev().catch(console.error); 