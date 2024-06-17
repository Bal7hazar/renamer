import loader from "/assets/loader.svg";

export const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* Loader */}
      <div className="flex justify-center items-center z-50">
        <img src={loader} alt="loader" className="h-32 md:h-40" />
      </div>
    </div>
  );
};
