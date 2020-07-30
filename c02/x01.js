function parent() {
  const message = 'In the beginning...';
  function child() {
    console.info( message );
  }
  child();
}

parent();