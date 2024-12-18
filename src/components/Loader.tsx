const Loader = () => {
  return (
    <div data-testid="loader-container" className="flex h-screen items-center justify-center bg-white">
      <div
        data-testid="loader-spinner"
        className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
      ></div>
    </div>
  );
};

export default Loader;
