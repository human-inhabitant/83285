function parent() {
  const message = 'In the beginning...';
  function child() {
    console.info( message );
  }
  return child;
}

const childFn = parent();

childFn();