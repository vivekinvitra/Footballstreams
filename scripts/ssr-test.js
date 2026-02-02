(async () => {
  try {
    const { render } = await import('../dist/server/entry-server.js');
    for (const path of ['/', '/live', '/match/epl-1']) {
      const { head } = await render(path);
      console.log('PATH', path, 'head length', head ? head.length : 0);
      console.log('HEAD SAMPLE:', (head || '').slice(0, 400));
      console.log('---');
    }
  } catch (err) {
    console.error('ssr-test error', err);
  }
})();
