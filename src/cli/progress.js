const parseColor = (hex) => {
  if (!hex || !/^#[0-9A-Fa-f]{6}$/.test(hex)) return '\x1b[0m';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `\x1b[38;2;${r};${g};${b}m`;
};

const progress = () => {
  // Write your code here
  // Simulate progress bar from 0% to 100% over ~5 seconds
  // Update in place using \r every 100ms
  // Format: [████████████████████          ] 67%

  const args = process.argv.slice(2);
  const argsObj = {}

  for (let i = 0; i < args.length; i += 2) {
    argsObj[args[i]] = args[i + 1];
  }

  const duration = Number(argsObj['--duration'] ?? 5000);
  const intervalValue = Number(argsObj['--interval'] ?? 100);
  const length = Number(argsObj['--length'] ?? 30);
  const color = parseColor(argsObj['--color'])


  const steps = duration / intervalValue;
  let step = 0

  const interval = setInterval(() => {
    const percent = Math.round((step / steps) * 100);

    const filledLength = Math.round((percent / 100) * length);
    const emptyLength = length - filledLength;

    const fillProgress = '█'.repeat(filledLength)
    const emptyProgress = ' '.repeat(emptyLength)

    const bar = `${color}[${fillProgress}${emptyProgress}]`;

    process.stdout.write(`\r${bar} ${percent}%`);

    if (step >= steps) {
      clearInterval(interval);
      process.stdout.write('\nDone!\n');
      process.exit(0);
    }

    step++
  }, intervalValue)


};

progress();
